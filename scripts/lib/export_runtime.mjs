import { createReadStream } from "node:fs";
import { mkdtemp, mkdir, rm, stat, writeFile } from "node:fs/promises";
import http from "node:http";
import net from "node:net";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const projectRoot = path.resolve(__dirname, "..", "..");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".mp4": "video/mp4",
  ".ogv": "video/ogg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ttf": "font/ttf",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".zip": "application/zip",
};

export function parseViewport(input = "1920x1080") {
  if (Array.isArray(input) && input.length === 2) {
    return [Number(input[0]), Number(input[1])];
  }

  const match = String(input).match(/^(\d+)x(\d+)$/i);
  if (!match) {
    throw new Error(`Invalid viewport: ${input}`);
  }

  return [Number(match[1]), Number(match[2])];
}

export function buildTopicArtifactDir(baseDir, descriptor) {
  return path.join(
    baseDir,
    descriptor.school,
    descriptor.course,
    descriptor.session,
    descriptor.topic,
  );
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reservePort() {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(address.port));
    });
  });
}

export function resolveChromeExecutable() {
  const candidates = [
    process.env.CHROME_BIN,
    "google-chrome-stable",
    "google-chrome",
    "/usr/bin/google-chrome-stable",
    "/usr/bin/google-chrome",
  ].filter(Boolean);

  return Promise.any(
    candidates.map(
      (candidate) =>
        new Promise((resolve, reject) => {
          const child = spawn(candidate, ["--version"], { stdio: "ignore" });
          child.once("error", reject);
          child.once("exit", (code) => {
            if (code === 0) resolve(candidate);
            else reject(new Error(`Chrome candidate failed: ${candidate}`));
          });
        }),
    ),
  ).catch(() => {
    throw new Error("Could not find a Chrome executable for screenshot export.");
  });
}

function safeResolvePath(urlPath) {
  const pathname = decodeURIComponent(new URL(urlPath, "http://127.0.0.1").pathname);
  const normalized = pathname === "/" ? "/index.html" : pathname;
  const candidate = path.resolve(projectRoot, `.${normalized}`);

  if (!candidate.startsWith(projectRoot)) {
    throw new Error(`Blocked path traversal attempt: ${urlPath}`);
  }

  return candidate;
}

async function createStaticServer() {
  const server = http.createServer(async (req, res) => {
    try {
      const filePath = safeResolvePath(req.url || "/");
      let resolvedPath = filePath;

      const fileStat = await stat(filePath).catch(() => null);
      if (!fileStat) {
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Not found");
        return;
      }

      if (fileStat.isDirectory()) {
        resolvedPath = path.join(filePath, "index.html");
      }

      const ext = path.extname(resolvedPath).toLowerCase();
      res.writeHead(200, {
        "Cache-Control": "no-store",
        "Content-Type": mimeTypes[ext] || "application/octet-stream",
      });
      createReadStream(resolvedPath).pipe(res);
    } catch (error) {
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(String(error?.message || error));
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return {
    server,
    origin: `http://127.0.0.1:${address.port}`,
  };
}

export function buildTopicUrl(origin, descriptor, extraParams = {}) {
  const url = new URL("/session.html", origin);
  url.searchParams.set("school", descriptor.school);
  url.searchParams.set("course", descriptor.course);
  url.searchParams.set("session", descriptor.session);
  url.searchParams.set("topic", descriptor.topic);
  const analysisEnabled = extraParams.analysis !== false;
  if (analysisEnabled) {
    url.searchParams.set("analysis", "1");
  }

  Object.entries(extraParams).forEach(([key, value]) => {
    if (key === "analysis") return;
    if (value == null || value === false) return;
    url.searchParams.set(key, value === true ? "1" : String(value));
  });

  return url.toString();
}

async function waitForJson(url, predicate, timeoutMs = 10000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, { cache: "no-store" });
      if (response.ok) {
        const payload = await response.json();
        if (predicate(payload)) return payload;
      }
    } catch {}

    await sleep(150);
  }

  throw new Error(`Timed out waiting for ${url}`);
}

