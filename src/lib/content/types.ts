import type { PortableTextBlock } from "@portabletext/react";

export interface SanityImageRef {
  _type: "image";
  asset?: { _ref?: string; _type?: "reference"; url?: string };
  alt?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
}

export interface ImageSource {
  /** Public path or resolved CDN URL. */
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SiteSettings {
  brandName: string;
  phone: string;
  whatsapp: string;
  email: string;
  googleProfileUrl?: string;
  instagramUrl?: string;
  seoTitle: string;
  seoDescription: string;
  defaultCta: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroMicrocopy: string;
  city?: string;
  state?: string;
  serviceArea?: string;
}

export interface Professional {
  name: string;
  title: string;
  shortBio: string;
  biography: string[];
  experienceYears: number;
  specialties: string[];
  portrait: ImageSource;
  secondaryPortrait: ImageSource;
  credentials?: string[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  featured: boolean;
  order: number;
  whatsappMessage?: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
  order: number;
}

export interface Testimonial {
  id: string;
  name: string;
  profession: string;
  quote: string;
  approved: boolean;
  order: number;
}

export interface ArticleCategory {
  title: string;
  slug: string;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: ImageSource;
  publishedAt: string;
  categories: ArticleCategory[];
  authorName: string;
  readingTimeMinutes: number;
}

export interface Article extends ArticleSummary {
  body: PortableTextBlock[];
  updatedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  canonical?: string;
  generatedByAI: boolean;
  reviewedByHuman: boolean;
  origin: "manual" | "ai";
  /** 1200x630 JPEG for link previews, when a cover exists. */
  ogImage?: string;
}

export interface ExtendedSettings extends SiteSettings {
  socials: Array<{ label: string; url: string }>;
  streetAddress?: string;
  postalCode?: string;
  openingHours: Array<{ days: string[]; opens: string; closes: string }>;
}

export interface HomeContent {
  settings: ExtendedSettings;
  professional: Professional;
  services: Service[];
  faqs: Faq[];
  testimonials: Testimonial[];
  articles: ArticleSummary[];
}
