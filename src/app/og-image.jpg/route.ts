import sharp from "sharp";
import { renderOgImage } from "@/lib/og/render";

export const dynamic = "force-static";
export const revalidate = 86400;

/**
 * Social image as a light JPEG (well under 300 KB), which is what WhatsApp,
 * Telegram and LinkedIn need to show the large link preview.
 */
export async function GET() {
  const png = Buffer.from(await (await renderOgImage()).arrayBuffer());
  const jpeg = await sharp(png).jpeg({ quality: 78, mozjpeg: true, chromaSubsampling: "4:2:0" }).toBuffer();
  return new Response(new Uint8Array(jpeg), {
    headers: {
      "Content-Type": "image/jpeg",
      "Content-Length": String(jpeg.length),
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
