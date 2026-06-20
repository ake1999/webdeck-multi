import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { projectRoot } from "./lib/export_runtime.mjs";
import { resolveColorMode } from "../shared/deck_color_mode.js";

const colorModeJs = readFileSync(path.join(projectRoot, "shared/deck_color_mode.js"), "utf8");
assert.ok(colorModeJs.includes("fa-solid fa-sun"), "color mode button should use Font Awesome icons");

assert.equal(resolveColorMode("light"), "light");
assert.equal(resolveColorMode("dark"), "dark");

const deckCss = readFileSync(path.join(projectRoot, "shared/deck.css"), "utf8");
assert.ok(deckCss.includes('@import "./styles/tokens.css"'), "deck.css should import tokens");
assert.ok(deckCss.includes('@import "./styles/theme-arian.css"'), "deck.css should import arian theme");

const tokens = readFileSync(path.join(projectRoot, "shared/styles/tokens.css"), "utf8");
assert.ok(tokens.includes(".theme-arian.theme-dark"), "tokens should define dark palette");

const darkCss = readFileSync(path.join(projectRoot, "shared/styles/theme-arian-dark.css"), "utf8");
const arianCss = readFileSync(path.join(projectRoot, "shared/styles/theme-arian.css"), "utf8");
assert.ok(arianCss.includes(".calculus-axis-label") || darkCss.includes(".calculus-axis-label"), "theme should style plot axis labels");
assert.ok(darkCss.includes(".compare-panel--wrong"), "dark theme should style misconception panels");
assert.ok(darkCss.includes(".katex .mord"), "dark theme should force KaTeX glyph colors");
assert.ok(arianCss.includes("--deck-plot-surface"), "arian theme should bind plot surfaces to tokens");
assert.ok(arianCss.includes(".lead"), "arian theme should style column lead copy");
assert.ok(arianCss.includes("pause_and_reveal"), "arian theme should style pause blocks");
assert.ok(tokens.includes("--deck-pause-prompt"), "tokens should define pause block colors");
assert.ok(tokens.includes("--deck-table-bg"), "tokens should define math table colors");
assert.ok(arianCss.includes(".math-table"), "arian theme should style math tables");

const svgPlot = readFileSync(path.join(projectRoot, "shared/calculus/core/svg_plot.js"), "utf8");
assert.ok(svgPlot.includes("calculus-plot-bg"), "plots should render a themeable background rect");

console.log("deck color mode: ok");