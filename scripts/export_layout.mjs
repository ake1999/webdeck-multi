#!/usr/bin/env node

import path from "node:path";
import { exportTopicLayout, parseViewport, projectRoot } from "./lib/export_runtime.mjs";

function parseArgs(argv) {
  const args = {
    outDir: path.join(projectRoot, "generated"),
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

  if (!args.school || !args.course || !args.session || !args.topic) {
    throw new Error(
      "Usage: node scripts/export_layout.mjs --school AC --course ROB9205_Industrial_Robots_W2026 --session S01 --topic 02_robot_safety",
    );
  }

  args.viewport = parseViewport(args.viewport);
  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const result = await exportTopicLayout(args, { viewport: args.viewport });
  console.log(`Manifest written to ${result.manifestPath}`);
  console.log(`Screenshots written to ${result.screenshotsDir}`);
  console.log(`Topic ${result.manifest.topic_id}: ${result.manifest.slides.length} slides exported.`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
