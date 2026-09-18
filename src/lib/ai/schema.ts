import { z } from "zod";

/**
 * Strict contract for generated articles. Anything that does not validate is
 * rejected before it reaches the CMS.
 */
export const generatedBlockSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("paragraph"), text: z.string().trim().min(20).max(1500) }),
  z.object({ type: z.literal("heading"), level: z.union([z.literal(2), z.literal(3)]), text: z.string().trim().min(3).max(140) }),
  z.object({ type: z.literal("list"), style: z.enum(["bullet", "number"]), items: z.array(z.string().trim().min(2).max(400)).min(2).max(10) }),
  z.object({ type: z.literal("quote"), text: z.string().trim().min(10).max(500) }),
]);

export const generatedArticleSchema = z.object({
  title: z.string().trim().min(20).max(110),
  slug: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "slug must be kebab-case")
    .min(5)
    .max(96),
  excerpt: z.string().trim().min(60).max(300),
  body: z.array(generatedBlockSchema).min(5).max(60),
  seoTitle: z.string().trim().min(20).max(70),
  seoDescription: z.string().trim().min(60).max(165),
  categories: z.array(z.string().trim().min(2).max(40)).max(4).default([]),
  suggestedKeywords: z.array(z.string().trim().min(2).max(60)).max(12).default([]),
  sources: z.array(z.string().url()).max(10).default([]),
  reviewWarnings: z.array(z.string().trim().min(3).max(300)).max(20).default([]),
});

export type GeneratedArticle = z.infer<typeof generatedArticleSchema>;
export type GeneratedBlock = z.infer<typeof generatedBlockSchema>;

/** JSON Schema handed to OpenRouter structured outputs. Mirrors the zod schema. */
export const generatedArticleJsonSchema = {
  name: "generated_article",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    required: ["title", "slug", "excerpt", "body", "seoTitle", "seoDescription", "categories", "suggestedKeywords", "sources", "reviewWarnings"],
    properties: {
      title: { type: "string" },
      slug: { type: "string" },
      excerpt: { type: "string" },
      body: {
        type: "array",
        items: {
          type: "object",
          additionalProperties: false,
          required: ["type", "text", "level", "style", "items"],
          properties: {
            type: { type: "string", enum: ["paragraph", "heading", "list", "quote"] },
            text: { type: "string" },
            level: { type: "integer", enum: [2, 3] },
            style: { type: "string", enum: ["bullet", "number"] },
            items: { type: "array", items: { type: "string" } },
          },
        },
      },
      seoTitle: { type: "string" },
      seoDescription: { type: "string" },
      categories: { type: "array", items: { type: "string" } },
      suggestedKeywords: { type: "array", items: { type: "string" } },
      sources: { type: "array", items: { type: "string" } },
      reviewWarnings: { type: "array", items: { type: "string" } },
    },
  },
} as const;

/**
 * Normalises the loose shape produced under strict JSON schema (where every
 * block carries every key) into the discriminated union before validation.
 */
export function normaliseBlocks(input: unknown): unknown {
  if (!input || typeof input !== "object") return input;
  const data = input as Record<string, unknown>;
  if (!Array.isArray(data.body)) return input;
  const body = data.body.map((raw) => {
    if (!raw || typeof raw !== "object") return raw;
    const block = raw as Record<string, unknown>;
    switch (block.type) {
      case "paragraph":
      case "quote":
        return { type: block.type, text: block.text };
      case "heading":
        return { type: "heading", level: block.level === 3 ? 3 : 2, text: block.text };
      case "list":
        return { type: "list", style: block.style === "number" ? "number" : "bullet", items: block.items };
      default:
        return raw;
    }
  });
  return { ...data, body };
}
