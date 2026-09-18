export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-03-01";

/** True only when a project is configured. The site works without it. */
export const isSanityConfigured = /^[a-z0-9-]{4,}$/.test(projectId);
