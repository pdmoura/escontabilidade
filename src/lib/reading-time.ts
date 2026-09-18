const WORDS_PER_MINUTE = 200;
/** Average Portuguese word length including the following space. */
const CHARS_PER_WORD = 5.8;

export function readingTimeFromChars(charCount: number | null | undefined): number {
  if (!charCount || charCount <= 0) return 1;
  return readingTimeFromWords(Math.round(charCount / CHARS_PER_WORD));
}

export function readingTimeFromWords(wordCount: number | null | undefined): number {
  if (!wordCount || wordCount <= 0) return 1;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function readingTimeFromText(text: string): number {
  return readingTimeFromWords(countWords(text));
}
