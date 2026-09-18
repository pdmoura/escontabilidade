import { getWriteClient } from "@/sanity/lib/client";
import { ARTICLE_BY_GENERATION_ID_QUERY } from "@/sanity/lib/queries";
import { buildUserPrompt, SYSTEM_PROMPT, topicForDate } from "./briefing";
import { generationId, slugify } from "./generation-id";
import { generateStructured, getOpenRouterConfig } from "./openrouter";
import { toPortableText } from "./portable";
import { sanitizeArticle } from "./sanitize";
import { generatedArticleSchema, normaliseBlocks } from "./schema";

export type WeeklyDraftResult =
  | { status: "skipped"; reason: string; generationId?: string }
  | { status: "exists"; generationId: string; documentId: string }
  | { status: "created"; generationId: string; documentId: string; model: string; warnings: number };

/**
 * Weekly job: generate one article as a DRAFT in Sanity. It never publishes.
 * Idempotent per (ISO week, topic) thanks to the deterministic generationId.
 */
export async function createWeeklyDraft(now = new Date()): Promise<WeeklyDraftResult> {
  const config = getOpenRouterConfig();
  if (!config) return { status: "skipped", reason: "OPENROUTER_API_KEY is not configured" };

  const writeClient = getWriteClient();
  if (!writeClient) return { status: "skipped", reason: "Sanity write access is not configured" };

  const brief = topicForDate(now);
  const id = generationId(now, brief.topic);

  const existing = await writeClient.fetch<{ _id: string } | null>(ARTICLE_BY_GENERATION_ID_QUERY, { generationId: id });
  if (existing?._id) return { status: "exists", generationId: id, documentId: existing._id };

  const { content, model } = await generateStructured(config, [
    { role: "system", content: SYSTEM_PROMPT },
    { role: "user", content: buildUserPrompt(brief, now) },
  ]);

  let parsed: unknown;
  try {
    parsed = JSON.parse(content);
  } catch {
    throw new Error(`Generation ${id}: model returned invalid JSON`);
  }
  const validation = generatedArticleSchema.safeParse(normaliseBlocks(parsed));
  if (!validation.success) {
    const issues = validation.error.issues.slice(0, 5).map((i) => `${i.path.join(".")}: ${i.message}`).join("; ");
    throw new Error(`Generation ${id}: output failed validation (${issues})`);
  }

  const article = sanitizeArticle(validation.data);
  const slug = slugify(article.slug || article.title);
  const documentId = `drafts.article-${id}`;

  await writeClient.createIfNotExists({
    _id: documentId,
    _type: "article",
    title: article.title,
    slug: { _type: "slug", current: slug },
    excerpt: article.excerpt,
    body: toPortableText(article.body),
    status: "draft",
    origin: "ai",
    generatedByAI: true,
    reviewedByHuman: false,
    aiModel: model,
    generationId: id,
    reviewWarnings: article.reviewWarnings,
    sources: article.sources,
    seoTitle: article.seoTitle,
    seoDescription: article.seoDescription,
  });

  return { status: "created", generationId: id, documentId, model, warnings: article.reviewWarnings.length };
}
