/**
 * Builds an NDJSON seed for the Sanity dataset from the editorial defaults, so
 * the Studio opens pre-populated. Import with:
 *   npm run seed:build && npx sanity dataset import seed/seed.ndjson production --replace
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const defaultsUrl = pathToFileURL(path.join(root, ".seed-cache/defaults.mjs")).href;
const { defaultSettings, defaultProfessional, defaultServices, defaultFaqs } = await import(defaultsUrl);

const key = (i) => `k${i.toString(36).padStart(6, "0")}`;
let counter = 0;
const block = (text) => ({
  _type: "block",
  _key: key(++counter),
  style: "normal",
  markDefs: [],
  children: [{ _type: "span", _key: key(++counter), text, marks: [] }],
});

const image = (relativePath) => ({ _type: "image", _sanityAsset: `image@file://${path.join(root, relativePath).replace(/\\/g, "/")}` });

const docs = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    brandName: defaultSettings.brandName,
    phone: defaultSettings.phone,
    whatsapp: defaultSettings.whatsapp,
    email: defaultSettings.email,
    googleProfileUrl: defaultSettings.googleProfileUrl,
    socials: [{ _key: key(++counter), label: "Instagram", url: defaultSettings.instagramUrl }],
    defaultCta: defaultSettings.defaultCta,
    heroEyebrow: defaultSettings.heroEyebrow,
    heroHeadline: defaultSettings.heroHeadline,
    heroSubheadline: defaultSettings.heroSubheadline,
    heroMicrocopy: defaultSettings.heroMicrocopy,
    serviceArea: defaultSettings.serviceArea,
    seoDefaults: { title: defaultSettings.seoTitle, description: defaultSettings.seoDescription },
    logo: image("public/brand/logo-lockup.png"),
  },
  {
    _id: "professional",
    _type: "professional",
    name: defaultProfessional.name,
    title: defaultProfessional.title,
    shortBio: defaultProfessional.shortBio,
    biography: defaultProfessional.biography.map(block),
    experienceYears: defaultProfessional.experienceYears,
    specialties: defaultProfessional.specialties,
    portrait: { ...image("assets/originals/elenice-sentada.png"), alt: defaultProfessional.portrait.alt },
    secondaryPortrait: { ...image("assets/originals/elenice-mesa.png"), alt: defaultProfessional.secondaryPortrait.alt },
  },
  ...defaultServices.map((s) => ({
    _id: `service-${s.id}`,
    _type: "service",
    title: s.title,
    slug: { _type: "slug", current: s.slug },
    shortDescription: s.shortDescription,
    description: s.description,
    featured: s.featured,
    order: s.order,
  })),
  ...defaultFaqs.map((f) => ({
    _id: f.id,
    _type: "faq",
    question: f.question,
    answer: f.answer,
    order: f.order,
  })),
  ...["Abertura de empresa", "Organização financeira", "Rotina contábil", "Planejamento tributário", "Clínicas", "Pró-labore e folha"].map((title) => ({
    _id: `category-${title.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    _type: "articleCategory",
    title,
    slug: { _type: "slug", current: title.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-") },
  })),
];

await mkdir(path.join(root, "seed"), { recursive: true });
await writeFile(path.join(root, "seed/seed.ndjson"), docs.map((d) => JSON.stringify(d)).join("\n") + "\n");
console.log(`seed written: ${docs.length} documents`);
