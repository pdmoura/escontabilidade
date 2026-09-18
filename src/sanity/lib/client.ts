import { createClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId } from "../env";

export const client = isSanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      // ISR handles caching, so the API is queried directly and never serves stale CDN copies.
      useCdn: false,
      perspective: "published",
    })
  : null;

/** Server-only client with write access, used by the content automation. */
export function getWriteClient() {
  const token = process.env.SANITY_API_WRITE_TOKEN;
  if (!isSanityConfigured || !token) return null;
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: "raw",
  });
}

export const REVALIDATE_SECONDS = 300;

/**
 * Fetch helper that never throws: content errors degrade to fallbacks so the
 * marketing site stays online even if the CMS is unreachable.
 */
export async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["sanity"] },
    });
  } catch (error) {
    console.error("[sanity] fetch failed", error instanceof Error ? error.message : error);
    return null;
  }
}
