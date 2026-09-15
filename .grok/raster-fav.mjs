import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const files = process.argv.slice(2);
const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    "/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell",
});

for (const file of files) {
  const svg = readFileSync(file, "utf8");
  for (const size of [16, 32, 64]) {
    const page = await browser.newPage({
      viewport: { width: size, height: size },
      deviceScaleFactor: 1,
    });
    await page.setContent(
      `<!doctype html><html><head><style>
        html,body{margin:0;padding:0;background:#888;width:${size}px;height:${size}px;overflow:hidden}
        svg{display:block;width:${size}px;height:${size}px}
      </style></head><body>${svg}</body></html>`,
      { waitUntil: "load" },
    );
    const out = file.replace(/\.svg(?:\.tmp)?$/, `-${size}.png`);
    await page.screenshot({ path: out, omitBackground: false });
    await page.close();
    console.log("wrote", out);
  }
}
await browser.close();
