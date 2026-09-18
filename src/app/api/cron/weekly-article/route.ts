import { timingSafeEqual } from "node:crypto";
import { createWeeklyDraft } from "@/lib/ai/create-draft";

export const dynamic = "force-dynamic";
export const maxDuration = 120;

function isAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization") ?? "";
  const expected = `Bearer ${secret}`;
  if (header.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(header), Buffer.from(expected));
}

/**
 * Triggered by Vercel Cron (see vercel.json). Requires
 * `Authorization: Bearer <CRON_SECRET>`; Vercel adds it automatically when the
 * CRON_SECRET environment variable exists.
 */
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return Response.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const result = await createWeeklyDraft();
    console.info("[cron] weekly-article", JSON.stringify(result));
    return Response.json(result, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    console.error("[cron] weekly-article failed:", message);
    return Response.json({ status: "error", message }, { status: 500 });
  }
}
