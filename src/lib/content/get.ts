import { cache } from "react";
import type { PortableTextBlock } from "@portabletext/react";
import { readingTimeFromChars } from "@/lib/reading-time";
import { safeFetch } from "@/sanity/lib/client";
import { toImageSource, toSocialImageUrl } from "@/sanity/lib/image";
import {
  ARTICLE_BY_SLUG_QUERY,
  ARTICLE_SLUGS_QUERY,
  ARTICLES_QUERY,
  FAQS_QUERY,
  PROFESSIONAL_QUERY,
  RECENT_ARTICLES_QUERY,
  RELATED_ARTICLES_QUERY,
  SERVICES_QUERY,
  SITE_SETTINGS_QUERY,
  TESTIMONIALS_QUERY,
} from "@/sanity/lib/queries";
import {
  defaultFaqs,
  defaultProfessional,
  defaultServices,
  defaultSettings,
} from "./defaults";
import type {
  Article,
  ArticleSummary,
  ExtendedSettings,
  Faq,
  HomeContent,
  Professional,
  SanityImageRef,
  Service,
  SiteSettings,
  Testimonial,
} from "./types";

type RawSettings = Partial<Omit<SiteSettings, "seoTitle" | "seoDescription">> & {
  seoTitle?: string | null;
  seoDescription?: string | null;
  socials?: Array<{ label?: string; url?: string }> | null;
  streetAddress?: string | null;
  postalCode?: string | null;
  openingHours?: Array<{ days?: string[]; opens?: string; closes?: string }> | null;
};

type RawProfessional = {
  name?: string;
  title?: string;
  shortBio?: string;
  biography?: PortableTextBlock[];
  experienceYears?: number;
  specialties?: string[];
  credentials?: string[];
  portrait?: SanityImageRef;
  secondaryPortrait?: SanityImageRef;
};

type RawArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: SanityImageRef;
  categories?: Array<{ title: string; slug: string }> | null;
  authorName?: string;
  charCount?: number;
  body?: PortableTextBlock[];
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  generatedByAI?: boolean;
  reviewedByHuman?: boolean;
  origin?: "manual" | "ai";
};

function nonEmpty(value: string | null | undefined, fallback: string): string {
  return value && value.trim() ? value : fallback;
}

function blocksToParagraphs(blocks: PortableTextBlock[] | undefined): string[] {
  if (!blocks?.length) return [];
  return blocks
    .filter((b) => b._type === "block" && Array.isArray(b.children))
    .map((b) =>
      (b.children as Array<{ text?: string }>).map((c) => c.text ?? "").join("").trim(),
    )
    .filter(Boolean);
}

export type { ExtendedSettings };

export const getSettings = cache(async (): Promise<ExtendedSettings> => {
  const raw = await safeFetch<RawSettings>(SITE_SETTINGS_QUERY);
  const socials = (raw?.socials ?? [])
    .filter((s): s is { label: string; url: string } => Boolean(s?.label && s?.url));
  if (!socials.length && defaultSettings.instagramUrl) {
    socials.push({ label: "Instagram", url: defaultSettings.instagramUrl });
  }
  return {
    ...defaultSettings,
    brandName: nonEmpty(raw?.brandName, defaultSettings.brandName),
    phone: nonEmpty(raw?.phone, defaultSettings.phone),
    whatsapp: nonEmpty(raw?.whatsapp, defaultSettings.whatsapp).replace(/\D/g, ""),
    email: nonEmpty(raw?.email, defaultSettings.email),
    googleProfileUrl: nonEmpty(raw?.googleProfileUrl, defaultSettings.googleProfileUrl ?? ""),
    instagramUrl: socials.find((s) => /instagram/i.test(s.label))?.url ?? defaultSettings.instagramUrl,
    defaultCta: nonEmpty(raw?.defaultCta, defaultSettings.defaultCta),
    heroEyebrow: nonEmpty(raw?.heroEyebrow, defaultSettings.heroEyebrow),
    heroHeadline: nonEmpty(raw?.heroHeadline, defaultSettings.heroHeadline),
    heroSubheadline: nonEmpty(raw?.heroSubheadline, defaultSettings.heroSubheadline),
    heroMicrocopy: nonEmpty(raw?.heroMicrocopy, defaultSettings.heroMicrocopy),
    seoTitle: nonEmpty(raw?.seoTitle, defaultSettings.seoTitle),
    seoDescription: nonEmpty(raw?.seoDescription, defaultSettings.seoDescription),
    city: raw?.city ?? undefined,
    state: raw?.state ?? undefined,
    serviceArea: nonEmpty(raw?.serviceArea, defaultSettings.serviceArea ?? ""),
    streetAddress: raw?.streetAddress ?? undefined,
    postalCode: raw?.postalCode ?? undefined,
    socials,
    openingHours: (raw?.openingHours ?? [])
      .filter((h): h is { days: string[]; opens: string; closes: string } =>
        Boolean(h?.days?.length && h.opens && h.closes),
      ),
  };
});

