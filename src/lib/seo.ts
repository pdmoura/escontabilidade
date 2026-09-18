import type { ExtendedSettings } from "@/lib/content/get";
import type { Article, Professional } from "@/lib/content/types";
import { SITE_URL, site } from "@/lib/site";

type JsonLd = Record<string, unknown>;

export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Escapes characters that could break out of a <script> tag. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function personJsonLd(professional: Professional, settings: ExtendedSettings): JsonLd {
  const sameAs = settings.socials.map((s) => s.url);
  if (settings.googleProfileUrl) sameAs.push(settings.googleProfileUrl);
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#elenice-sousa`,
    name: professional.name,
    jobTitle: professional.title,
    description: professional.shortBio,
    image: absoluteUrl(professional.portrait.src),
    url: SITE_URL,
    worksFor: { "@id": `${SITE_URL}/#organization` },
    knowsAbout: [
      "Contabilidade para médicos",
      "Contabilidade para profissionais da saúde",
      "Contabilidade para clínicas",
      "Planejamento tributário para profissionais da saúde",
    ],
    sameAs,
  };
}

/**
 * Only properties that are actually known are emitted. Address, opening hours
 * and geo are added when the CMS has them; ratings and price ranges are never
 * fabricated.
 */
export function organizationJsonLd(settings: ExtendedSettings, professional: Professional): JsonLd {
  const sameAs = settings.socials.map((s) => s.url);
  if (settings.googleProfileUrl) sameAs.push(settings.googleProfileUrl);
  const data: JsonLd = {
    "@type": ["AccountingService", "Organization"],
    "@id": `${SITE_URL}/#organization`,
    name: settings.brandName,
    alternateName: `${settings.brandName} | ${professional.name}`,
    description: settings.seoDescription,
    url: SITE_URL,
    logo: absoluteUrl("/brand/es-monogram-512.png"),
    image: absoluteUrl("/og-image.jpg"),
    telephone: site.phoneE164,
    email: settings.email,
    founder: { "@id": `${SITE_URL}/#elenice-sousa` },
    sameAs,
    knowsLanguage: "pt-BR",
    areaServed: settings.serviceArea ? { "@type": "Country", name: "Brasil" } : undefined,
  };
  if (settings.streetAddress && settings.city && settings.state) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: settings.streetAddress,
      addressLocality: settings.city,
      addressRegion: settings.state,
      postalCode: settings.postalCode,
      addressCountry: "BR",
    };
  }
  if (settings.openingHours.length) {
    data.openingHoursSpecification = settings.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    }));
  }
  return stripUndefined(data);
}

export function websiteJsonLd(settings: ExtendedSettings): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: settings.brandName,
    url: SITE_URL,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLd {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: Array<{ question: string; answer: string }>): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function articleJsonLd(article: Article, professional: Professional): JsonLd {
  const url = absoluteUrl(`/conteudos/${article.slug}`);
  return stripUndefined({
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.excerpt,
    image: article.ogImage ? [article.ogImage] : [absoluteUrl("/og-image.jpg")],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    inLanguage: "pt-BR",
    mainEntityOfPage: url,
    author: { "@type": "Person", name: professional.name, url: SITE_URL },
    publisher: { "@id": `${SITE_URL}/#organization` },
  });
}

export function graph(...items: JsonLd[]): JsonLd {
  return { "@context": "https://schema.org", "@graph": items };
}

function stripUndefined(obj: JsonLd): JsonLd {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));
}
