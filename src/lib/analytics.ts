export type AnalyticsEvent =
  | "whatsapp_click"
  | "whatsapp_hero_click"
  | "whatsapp_service_click"
  | "whatsapp_sticky_click"
  | "email_click"
  | "google_profile_click"
  | "instagram_click"
  | "article_click"
  | "faq_open";

export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

export interface AnalyticsProvider {
  track(event: AnalyticsEvent, payload?: AnalyticsPayload): void;
}

type WindowWithAnalytics = Window & {
  dataLayer?: Array<Record<string, unknown>>;
  gtag?: (...args: unknown[]) => void;
  plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
  va?: (...args: unknown[]) => void;
};

const providers: AnalyticsProvider[] = [];

/** Register an external provider (e.g. GA4, Plausible). Optional. */
export function registerAnalyticsProvider(provider: AnalyticsProvider): () => void {
  providers.push(provider);
  return () => {
    const index = providers.indexOf(provider);
    if (index >= 0) providers.splice(index, 1);
  };
}

/**
 * Decoupled tracking entry point. Works without any provider: it forwards to
 * whatever is present on `window` (dataLayer, gtag, plausible, Vercel Analytics)
 * and to registered providers, and silently no-ops otherwise.
 */
export function track(event: AnalyticsEvent, payload: AnalyticsPayload = {}): void {
  if (typeof window === "undefined") return;
  const w = window as WindowWithAnalytics;
  const data = { ...payload, timestamp: Date.now() };

  try {
    for (const provider of providers) provider.track(event, data);
    w.dataLayer?.push({ event, ...data });
    w.gtag?.("event", event, data);
    w.plausible?.(event, { props: payload });
    w.va?.("event", { name: event, data: payload });
  } catch {
    // Tracking must never break the experience.
  }
}
