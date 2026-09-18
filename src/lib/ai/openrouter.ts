import { SITE_URL, site } from "@/lib/site";
import { generatedArticleJsonSchema } from "./schema";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const DEFAULT_MODEL = "openai/gpt-5-mini";
const DEFAULT_FALLBACK = "openai/gpt-5";

export class OpenRouterError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly retryable: boolean,
  ) {
    super(message);
    this.name = "OpenRouterError";
  }
}

export interface OpenRouterConfig {
  apiKey: string;
  model: string;
  fallbackModel?: string;
}

export function getOpenRouterConfig(): OpenRouterConfig | null {
  const apiKey = process.env.OPENROUTER_API_KEY?.trim();
  if (!apiKey) return null;
  return {
    apiKey,
    model: process.env.OPENROUTER_MODEL?.trim() || DEFAULT_MODEL,
    fallbackModel: process.env.OPENROUTER_FALLBACK_MODEL?.trim() || DEFAULT_FALLBACK,
  };
}

interface ChatResult {
  content: string;
  model: string;
}

type FetchLike = typeof fetch;

/**
 * Calls OpenRouter with structured output, model fallback, timeout and a
 * bounded retry for transient failures. Never logs the key or full payloads.
 */
export async function generateStructured(
  config: OpenRouterConfig,
  messages: Array<{ role: "system" | "user"; content: string }>,
  options: { timeoutMs?: number; maxAttempts?: number; fetchImpl?: FetchLike } = {},
): Promise<ChatResult> {
  const { timeoutMs = 90_000, maxAttempts = 2, fetchImpl = fetch } = options;
  const models = [config.model, config.fallbackModel].filter((m): m is string => Boolean(m));
  let lastError: unknown;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const response = await fetchImpl(ENDPOINT, {
        method: "POST",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${config.apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": SITE_URL,
          "X-OpenRouter-Title": site.name,
        },
        body: JSON.stringify({
          model: models[0],
          models,
          messages,
          temperature: 0.6,
          max_tokens: 4000,
          response_format: { type: "json_schema", json_schema: generatedArticleJsonSchema },
          provider: { require_parameters: true },
        }),
      });

      if (!response.ok) {
        const retryable = response.status === 408 || response.status === 429 || response.status >= 500;
        let message = `OpenRouter responded with ${response.status}`;
        try {
          const body = (await response.json()) as { error?: { message?: string } };
          if (body?.error?.message) message = `${message}: ${body.error.message}`;
        } catch {
          // ignore body parse failures
        }
        throw new OpenRouterError(message, response.status, retryable);
      }

      const data = (await response.json()) as {
        model?: string;
        choices?: Array<{ message?: { content?: string }; finish_reason?: string }>;
      };
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new OpenRouterError("OpenRouter returned an empty completion", 502, true);
      return { content, model: data.model ?? models[0] };
    } catch (error) {
      lastError = error;
      const retryable =
        error instanceof OpenRouterError ? error.retryable : (error as Error)?.name === "AbortError";
      if (!retryable || attempt === maxAttempts) break;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastError instanceof Error ? lastError : new Error("OpenRouter request failed");
}
