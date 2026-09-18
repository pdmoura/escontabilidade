import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { countWords, readingTimeFromChars, readingTimeFromText, readingTimeFromWords } from "@/lib/reading-time";
import { formatDate } from "@/lib/format";
import { dimensionsFromRef } from "@/sanity/lib/image";

describe("reading time", () => {
  it("rounds up and never returns zero", () => {
    expect(readingTimeFromWords(0)).toBe(1);
    expect(readingTimeFromWords(199)).toBe(1);
    expect(readingTimeFromWords(201)).toBe(2);
    expect(countWords("  um   dois três  ")).toBe(3);
    expect(readingTimeFromText("palavra ".repeat(450))).toBe(3);
    expect(readingTimeFromChars(0)).toBe(1);
    expect(readingTimeFromChars(3200)).toBe(3);
  });
});

describe("formatting", () => {
  it("formats dates in pt-BR", () => {
    expect(formatDate("2026-09-17T12:00:00Z")).toBe("17 de setembro de 2026");
    expect(formatDate("not-a-date")).toBe("");
  });
});

describe("sanity image refs", () => {
  it("reads dimensions from an asset reference", () => {
    expect(dimensionsFromRef("image-abc123-1600x900-jpg")).toEqual({ width: 1600, height: 900 });
    expect(dimensionsFromRef("image-broken")).toBeNull();
  });
});

describe("cron endpoint", () => {
  const original = process.env.CRON_SECRET;
  beforeEach(() => {
    process.env.CRON_SECRET = "top-secret";
  });
  afterEach(() => {
    process.env.CRON_SECRET = original;
    vi.resetModules();
  });

  it("rejects requests without the bearer secret", async () => {
    const { GET } = await import("@/app/api/cron/weekly-article/route");
    const res = await GET(new Request("http://localhost/api/cron/weekly-article"));
    expect(res.status).toBe(401);
    const wrong = await GET(new Request("http://localhost/api/cron/weekly-article", { headers: { authorization: "Bearer nope" } }));
    expect(wrong.status).toBe(401);
  });

  it("skips gracefully when providers are not configured", async () => {
    delete process.env.OPENROUTER_API_KEY;
    const { GET } = await import("@/app/api/cron/weekly-article/route");
    const res = await GET(new Request("http://localhost/api/cron/weekly-article", { headers: { authorization: "Bearer top-secret" } }));
    expect(res.status).toBe(200);
    const body = (await res.json()) as { status: string };
    expect(body.status).toBe("skipped");
  });
});

describe("story line progress", async () => {
  const { lineProgress } = await import("@/components/sections/Story");
  it("shows exactly one line at a time and never re-shows an earlier line", () => {
    for (const p of [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1]) {
      const visible = [0, 1, 2, 3, 4].filter((i) => lineProgress(p, i, 5).opacity > 0.5);
      expect(visible.length).toBe(1);
    }
    expect(lineProgress(0, 0, 5).opacity).toBe(1);
    expect(lineProgress(0.5, 0, 5).opacity).toBe(0);
    expect(lineProgress(1, 4, 5).opacity).toBe(1);
  });
});