export const getProfessional = cache(async (): Promise<Professional> => {
  const raw = await safeFetch<RawProfessional>(PROFESSIONAL_QUERY);
  const biography = blocksToParagraphs(raw?.biography);
  return {
    ...defaultProfessional,
    name: nonEmpty(raw?.name, defaultProfessional.name),
    title: nonEmpty(raw?.title, defaultProfessional.title),
    shortBio: nonEmpty(raw?.shortBio, defaultProfessional.shortBio),
    biography: biography.length ? biography : defaultProfessional.biography,
    experienceYears: raw?.experienceYears ?? defaultProfessional.experienceYears,
    specialties: raw?.specialties?.length ? raw.specialties : defaultProfessional.specialties,
    credentials: raw?.credentials?.filter(Boolean) ?? [],
    portrait: toImageSource(raw?.portrait, defaultProfessional.portrait, 1400),
    secondaryPortrait: toImageSource(raw?.secondaryPortrait, defaultProfessional.secondaryPortrait, 1400),
  };
});

export const getServices = cache(async (): Promise<Service[]> => {
  const raw = await safeFetch<Service[]>(SERVICES_QUERY);
  if (!raw?.length) return defaultServices;
  return raw
    .filter((s) => s.title && s.slug)
    .map((s, i) => ({ ...s, featured: Boolean(s.featured), order: s.order ?? i, shortDescription: s.shortDescription ?? "", description: s.description ?? "" }));
});

export const getFaqs = cache(async (): Promise<Faq[]> => {
  const raw = await safeFetch<Faq[]>(FAQS_QUERY);
  return raw?.length ? raw.filter((f) => f.question && f.answer) : defaultFaqs;
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const raw = await safeFetch<Testimonial[]>(TESTIMONIALS_QUERY);
  return raw?.filter((t) => t.approved && t.quote && t.name) ?? [];
});

function toSummary(raw: RawArticle): ArticleSummary {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    excerpt: raw.excerpt ?? "",
    coverImage: raw.coverImage?.asset?._ref
      ? toImageSource(raw.coverImage, { src: "", alt: raw.title, width: 1600, height: 900 }, 1600)
      : undefined,
    publishedAt: raw.publishedAt ?? new Date(0).toISOString(),
    categories: raw.categories?.filter((c) => c?.title && c?.slug) ?? [],
    authorName: raw.authorName ?? defaultProfessional.name,
    readingTimeMinutes: readingTimeFromChars(raw.charCount),
  };
}

export const getArticles = cache(async (): Promise<ArticleSummary[]> => {
  const raw = await safeFetch<RawArticle[]>(ARTICLES_QUERY);
  return raw?.filter((a) => a.title && a.slug).map(toSummary) ?? [];
});

export const getRecentArticles = cache(async (): Promise<ArticleSummary[]> => {
  const raw = await safeFetch<RawArticle[]>(RECENT_ARTICLES_QUERY);
  return raw?.filter((a) => a.title && a.slug).map(toSummary) ?? [];
});

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const raw = await safeFetch<RawArticle | null>(ARTICLE_BY_SLUG_QUERY, { slug });
  if (!raw?.title || !raw.slug) return null;
  return {
    ...toSummary(raw),
    body: raw.body ?? [],
    updatedAt: raw.updatedAt,
    seoTitle: raw.seoTitle,
    seoDescription: raw.seoDescription,
    canonical: raw.canonical,
    generatedByAI: Boolean(raw.generatedByAI),
    reviewedByHuman: Boolean(raw.reviewedByHuman),
    origin: raw.origin === "ai" ? "ai" : "manual",
    ogImage: toSocialImageUrl(raw.coverImage),
  };
});

export const getRelatedArticles = cache(async (slug: string): Promise<ArticleSummary[]> => {
  const raw = await safeFetch<RawArticle[]>(RELATED_ARTICLES_QUERY, { slug });
  return raw?.filter((a) => a.title && a.slug).map(toSummary) ?? [];
});

export const getArticleSlugs = cache(async (): Promise<Array<{ slug: string; updatedAt: string }>> => {
  const raw = await safeFetch<Array<{ slug: string; updatedAt: string }>>(ARTICLE_SLUGS_QUERY);
  return raw?.filter((a) => a.slug) ?? [];
});

export const getHomeContent = cache(async (): Promise<HomeContent> => {
  const [settings, professional, services, faqs, testimonials, articles] = await Promise.all([
    getSettings(),
    getProfessional(),
    getServices(),
    getFaqs(),
    getTestimonials(),
    getRecentArticles(),
  ]);
  return { settings, professional, services, faqs, testimonials, articles };
});
