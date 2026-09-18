import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  brandName, phone, whatsapp, email, googleProfileUrl, defaultCta,
  heroEyebrow, heroHeadline, heroSubheadline, heroMicrocopy,
  city, state, streetAddress, postalCode, serviceArea, openingHours,
  "socials": socials[]{label, url},
  "seoTitle": seoDefaults.title,
  "seoDescription": seoDefaults.description,
  "ogImage": seoDefaults.ogImage
}`);

export const PROFESSIONAL_QUERY = defineQuery(`*[_type == "professional"][0]{
  name, title, shortBio, biography, experienceYears, specialties, credentials,
  portrait{..., asset}, secondaryPortrait{..., asset}
}`);

export const SERVICES_QUERY = defineQuery(`*[_type == "service"] | order(order asc, title asc){
  "id": _id, title, "slug": slug.current, shortDescription, description,
  featured, order, whatsappMessage
}`);

export const FAQS_QUERY = defineQuery(`*[_type == "faq"] | order(order asc){
  "id": _id, question, answer, order
}`);

export const TESTIMONIALS_QUERY = defineQuery(`*[_type == "testimonial" && approved == true] | order(order asc){
  "id": _id, name, profession, quote, approved, order
}`);

const ARTICLE_SUMMARY_PROJECTION = `
  "id": _id, title, "slug": slug.current, excerpt, publishedAt,
  coverImage{..., asset},
  "categories": categories[]->{title, "slug": slug.current},
  "authorName": coalesce(author->name, "Elenice Sousa"),
  "charCount": length(pt::text(body))
`;

export const ARTICLES_QUERY = defineQuery(`*[_type == "article" && status == "published" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc){
  ${ARTICLE_SUMMARY_PROJECTION}
}`);

export const RECENT_ARTICLES_QUERY = defineQuery(`*[_type == "article" && status == "published" && defined(slug.current) && publishedAt <= now()] | order(publishedAt desc)[0...3]{
  ${ARTICLE_SUMMARY_PROJECTION}
}`);

export const ARTICLE_BY_SLUG_QUERY = defineQuery(`*[_type == "article" && status == "published" && slug.current == $slug][0]{
  ${ARTICLE_SUMMARY_PROJECTION},
  body, "updatedAt": _updatedAt, seoTitle, seoDescription, canonical,
  generatedByAI, reviewedByHuman, origin
}`);

export const RELATED_ARTICLES_QUERY = defineQuery(`*[_type == "article" && status == "published" && slug.current != $slug && publishedAt <= now()] | order(publishedAt desc)[0...3]{
  ${ARTICLE_SUMMARY_PROJECTION}
}`);

export const ARTICLE_SLUGS_QUERY = defineQuery(`*[_type == "article" && status == "published" && defined(slug.current)]{
  "slug": slug.current, "updatedAt": _updatedAt
}`);

export const ARTICLE_BY_GENERATION_ID_QUERY = defineQuery(`*[_type == "article" && generationId == $generationId][0]{ _id, status }`);
