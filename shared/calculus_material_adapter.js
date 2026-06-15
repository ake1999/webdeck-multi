import { COURSE_CATALOG } from "./course_catalog.js";

function slugify(value, fallback = "slide") {
  const slug = String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return slug || fallback;
}

function normalizeMathDelimiters(value) {
  const displayBlocks = [];
  let text = String(value ?? "").replace(/\$\$([\s\S]+?)\$\$/g, (_match, tex) => {
    const index = displayBlocks.length;
    displayBlocks.push(`$$${tex}$$`);
    return `@@CALC_DISPLAY_${index}@@`;
  });

  text = text.replace(/\$([^$\n]+?)\$/g, (_match, tex) => `\\(${String(tex).trim()}\\)`);

  return text.replace(/@@CALC_DISPLAY_(\d+)@@/g, (match, index) => {
    return displayBlocks[Number(index)] || match;
  });
}

function compactText(value) {
  const cleaned = String(value ?? "")
    .replace(/<br\s*\/?>/gi, "\n\n")
    .replace(/&nbsp;/gi, " ")
    .replace(/\r\n/g, "\n")
    .trim();
  return normalizeMathDelimiters(cleaned);
}

function plainText(value) {
  return compactText(value)
    .replace(/\$\$[\s\S]*?\$\$/g, " ")
    .replace(/\\\[[\s\S]*?\\\]/g, " ")
    .replace(/\\\([\s\S]*?\\\)/g, " ")
    .replace(/\$[^$]+\$/g, " ")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/`([^`]+?)`/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function mathifySqrtText(value) {
  const protectedChunks = [];
  let text = String(value || "").replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\))/g, (match) => {
    const token = `@@CALC_MATH_${protectedChunks.length}@@`;
    protectedChunks.push(match);
    return token;
  });

  text = text.replace(/1\/\(sqrt\(([^()]+)\)\s*-\s*1\)/g, (_match, radicand) => {
    return `\\(\\frac{1}{\\sqrt{${radicand.trim()}}-1}\\)`;
  });

  text = text.replace(
    /([A-Za-z]\([^)]*\)\s*=\s*)?sqrt\(([^()]+)\)(\s*[+-]\s*\d+(?:\.\d+)?)?/g,
    (_match, lhs = "", radicand, tail = "") => {
      const compact = `${lhs.replace(/\s+/g, "")}\\sqrt{${radicand.trim()}}${tail.replace(/\s+/g, "")}`;
      return `\\(${compact}\\)`;
    },
  );

  return text.replace(/@@CALC_MATH_(\d+)@@/g, (_match, index) => protectedChunks[Number(index)] || "");
}

const EMPHASIS_TERMS = [
  "function",
  "input",
  "output",
  "domain",
  "range",
  "transformation",
  "transformations",
  "shift",
  "left",
  "right",
  "up",
  "down",
  "stretch",
  "reflection",
  "reflect",
  "composition",
  "inverse",
  "even",
  "odd",
  "asymptote",
  "piecewise",
  "limit",
  "slope",
  "tangent",
  "area",
];

const EMPHASIS_PATTERNS = EMPHASIS_TERMS.map((term) => new RegExp(`\\b(${term})\\b`, "gi"));

function emphasizeTerms(value) {
  let text = mathifySqrtText(value);
  if (!text) return text;

  const protectedChunks = [];
  text = text.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)|\*\*[\s\S]*?\*\*)/g, (match) => {
    const token = `@@CALC_PROTECTED_${protectedChunks.length}@@`;
    protectedChunks.push(match);
    return token;
  });

  EMPHASIS_PATTERNS.forEach((pattern) => {
    text = text.replace(pattern, "**$1**");
  });

  return text.replace(/@@CALC_PROTECTED_(\d+)@@/g, (_match, index) => protectedChunks[Number(index)] || "");
}

function cleanQuestion(value) {
  return mathifySqrtText(compactText(value)
    .replace(/\s*\((?:answer|solution)\s*:[\s\S]*$/i, "")
    .replace(/\s*(?:answer|solution)\s*:\s*.*$/i, "")
    .trim());
}

function promptAnswer(value) {
  const text = compactText(value);
  const parenthetical = text.match(/\((?:answer|solution)\s*:\s*([\s\S]*?)\)\s*$/i);
  if (parenthetical) return parenthetical[1].trim();
  const inline = text.match(/(?:answer|solution)\s*:\s*([\s\S]*)$/i);
  return inline ? inline[1].trim() : "";
}

function slideContentText(slide) {
  return [
    slide?.title,
    slide?.on_screen_text,
    slide?.left?.content,
    slide?.right?.content,
  ].map(compactText).filter(Boolean).join("\n");
}

function questionFromSlide(slide) {
  const content = slideContentText(slide);
  const plain = plainText(content);
  const original = cleanQuestion(slide?.student_prompt || "");

  if (/f\(x\)=\\sqrt\{x-3\}\+2|f\(x\)=sqrt\(x-3\)\+2/i.test(content.replace(/\s+/g, ""))) {
    return "What are the domain and range of \\(f(x)=\\sqrt{x-3}+2\\)?";
  }

  if (/f\\circ g|f\(g\(x\)\)|f\(\\sqrt\{x\}\)/i.test(content) && /g\s*∘\s*f|g\\circ f/i.test(original)) {
    return "What is the domain of \\((f\\circ g)(x)\\)?";
  }

  if (/product of even and odd|h\(-x\)|f\(-x\)g\(-x\)|odd/i.test(plain) && /two even/i.test(original)) {
    return "What is the product of an even function and an odd function?";
  }

  return original;
}

function isMostlyMathLine(value) {
  const text = String(value || "").trim();
  if (!text) return false;
  if (/^\$\$[\s\S]+\$\$$/.test(text)) return true;
  if (/^\\\([\s\S]+\\\)$/.test(text)) return true;
  return /\\\(|\\\[|[=<>^_{}]|\\frac|\\sqrt|\\sum|\\int|\\lim/.test(text);
}

function splitFormulaLines(value) {
  const content = compactText(value);
  if (!content) return [];

  return content
    .split(/\n{2,}|\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const labelMatch = line.match(/^\*\*([^*]+):\*\*\s*(.+)$/);
      if (!labelMatch) return line;
      const label = labelMatch[1].trim();
      const body = labelMatch[2].trim();
      if (!isMostlyMathLine(body)) return line;
      const compactBody = body.split(/\s+(?:where|when|if|for example|e\.g\.)\s+/i)[0].trim();
      const formulas = compactBody.match(/\\\([\s\S]+?\\\)|\$\$[\s\S]+?\$\$/g);
      return formulas?.length ? `${label}: ${formulas.join(" ")}` : `${label}: ${body}`;
    });
}

function titleCase(value) {
  return String(value || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function compactSessionTitle(value) {
  return String(value || "")
    .replace(/^Session\s+(0?\d+)\s+[—-]\s*/i, (_match, number) => `S${String(number).padStart(2, "0")} `)
    .replace(/\s+/g, " ")
    .trim();
}

function buildCourseRoadmapBlock(context = {}) {
  const course = COURSE_CATALOG?.[context.course || ""];
  const sessions = Array.isArray(course?.sessions) ? course.sessions : [];
  if (!sessions.length) return null;

  const topics = [];
  sessions.forEach((session) => {
    (Array.isArray(session.topics) ? session.topics : []).forEach((topic) => {
      topics.push({
        session: compactSessionTitle(session.label || session.id || ""),
        id: topic.id,
        title: topic.title || String(topic.label || "").replace(/^Topic\s+\d+\s+[—-]\s*/i, ""),
      });
    });
  });
  if (!topics.length) return null;

  const currentIndex = Math.max(0, topics.findIndex((topic) => topic.id === context.topic));
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  return {
    id: "calculus1_roadmap",
    type: "course_path",
    layout: "topic_grid",
    currentId: `path_topic_${String(safeIndex + 1).padStart(2, "0")}`,
    items: topics.map((topic, index) => {
      const isPreviousNeighbor = index === safeIndex - 1;
      const isCurrent = index === safeIndex;
      const isNextNeighbor = index === safeIndex + 1;
      return {
        id: `path_topic_${String(index + 1).padStart(2, "0")}`,
        number: index + 1,
        session: topic.session,
        label: topic.title,
        note: isPreviousNeighbor ? "Previous" : isCurrent ? "This topic" : isNextNeighbor ? "Next" : "",
        status: index < safeIndex ? "completed" : isCurrent ? "current" : isNextNeighbor ? "next" : "upcoming",
        expanded: isPreviousNeighbor || isCurrent || isNextNeighbor || undefined,
      };
    }),
  };
}

function stripBulletMarker(line) {
  return line
    .replace(/^\s*[-*]\s+/, "")
    .replace(/^\s*\d+[.)]\s+/, "")
    .replace(/^\s*\\bullet\s*/, "")
    .trim();
}

function isBulletLine(line) {
  return /^\s*([-*]|\d+[.)]|\\bullet)\s+/.test(line);
}

function isMarkdownTable(block) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  return lines.length >= 2
    && lines.every((line) => line.startsWith("|") && line.endsWith("|"))
    && lines.some((line) => /^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?$/.test(line));
}

function parseMarkdownTable(block) {
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  const useful = lines.filter((line) => !/^\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)+\|?$/.test(line));
  if (useful.length < 2) return null;
  const rows = useful.map((line) => line
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => compactText(cell)));
  return {
    headers: rows[0] || [],
    rows: rows.slice(1),
  };
}

function splitTableBlocks(content) {
  const lines = content.split("\n");
  const result = [];
  let cursor = [];
  let table = [];

  const flushText = () => {
    const text = cursor.join("\n").trim();
    if (text) result.push({ kind: "text", value: text });
    cursor = [];
  };
  const flushTable = () => {
    const text = table.join("\n").trim();
    if (text) result.push({ kind: "table", value: text });
    table = [];
  };

  lines.forEach((line) => {
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      flushText();
      table.push(line);
      return;
    }
    if (table.length) flushTable();
    cursor.push(line);
  });
  flushText();
  if (table.length) flushTable();
  return result;
}

function splitStepLines(value) {
  const text = compactText(value);
  const lines = text.split("\n").map((line) => stripBulletMarker(line.trim())).filter(Boolean);
  if (lines.length > 1) return lines;
  return text
    .split(/(?<=[.!?])\s+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function mistakePairsFromText(value) {
  const text = compactText(value).replace(/\n+/g, " ");
  const wrongMatch = text.match(/\*\*Wrong thinking:\*\*\s*([\s\S]*?)(?=\*\*Correct:\*\*|$)/i);
  const correctMatch = text.match(/\*\*Correct:\*\*\s*([\s\S]*?)(?=\*\*Key idea:\*\*|$)/i);
  const keyMatch = text.match(/\*\*Key idea:\*\*\s*([\s\S]*)$/i);
  if (!wrongMatch && !correctMatch) return null;
  return [
    {
      label: "Tempting mistake",
      text: wrongMatch?.[1]?.trim() || "The tempting shortcut is not reliable.",
    },
    {
      label: "Safer reasoning",
      text: [correctMatch?.[1], keyMatch?.[1]].filter(Boolean).join(" ").trim(),
    },
  ];
}

function blockTypeForSteps(slide) {
  const title = String(slide?.title || "").toLowerCase();
  if (/proof|theorem|challenge/.test(title)) return "proof_sketch";
  if (/example|application|warm-up|standard|tricky|edge case/.test(title)) return "example_solution";
  return "derivation_steps";
}

function addParagraphOrBullets(targetBlocks, value, prefix) {
  const content = compactText(value);
  if (!content) return;

  const contentBlocks = content.split(/\n{2,}/).map((block) => block.trim()).filter(Boolean);
  let blockCount = 0;

  for (const block of contentBlocks) {
    const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
    if (!lines.length) continue;

    if (isMarkdownTable(block)) {
      const table = parseMarkdownTable(block);
      if (table) {
        blockCount += 1;
        targetBlocks.push({
          id: `${prefix}_table_${blockCount}`,
          type: "math_table",
          ...table,
        });
      }
      continue;
    }

    if (lines.length > 1 && lines.every(isBulletLine)) {
      blockCount += 1;
      targetBlocks.push({
        id: `${prefix}_bullets_${blockCount}`,
        type: "nested_bullets",
        items: lines.map((line, index) => ({
          id: `${prefix}_bullet_${index + 1}`,
          text: stripBulletMarker(line),
        })),
      });
      continue;
    }

    blockCount += 1;
    targetBlocks.push({
      id: `${prefix}_paragraph_${blockCount}`,
      type: "paragraph",
      text: emphasizeTerms(lines.join(" ")),
    });
  }
}

const ANALYSIS_VARIANT_RULES = [
  {
    variant: "",
    patterns: [/function families|gallery|2x4 grid|key takeaways|learning objectives/],
  },
  {
    variant: "composition_exclusion",
    patterns: [/\\frac\{1\}\{\\sqrt\{x\}-1\}/, /1\/\(sqrt\(x\)\s*-\s*1\)/, /sqrt\(x\)\s*!=\s*1/, /sqrt\(x\).*denominator/],
  },
  {
    variant: "product_even_odd",
    patterns: [/product of even and odd/, /if f even,?\s*g odd/, /h\(x\)=f\(x\)g\(x\)/],
  },
  {
    variant: "piecewise",
    patterns: [/piecewise/, /x<0/, /0\\le x\\le2/, /0≤x≤2/, /5-x/],
  },
  {
    variant: "odd_rational",
    patterns: [/x\^3\/\(x\^2\s*\+\s*1\)/, /\\frac\{x\^3\}\{x\^2\+1\}/, /odd function symmetry/, /h\(-x\)=-h\(x\)/, /even or odd\?/],
  },
  {
    variant: "symmetry_even_odd",
    patterns: [/even and odd symmetry/, /even and odd functions/, /f\(-x\)=f\(x\).*g\(-x\)=-g\(x\)/, /x\^2.*x\^3/],
  },
  {
    variant: "domain_sqrt_shift",
    patterns: [/sqrt\(x-3\)\+2/, /sqrt\{x-3\}\+2/, /domain and range/],
  },
  {
    variant: "composition_sqrt",
    patterns: [/composition/, /composite/, /sqrt\(x\+1\)/, /sqrt\{x\+1\}/, /f\(g\(x\)\)/],
  },
];

const ANALYSIS_DEFAULT_PARAMS = {
  domain_sqrt_shift: { x: 3 },
  composition_exclusion: { x: 0 },
  symmetry_even_odd: { a: 1.5 },
  odd_rational: { a: 2 },
  product_even_odd: { a: 1.2 },
  piecewise: { x: 1.5 },
};

const STATIC_ANALYSIS_VARIANTS = new Set(["product_even_odd"]);

function analysisVariantFromText(text) {
  const rule = ANALYSIS_VARIANT_RULES.find((item) => item.patterns.some((pattern) => pattern.test(text)));
  return rule?.variant || "";
}

function defaultParamsForAnalysisVariant(variant) {
  return { ...(ANALYSIS_DEFAULT_PARAMS[variant] || { x: 0 }) };
}

function timelineForAnalysisVariant(variant) {
  const params = defaultParamsForAnalysisVariant(variant);
  const middle = variant === "domain_sqrt_shift"
    ? { x: 6 }
    : variant === "piecewise"
      ? { x: 1.5 }
      : variant === "composition_exclusion"
        ? { x: 0.5 }
        : variant === "composition_sqrt"
          ? { x: 2 }
          : { a: variant === "product_even_odd" ? 1.6 : 2 };
  const end = variant === "domain_sqrt_shift"
    ? { x: 9 }
    : variant === "piecewise"
      ? { x: 3 }
      : variant === "composition_exclusion"
        ? { x: 1.5 }
        : variant === "composition_sqrt"
          ? { x: 3.5 }
          : { a: variant === "product_even_odd" ? 2.1 : 2.6 };
  return [
    { t: 0, params },
    { t: 5, params: middle },
    { t: 9, params: end },
  ];
}

function timelineForWidget(widget, params, text) {
  return [
    { t: 0, params },
    {
      t: 4,
      params: widget === "riemann_integral"
        ? { ...params, n: 18 }
        : widget === "function_transform" && /stretch|reflection/.test(text)
          ? { ...params, a: -1.4, b: 1.8 }
          : params,
    },
    {
      t: 8,
      params: widget === "function_transform"
        ? (/stretch|reflection/.test(text) ? { ...params, a: 1.8, b: 2.4 } : { ...params, h: 1.5, k: 1 })
        : widget === "secant_tangent"
          ? { ...params, h: 0.2 }
          : widget === "limit_epsilon"
            ? { ...params, epsilon: 0.25, x: 1.2 }
            : { ...params, n: 28 },
    },
  ];
}

function widgetSpecFromPart(part, slide, prefix) {
  const text = [
    slide?.title,
    part?.content,
    part?.visual_spec,
    ...(Array.isArray(part?.interactive_controls) ? part.interactive_controls : []),
  ].join(" ").toLowerCase();

  let widget = "";
  let params = {};
  let variant = "";
  if (/function families|gallery|2x4|shift|stretch|reflection|transform|parabola|sin\(x\)|sine/.test(text)) {
    widget = "function_transform";
    params = /-2\*\(x\+1\)\*\*2 \+ 3|-2\(x\+1\)\^2\+3|-2\(x\+1\)\^2 \+ 3/.test(text)
      ? { family: "quadratic", a: -2, b: 1, h: -1, k: 3 }
      : /sin|sine/.test(text)
        ? { family: "sine", a: 1, b: 1, h: 0, k: 0 }
        : { family: "quadratic", a: 1, b: 1, h: 0, k: 0 };
    if (/function families|gallery|2x4/.test(text)) variant = "family_gallery";
  } else if (/riemann|integral|area under|left sum|right sum|midpoint rule|rectangles?\s+(under|approx|n\b)|rectangle approximation/.test(text)) {
    widget = "riemann_integral";
    params = { a: 0, b: 3, n: 8, method: "midpoint" };
  } else if (/secant|tangent|derivative|linear approximation|slope of the tangent/.test(text)) {
    widget = "secant_tangent";
    params = { a: 1, h: 1 };
  } else if (/epsilon|delta|limit|approach|continuity/.test(text)) {
    widget = "limit_epsilon";
    params = { a: 1, epsilon: 0.5, x: 1.7 };
  } else {
    const analysisVariant = analysisVariantFromText(text);
    if (analysisVariant) {
      widget = "function_analysis";
      variant = analysisVariant;
      params = defaultParamsForAnalysisVariant(variant);
    }
  }

  if (!widget) return null;
  const id = `${prefix}_${widget}`;
  return {
    id,
    kind: "calculus_widget",
    widget,
    variant,
    title: part?.content || slide?.title || titleCase(widget),
    caption: "",
    params,
    source: "Generated from calculus material visual_spec.",
    sourceSpec: compactText(part?.visual_spec || ""),
    sourceCode: part?.python_code || "",
    scriptedTimeline: timelineForWidget(widget, params, text),
  };
}

function staticAnalysisVariant(variant) {
  return STATIC_ANALYSIS_VARIANTS.has(variant);
}

function synthesizedWidgetForSlide(slide, prefix = "body") {
  if (!/example|challenge|composition|piecewise|domain|range|even|odd/i.test(slide?.title || "")) return null;
  const text = [
    slide?.title,
    slide?.on_screen_text,
    slide?.teacher_narration,
    slide?.student_prompt,
    slide?.left?.content,
    slide?.right?.content,
  ].join(" ").toLowerCase();
  const variant = analysisVariantFromText(text);
  if (!variant) return null;
  const spec = {
    id: `${prefix}_function_analysis`,
    kind: "calculus_widget",
    widget: "function_analysis",
    variant,
    title: slide?.title || "Function analysis",
    caption: "",
    params: defaultParamsForAnalysisVariant(variant),
    source: "Synthesized from calculus slide content.",
    scriptedTimeline: timelineForAnalysisVariant(variant),
  };
  if (staticAnalysisVariant(variant)) {
    spec.interactive = false;
    spec.controls = [];
  }
  return spec;
}

function stepWidgetParams(text, slide, index) {
  const rowText = String(text || "").toLowerCase();
  const combined = [
    slide?.title,
    slide?.on_screen_text,
    slide?.teacher_narration,
    slide?.student_prompt,
    rowText,
  ].join(" ").toLowerCase();
  if (/-2\(x\+1\)\^2\+3|transformation sequence|left 1|stretch & reflect|up 3|new vertex/.test(combined)) {
    if (/left 1/.test(rowText)) return { family: "quadratic", a: 1, b: 1, h: -1, k: 0 };
    if (/stretch|reflect/.test(rowText)) return { family: "quadratic", a: -2, b: 1, h: -1, k: 0 };
    if (/up 3|new vertex|x-intercepts/.test(rowText)) return { family: "quadratic", a: -2, b: 1, h: -1, k: 3 };
    return { family: "quadratic", a: 1, b: 1, h: 0, k: 0 };
  }
  const variant = analysisVariantFromText(combined);
  if (variant === "piecewise") {
    if (/f\(-1\)/.test(rowText)) return { x: -1 };
    if (/f\(0\)/.test(rowText)) return { x: 0 };
    if (/f\(3\)|5-3/.test(rowText)) return { x: 3 };
    if (/f\(1\.5\)|1\.5/.test(rowText)) return { x: 1.5 };
    return null;
  }
  if (variant === "domain_sqrt_shift") {
    if (/restrict|domain|min value|x=3|f\(3\)/.test(rowText)) return { x: 3 };
    if (/as x grows|infty|infinity|range/.test(rowText)) return { x: 9 };
    return null;
  }
  if (variant === "composition_exclusion") {
    if (/f\(\\sqrt\{x\}\)|\\frac\{1\}\{\\sqrt\{x\}-1\}/.test(rowText)) return { x: 0.5 };
    if (/inner domain|x\\ge0|x≥0/.test(rowText)) return { x: 0 };
    if (/denominator|neq0|neq 0|\\neq1|x≠1/.test(rowText)) return { x: 1 };
    if (/combined domain|\[0,1\)|\(1,/.test(rowText)) return { x: 2 };
    return null;
  }
  if (variant === "composition_sqrt") {
    if (/domain|x\\ge|x≥/.test(rowText)) return { x: -1 };
    if (/sqrt|composite|f\(g\(x\)\)/.test(rowText)) return { x: 2 };
    return null;
  }
  return null;
}

function tableRowActions(rows, slide) {
  const actions = (rows || []).map((cells, index) => {
    const text = Array.isArray(cells) ? cells.join(" ") : String(cells || "");
    const params = stepWidgetParams(text, slide, index + 1);
    return params ? { widgetParams: params } : null;
  });
  return actions.some(Boolean) ? actions : undefined;
}

function appendBlocksForPart(column, part, slide, prefix) {
  const contentType = String(part?.content_type || "").toLowerCase();
  const content = compactText(part?.content || "");
  if (!content && !part?.visual_spec) return;

  if (contentType === "formula_block") {
    column.blocks.push({
      id: `${prefix}_formula`,
      type: "formula_block",
      formulas: splitFormulaLines(content),
      text: splitFormulaLines(content).join("\n"),
    });
    return;
  }

  if (contentType === "steps") {
    const pairs = mistakePairsFromText(content);
    if (pairs) {
      column.blocks.push({
        id: `${prefix}_misconception`,
        type: "misconception_compare",
        title: "Common misconception",
        pairs,
      });
      return;
    }

    const chunks = splitTableBlocks(content);
    const intro = chunks.find((chunk) => chunk.kind === "text")?.value || "";
    const table = chunks.find((chunk) => chunk.kind === "table");
    column.blocks.push({
      id: `${prefix}_steps`,
      type: blockTypeForSteps(slide),
      title: /proof|theorem|challenge/i.test(slide?.title || "") ? "Proof sketch" : "Solution path",
      text: table ? intro : "",
      steps: table ? [] : splitStepLines(content).map((line, index) => ({
        id: `${prefix}_step_${index + 1}`,
        text: line,
        widgetParams: stepWidgetParams(line, slide, index + 1) || undefined,
      })),
    });
    if (table) {
      const parsed = parseMarkdownTable(table.value);
      if (parsed) {
        column.blocks.push({
          id: `${prefix}_table`,
          type: "math_table",
          ...parsed,
          rowActions: tableRowActions(parsed.rows, slide),
        });
      }
    }
    return;
  }

  if (contentType === "visual_spec" || contentType === "python_lab" || part?.visual_spec) {
    if (content && contentType !== "visual_spec") {
      addParagraphOrBullets(column.blocks, content, `${prefix}_content`);
    }
    if (part?.image_src || part?.media_src) {
      column.media = {
        id: `${prefix}_image`,
        kind: "image",
        src: part.image_src || part.media_src,
        alt: part?.content || slide?.title || "Calculus visual",
        caption: part?.caption || "",
        fit: part?.fit || "contain",
      };
      return;
    }
    const widget = widgetSpecFromPart(part, slide, prefix);
    if (widget) {
      column.media = widget;
      return;
    }
    if (part?.visual_spec) {
      column.blocks.push({
        id: `${prefix}_visual_plan`,
        type: "paragraph",
        text: `**Visual plan:** ${compactText(part.visual_spec)}`,
        source: {
          python_code: part.python_code || "",
        },
      });
    }
    return;
  }

  addParagraphOrBullets(column.blocks, content, prefix);
}

function addPauseBlock(column, slide, prefix) {
  const prompt = cleanQuestion(slide?.student_prompt || "");
  if (!prompt || !slide?.youtube_pause) return;
  const answer = promptAnswer(slide?.student_prompt || "");
  column.blocks.push({
    id: `${prefix}_pause`,
    type: "pause_and_reveal",
    title: "Pause and predict",
    prompt: "Reveal after you decide.",
    reveal: {
      text: answer || "Think through the graph or formula first, then continue with the explanation.",
    },
  });
}

function buildColumn(part, prefix, slide) {
  const column = {
    paragraphs: [],
    bullets: [],
    blocks: [],
  };

  if (!part || part.content_type === "empty") {
    return column;
  }

  appendBlocksForPart(column, part, slide, prefix);

  const controls = Array.isArray(part.interactive_controls)
    ? part.interactive_controls.map((item) => String(item || "").trim()).filter(Boolean)
    : [];
  if (controls.length && !column.media) {
    column.bullets.push(...controls.map((item, index) => ({
      id: `${prefix}_control_${index + 1}`,
      text: item,
    })));
  }

  if (part.python_code) {
    column.source = {
      ...(column.source || {}),
      python_code: part.python_code,
    };
  }

  return column;
}

function slideBadge(slide) {
  const badges = [];
  if (slide.youtube_pause) badges.push("Pause");
  if (slide.skip_if_time_limited) badges.push("Optional");
  if (slide.difficulty && slide.difficulty !== "core") badges.push(titleCase(slide.difficulty));
  return badges.length ? ` (${badges.join(" · ")})` : "";
}

function buildMaterialSlide(slide, index, hudDefault) {
  const slideId = `s${String(slide.slide_number || index + 1).padStart(2, "0")}_${slugify(slide.title, `slide_${index + 1}`)}`;
  const title = `${slide.title || `Slide ${index + 1}`}${slideBadge(slide)}`;
  const onScreenText = compactText(slide.on_screen_text);
  const notes = [
    compactText(slide.teacher_narration),
    slide.student_prompt ? `Student prompt: ${compactText(slide.student_prompt)}` : "",
  ].filter(Boolean).join("\n\n");
  const question = questionFromSlide(slide);

  if (slide.layout === "full_width") {
    const blocks = [];
    if (onScreenText) {
      blocks.push({
        id: "on_screen_text",
        type: "paragraph",
        text: `**Key idea:** ${emphasizeTerms(onScreenText)}`,
      });
    }

    const column = buildColumn(slide.left || slide.right, "body", slide);
    blocks.push(...column.blocks);
    addPauseBlock({ blocks }, slide, "body");
    const media = column.media || synthesizedWidgetForSlide(slide, "body");
    if (media && blocks.length) {
      return {
        id: slideId,
        type: "two-col",
        hud: hudDefault,
        title,
        question,
        left: {
          paragraphs: [],
          bullets: [],
          blocks: blocks.length
            ? blocks
            : [{ id: "empty", type: "paragraph", text: "Content pending." }],
          lead: column.lead || "",
        },
        right: {
          paragraphs: [],
          bullets: [],
          blocks: [],
          media,
        },
        notes,
      };
    }

    return {
      id: slideId,
      type: media ? "visual_lab" : "text",
      hud: hudDefault,
      title,
      question,
      lead: column.lead || "",
      blocks: blocks.length
        ? blocks
        : [{ id: "empty", type: "paragraph", text: "Content pending." }],
      media,
      notes,
    };
  }

  const left = buildColumn(slide.left, "left", slide);
  const right = buildColumn(slide.right, "right", slide);
  if (!right.media) {
    right.media = synthesizedWidgetForSlide(slide, "right");
  }

  if (onScreenText && !left.lead) {
    left.lead = emphasizeTerms(onScreenText);
  }
  addPauseBlock(left, slide, "left");

  return {
    id: slideId,
    type: "two-col",
    hud: hudDefault,
    title,
    question,
    left,
    right,
    notes,
  };
}

export function adaptCalculusMaterialToDeck(material, context = {}) {
  const meta = material?.lecture_meta || {};
  const courseTitle = context.courseTitle || "Calculus";
  const schoolName = context.schoolName || "Arian University";
  const topicTitle = meta.title || context.topicTitle || context.topic || "Calculus Topic";
  const hudDefault = `${schoolName} — ${courseTitle}`;
  const objectives = Array.isArray(meta.learning_objectives) ? meta.learning_objectives : [];
  const roadmapBlock = buildCourseRoadmapBlock(context);

  const titleSlide = {
    id: "topic_title",
    type: "title",
    hud: hudDefault,
    title: topicTitle,
    subtitle: `${schoolName} • ${courseTitle}`,
    meta: [
      meta.topic ? `Topic: ${meta.topic}` : "",
      meta.estimated_duration_minutes ? `~${meta.estimated_duration_minutes} min` : "",
      meta.student_level || "",
    ].filter(Boolean).join(" • "),
    notes: meta.prerequisite_reminder || "",
  };

  const objectiveSlide = objectives.length
    ? {
      id: "learning_objectives",
      type: "bullets",
      hud: hudDefault,
      title: "Learning Objectives",
      lead: "By the end of this topic you will be able to:",
      blocks: roadmapBlock ? [roadmapBlock] : [],
      bullets: objectives.map((objective, index) => ({
        id: `objective_${index + 1}`,
        text: compactText(objective),
      })),
      notes: objectives.length
        ? `First orient students on the course roadmap, then frame the lesson promise: ${objectives.map(compactText).join(" ")}`
        : "",
    }
    : null;

  const materialSlides = (Array.isArray(material?.slides) ? material.slides : [])
    .map((slide, index) => buildMaterialSlide(slide, index, hudDefault));

  return {
    topicMeta: {
      id: context.topic || slugify(topicTitle, "calculus_topic"),
      title: topicTitle,
      hudDefault,
      hudPrefix: "Arian • ",
      email: context.email || "",
    },
    slidesData: [
      titleSlide,
      ...(objectiveSlide ? [objectiveSlide] : []),
      ...materialSlides,
    ],
  };
}

export { slugify as slugifyCalculusMaterial };
