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
  const monogram = await sharp(out("public/brand/es-monogram.png")).toBuffer();
  const square = async (size, bg, scale = 0.68) =>
    sharp({ create: { width: size, height: size, channels: 4, background: bg } })
      .composite([
        {
          input: await sharp(monogram)
            .resize({ width: Math.round(size * scale), height: Math.round(size * scale), fit: "inside", kernel: "lanczos3" })
            .toBuffer(),
          gravity: "centre",
        },
      ]);

  await (await square(512, CREAM)).png().toFile(out("src/app/icon.png"));
  await (await square(180, CREAM, 0.72)).png().toFile(out("src/app/apple-icon.png"));
  await (await square(48, CREAM, 0.8)).png().toFile(out("public/brand/favicon-48.png"));
  await (await square(32, CREAM, 0.84)).png().toFile(out("public/brand/favicon-32.png"));
  await (await square(16, CREAM, 0.9)).png().toFile(out("public/brand/favicon-16.png"));
  await (await square(512, CREAM, 0.62)).png().toFile(out("public/brand/maskable-512.png"));
}

await mkdir(out("public/generated"), { recursive: true });
await buildIcons();
console.log("brand assets built");