async function launchChrome(chromePath, viewport) {
  const remotePort = await reservePort();
  const userDataDir = await mkdtemp(path.join(os.tmpdir(), "webdeck-export-"));
  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      "--no-first-run",
      "--no-default-browser-check",
      `--remote-debugging-port=${remotePort}`,
      `--window-size=${viewport[0]},${viewport[1]}`,
      `--user-data-dir=${userDataDir}`,
      "about:blank",
    ],
    {
      cwd: projectRoot,
      stdio: ["ignore", "ignore", "pipe"],
    },
  );

  chrome.stderr.on("data", () => {});

  const targets = await waitForJson(
    `http://127.0.0.1:${remotePort}/json/list`,
    (payload) => Array.isArray(payload) && payload.some((target) => target.type === "page"),
    15000,
  );

  const pageTarget = targets.find((target) => target.type === "page");
  if (!pageTarget?.webSocketDebuggerUrl) {
    throw new Error("Chrome did not expose a page debugging target.");
  }

  return {
    chrome,
    userDataDir,
    wsUrl: pageTarget.webSocketDebuggerUrl,
  };
}

function createCdpClient(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    const pending = new Map();
    const listeners = new Map();
    let messageId = 0;

    const cleanup = (error) => {
      pending.forEach(({ reject: rejectPending }) => rejectPending(error));
      pending.clear();
    };

    socket.addEventListener("open", () => {
      resolve({
        async send(method, params = {}) {
          messageId += 1;
          const id = messageId;

          return await new Promise((resolveSend, rejectSend) => {
            pending.set(id, { resolve: resolveSend, reject: rejectSend });
            socket.send(JSON.stringify({ id, method, params }));
          });
        },

        waitFor(eventName, predicate = () => true, timeoutMs = 10000) {
          return new Promise((resolveWait, rejectWait) => {
            const timeout = setTimeout(() => {
              const bucket = listeners.get(eventName) || [];
              listeners.set(
                eventName,
                bucket.filter((entry) => entry.resolve !== resolveWait),
              );
              rejectWait(new Error(`Timed out waiting for ${eventName}`));
            }, timeoutMs);

            const bucket = listeners.get(eventName) || [];
            bucket.push({
              resolve: (params) => {
                clearTimeout(timeout);
                resolveWait(params);
              },
              reject: rejectWait,
              predicate,
            });
            listeners.set(eventName, bucket);
          });
        },

        close() {
          socket.close();
        },
      });
    });

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);

      if (message.id) {
        const resolver = pending.get(message.id);
        if (!resolver) return;
        pending.delete(message.id);

        if (message.error) {
          resolver.reject(new Error(message.error.message || "CDP command failed"));
        } else {
          resolver.resolve(message.result);
        }
        return;
      }

      if (!message.method) return;
      const bucket = listeners.get(message.method) || [];
      const remaining = [];

      bucket.forEach((entry) => {
        if (entry.predicate(message.params)) {
          entry.resolve(message.params);
        } else {
          remaining.push(entry);
        }
      });

      listeners.set(message.method, remaining);
    });

    socket.addEventListener("error", (error) => {
      cleanup(error);
      reject(error);
    });

    socket.addEventListener("close", () => {
      cleanup(new Error("CDP socket closed"));
    });
  });
}

async function waitForCondition(client, expression, timeoutMs = 20000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    const result = await client.send("Runtime.evaluate", {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });

    if (result.result?.value) return true;
    await sleep(200);
  }

  throw new Error(`Timed out waiting for condition: ${expression}`);
}

async function setViewport(client, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport[0],
    height: viewport[1],
    deviceScaleFactor: 1,
    mobile: false,
  });
}

async function prepareClient(client, viewport) {
  await client.send("Page.enable");
  await client.send("Runtime.enable");
  await client.send("Page.setLifecycleEventsEnabled", { enabled: true });
  await setViewport(client, viewport);
}

async function navigateTo(client, url, options = {}) {
  const analysisTimeoutMs = Number(options.analysisTimeoutMs) || 180000;
  const loadEvent = client.waitFor("Page.loadEventFired", () => true, 20000);
  await client.send("Page.navigate", { url });
  await loadEvent;
  await waitForCondition(client, "document.body?.dataset.deckReady === 'true'", 20000);
  if (options.analysisRequired !== false) {
    await waitForCondition(
      client,
      "document.body?.dataset.analysisReady === 'true'",
      analysisTimeoutMs,
    );
  }
}

async function readManifest(client) {
  const result = await client.send("Runtime.evaluate", {
    expression: "document.getElementById('deck-analysis-manifest')?.textContent || ''",
    returnByValue: true,
    awaitPromise: true,
  });

  if (!result.result?.value) {
    throw new Error("The analysis page did not produce deck-analysis-manifest content.");
  }

  return JSON.parse(result.result.value);
}

