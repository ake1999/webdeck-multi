#!/usr/bin/env node

import path from "node:path";
import { runCatalogValidation } from "./lib/validation.mjs";
import { projectRoot } from "./lib/export_runtime.mjs";

function parseArgs(argv) {
  const args = {
    outputDir: path.join(projectRoot, "generated", "validation"),
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

  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const { report, artifactPaths } = await runCatalogValidation(args);

  console.log(`Validation JSON written to ${artifactPaths.jsonPath}`);
  console.log(`Validation Markdown written to ${artifactPaths.mdPath}`);
  console.log(`Validation HTML written to ${artifactPaths.htmlPath}`);
  console.log(
    `Topics scanned: ${report.summary.topics_scanned} | ready=${report.summary.ready} warning=${report.summary.warning} blocked=${report.summary.blocked}`,
  );
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error?.stack || error?.message || error);
    process.exit(1);
  });
