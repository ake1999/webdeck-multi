#!/usr/bin/env node

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { buildTopicArtifactDir, createExportRuntime, parseViewport, projectRoot } from "./lib/export_runtime.mjs";
import { discoverTopics, filterTopics, summarizeSelector, toReviewLabel } from "./lib/catalog.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "smoke"),
    viewport: "1920x1080",
    debugScreenshots: false,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;

    const key = token.slice(2);
    if (key === "debug-screenshots") {
      args.debugScreenshots = true;
      continue;
    }

    const value = argv[index + 1];
    if (value == null || value.startsWith("--")) {
      throw new Error(`Missing value for --${key}`);
    }

    args[key] = value;
    index += 1;
  }

  args.viewport = parseViewport(args.viewport);
  return args;
}

function makeMarkdown(report) {
  const lines = [
    "# WebDeck Smoke Export Report",
    "",
    `- Generated: ${report.generated_at}`,
    `- Selector: \`${report.selector}\``,
    `- Topics: ${report.summary.total}`,
    `- Success: ${report.summary.success}`,
    `- Failed: ${report.summary.failed}`,
    "",
  ];

  report.topics.forEach((topic) => {
    lines.push(`## ${toReviewLabel(topic)}`);
    lines.push("");
    lines.push(`- Status: ${topic.status}`);
    if (topic.manifest_path) lines.push(`- Manifest: \`${topic.manifest_path}\``);
    if (topic.screenshots_dir) lines.push(`- Screenshots: \`${topic.screenshots_dir}\``);
    if (topic.slide_count != null) lines.push(`- Slides: ${topic.slide_count}`);
    if (topic.error) lines.push(`- Error: ${topic.error}`);
    lines.push("");
  });

  return `${lines.join("\n")}\n`;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const selector = {
    school: args.school || "",
    course: args.course || "",
    session: args.session || "",
    topic: args.topic || "",
  };

  const topics = filterTopics(await discoverTopics(), selector);
  if (!topics.length) {
    throw new Error(`No topics matched selector ${summarizeSelector(selector)}.`);
  }

  const runtime = await createExportRuntime({ viewport: args.viewport });
  const report = {
    generated_at: new Date().toISOString(),
    selector: summarizeSelector(selector),
    viewport: args.viewport,
    topics: [],
    summary: {
      total: topics.length,
      success: 0,
      failed: 0,
    },
  };

  try {
    for (const descriptor of topics) {
      const outDir = buildTopicArtifactDir(path.join(args.outputDir, "exports"), descriptor);

      try {
        const exported = await runtime.exportTopic({
          ...descriptor,
          outDir,
          debugScreenshots: args.debugScreenshots,
          viewport: args.viewport,
        });

        report.summary.success += 1;
        report.topics.push({
          ...descriptor,
          status: "success",
          manifest_path: path.relative(projectRoot, exported.manifestPath),
          screenshots_dir: path.relative(projectRoot, exported.screenshotsDir),
          slide_count: exported.manifest.slides.length,
        });
      } catch (error) {
        report.summary.failed += 1;
        report.topics.push({
          ...descriptor,
          status: "failed",
          error: error?.message || String(error),
          manifest_path: "",
          screenshots_dir: "",
          slide_count: null,
        });
      }
    }
  } finally {
    await runtime.close();
  }

  await mkdir(args.outputDir, { recursive: true });
  const jsonPath = path.join(args.outputDir, "report.json");
  const mdPath = path.join(args.outputDir, "report.md");
  await writeFile(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  await writeFile(mdPath, makeMarkdown(report), "utf8");

  console.log(`Smoke export JSON written to ${jsonPath}`);
  console.log(`Smoke export Markdown written to ${mdPath}`);
  console.log(`Topics: ${report.summary.total} | success=${report.summary.success} failed=${report.summary.failed}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
