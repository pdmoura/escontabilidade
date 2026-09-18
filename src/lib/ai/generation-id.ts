/** ISO-8601 week number and week-based year for a given date (UTC). */
export function isoWeek(date: Date): { year: number; week: number } {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = Date.UTC(d.getUTCFullYear(), 0, 1);
  const week = Math.ceil(((d.getTime() - yearStart) / 86400000 + 1) / 7);
  return { year: d.getUTCFullYear(), week };
}

export function slugify(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96);
}

/**
 * Deterministic id for a weekly generation: the same week and topic always
 * produce the same id, so retries never create duplicate drafts.
 */
export function generationId(date: Date, topic: string): string {
  const { year, week } = isoWeek(date);
  return `${year}-w${String(week).padStart(2, "0")}-${slugify(topic)}`;
}
