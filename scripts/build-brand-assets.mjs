/**
 * Builds favicon and app icons from the original logo. Run with `npm run assets`.
 * The editorial art in public/generated is exported from assets/originals.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const out = (...p) => path.join(root, ...p);

const CREAM = "#f2ebd8";

async function buildIcons() {
  // Transparent monogram exported from the brand file (assets/originals/logo-mark.png).
  const mark = await sharp(out("assets/originals/logo-mark.png"))
    .extract({ left: 290, top: 242, width: 960, height: 860 })
    .png()
    .toBuffer();
  await sharp(mark).resize({ width: 800 }).png({ compressionLevel: 9 }).toFile(out("public/brand/es-mark.png"));

  const square = async (size, scale, file) => {
    const inner = await sharp(mark)
      .resize({ width: Math.round(size * scale), height: Math.round(size * scale), fit: "inside" })
      .png()
      .toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: CREAM } })
      .composite([{ input: inner, gravity: "centre" }])
      .png()
      .toFile(out(file));
  };

  await square(512, 0.72, "src/app/icon.png");
  await square(180, 0.74, "src/app/apple-icon.png");
  await square(512, 0.72, "public/brand/es-monogram-512.png");
  await square(512, 0.6, "public/brand/maskable-512.png");
  await square(48, 0.86, "public/brand/favicon-48.png");
  await square(32, 0.9, "public/brand/favicon-32.png");
  await square(16, 0.95, "public/brand/favicon-16.png");
}

await mkdir(out("public/generated"), { recursive: true });
await buildIcons();
console.log("brand assets built");
