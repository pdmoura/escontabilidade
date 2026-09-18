/**
 * Builds brand raster assets from the original logo and renders the editorial
 * art panel used across the site. Run with `npm run assets`.
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const out = (...p) => path.join(root, ...p);

const CREAM = "#f2ebd8";
const GOLD = "#e0b860";

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

function pulsePath(width, y, amp, segments) {
  let d = `M 0 ${y}`;
  const step = width / segments;
  for (let i = 0; i < segments; i++) {
    const x = i * step;
    if (i % 5 === 2) {
      d += ` L ${x + step * 0.25} ${y} L ${x + step * 0.4} ${y - amp} L ${x + step * 0.55} ${y + amp * 0.7} L ${x + step * 0.7} ${y}`;
    } else {
      d += ` L ${x + step} ${y}`;
    }
  }
  return d;
}

function editorialSvg(w, h) {
  const grid = [];
  for (let x = 0; x <= w; x += w / 18) grid.push(`<line x1="${x}" y1="0" x2="${x}" y2="${h}" />`);
  for (let y = 0; y <= h; y += h / 14) grid.push(`<line x1="0" y1="${y}" x2="${w}" y2="${y}" />`);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1f110c"/>
      <stop offset="0.55" stop-color="#3a231b"/>
      <stop offset="1" stop-color="#5a3a2e"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.72" cy="0.3" r="0.6">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0.55"/>
      <stop offset="0.5" stop-color="${GOLD}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.2" cy="0.85" r="0.55">
      <stop offset="0" stop-color="${CREAM}" stop-opacity="0.32"/>
      <stop offset="1" stop-color="${CREAM}" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="sheet" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${CREAM}" stop-opacity="0.16"/>
      <stop offset="1" stop-color="${CREAM}" stop-opacity="0.03"/>
    </linearGradient>
    <linearGradient id="sheet2" x1="1" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${GOLD}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${GOLD}" stop-opacity="0.02"/>
    </linearGradient>
    <filter id="blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="28"/></filter>
    <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch"/><feColorMatrix values="0 0 0 0 1 0 0 0 0 0.9 0 0 0 0 0.75 0 0 0 0.07 0"/></filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <rect width="${w}" height="${h}" fill="url(#glow)"/>
  <rect width="${w}" height="${h}" fill="url(#glow2)"/>
  <g stroke="${CREAM}" stroke-opacity="0.07" stroke-width="1">${grid.join("")}</g>
  <g transform="rotate(-8 ${w * 0.6} ${h * 0.5})">
    <rect x="${w * 0.42}" y="${h * 0.12}" width="${w * 0.5}" height="${h * 0.62}" rx="6" fill="url(#sheet)" stroke="${CREAM}" stroke-opacity="0.18"/>
  </g>
  <g transform="rotate(6 ${w * 0.35} ${h * 0.6})">
    <rect x="${w * 0.1}" y="${h * 0.38}" width="${w * 0.46}" height="${h * 0.5}" rx="6" fill="url(#sheet2)" stroke="${GOLD}" stroke-opacity="0.28"/>
  </g>
  <ellipse cx="${w * 0.74}" cy="${h * 0.32}" rx="${w * 0.18}" ry="${h * 0.16}" fill="${GOLD}" fill-opacity="0.18" filter="url(#blur)"/>
  <ellipse cx="${w * 0.22}" cy="${h * 0.8}" rx="${w * 0.2}" ry="${h * 0.12}" fill="${CREAM}" fill-opacity="0.12" filter="url(#blur)"/>
  <g fill="none" stroke-linejoin="round" stroke-linecap="round">
    <path d="${pulsePath(w, h * 0.56, h * 0.11, 30)}" stroke="${GOLD}" stroke-opacity="0.9" stroke-width="3"/>
    <path d="${pulsePath(w, h * 0.62, h * 0.06, 30)}" stroke="${CREAM}" stroke-opacity="0.35" stroke-width="1.5"/>
    <path d="${pulsePath(w, h * 0.5, h * 0.04, 30)}" stroke="${GOLD}" stroke-opacity="0.35" stroke-width="1"/>
  </g>
  <g stroke="${GOLD}" stroke-opacity="0.5" stroke-width="1.2" fill="none">
    <circle cx="${w * 0.78}" cy="${h * 0.3}" r="${h * 0.12}"/>
    <circle cx="${w * 0.78}" cy="${h * 0.3}" r="${h * 0.19}" stroke-opacity="0.22"/>
    <circle cx="${w * 0.78}" cy="${h * 0.3}" r="${h * 0.27}" stroke-opacity="0.1"/>
  </g>
  <g stroke="${CREAM}" stroke-opacity="0.35" stroke-width="1">
    <line x1="${w * 0.08}" y1="${h * 0.2}" x2="${w * 0.08}" y2="${h * 0.9}"/>
    <line x1="${w * 0.08}" y1="${h * 0.2}" x2="${w * 0.2}" y2="${h * 0.2}"/>
  </g>
  <rect width="${w}" height="${h}" filter="url(#grain)"/>
</svg>`;
}

async function buildArt() {
  const w = 2000;
  const h = 1600;
  const svg = Buffer.from(editorialSvg(w, h));
  await sharp(svg).webp({ quality: 80 }).toFile(out("public/generated/editorial-pulse.webp"));
  await sharp(svg).resize({ width: 1200 }).jpeg({ quality: 82, mozjpeg: true }).toFile(out("public/generated/editorial-pulse.jpg"));
}

await mkdir(out("public/generated"), { recursive: true });
await buildIcons();
await buildArt();
console.log("brand assets built");