async function captureScreenshot(client, outputPath) {
  const screenshot = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
  });

  await writeFile(outputPath, Buffer.from(screenshot.data, "base64"));
}

async function writeManifest(outDir, manifest) {
  await mkdir(outDir, { recursive: true });
  const manifestPath = path.join(outDir, "layout.manifest.json");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return manifestPath;
}

async function exportScreenshots({ client, origin, descriptor, outDir, manifest, debugScreenshots }) {
  const screenshotsDir = path.join(outDir, "screenshots");
  await mkdir(screenshotsDir, { recursive: true });

  let debugDir = null;
  if (debugScreenshots) {
    debugDir = path.join(outDir, "debug");
    await mkdir(debugDir, { recursive: true });
  }

  for (const slide of manifest.slides) {
    const slideUrl = buildTopicUrl(origin, descriptor, {
      slide: slide.slide_id,
      analysis: false,
    });
    await navigateTo(client, slideUrl, { analysisRequired: false });
    await captureScreenshot(client, path.join(screenshotsDir, `${slide.slide_id}.png`));

    if (debugDir) {
      const debugUrl = buildTopicUrl(origin, descriptor, {
        slide: slide.slide_id,
        debug: "1",
        analysis: false,
      });
      await navigateTo(client, debugUrl, { analysisRequired: false });
      await captureScreenshot(client, path.join(debugDir, `${slide.slide_id}.png`));
    }
  }

  return {
    screenshotsDir,
    debugDir,
  };
}

async function cleanupChrome(runtime) {
  runtime.client?.close();

  if (runtime.chrome && !runtime.chrome.killed) {
    runtime.chrome.kill("SIGTERM");
    const exited = await Promise.race([
      new Promise((resolve) => runtime.chrome.once("exit", resolve)),
      sleep(3000).then(() => false),
    ]);
    if (!exited) {
      runtime.chrome.kill("SIGKILL");
      await Promise.race([
        new Promise((resolve) => runtime.chrome.once("exit", resolve)),
        sleep(1000),
      ]);
    }
  }

  if (runtime.userDataDir) {
    await rm(runtime.userDataDir, {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    }).catch(() => {});
  }
}

export async function createExportRuntime(options = {}) {
  const viewport = parseViewport(options.viewport || "1920x1080");
  const chromePath = options.chromePath || await resolveChromeExecutable();
  const { server, origin } = await createStaticServer();
  let chromeRuntime = null;

  try {
    chromeRuntime = await launchChrome(chromePath, viewport);
    const client = await createCdpClient(chromeRuntime.wsUrl);
    chromeRuntime.client = client;
    await prepareClient(client, viewport);

    return {
      origin,
      viewport,
      async exportTopic(descriptor) {
        const outDir = descriptor.outDir || path.join(projectRoot, "generated");
        const exportViewport = parseViewport(descriptor.viewport || viewport);
        await setViewport(client, exportViewport);
        await navigateTo(client, buildTopicUrl(origin, descriptor, {
          assetTimeoutMs: descriptor.analysisAssetTimeoutMs || 2500,
        }), {
          analysisRequired: true,
          analysisTimeoutMs: descriptor.analysisTimeoutMs,
        });

        const manifest = await readManifest(client);
        const manifestPath = await writeManifest(outDir, manifest);
        const screenshotResult = await exportScreenshots({
          client,
          origin,
          descriptor,
          outDir,
          manifest,
          debugScreenshots: Boolean(descriptor.debugScreenshots),
        });

        return {
          descriptor,
          viewport: exportViewport,
          manifest,
          manifestPath,
          screenshotsDir: screenshotResult.screenshotsDir,
          debugDir: screenshotResult.debugDir,
        };
      },
      async close() {
        await cleanupChrome(chromeRuntime || {});
        await new Promise((resolve) => server.close(resolve));
      },
    };
  } catch (error) {
    await cleanupChrome(chromeRuntime || {});
    await new Promise((resolve) => server.close(resolve));
    throw error;
  }
}

export async function exportTopicLayout(descriptor, options = {}) {
  const runtime = await createExportRuntime(options);
  try {
    return await runtime.exportTopic(descriptor);
  } finally {
    await runtime.close();
  }
}
