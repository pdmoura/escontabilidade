export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://escontabilidade.vercel.app"
).replace(/\/$/, "");

export const WHATSAPP_NUMBER = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5561996796542"
).replace(/\D/g, "");

export const site = {
  name: "ES Contabilidade",
  legalName: "ES Contabilidade",
  owner: "Elenice Sousa",
  ownerTitle: "Contadora especializada em profissionais da saúde",
  tagline: "Contabilidade especializada em profissionais da saúde",
  description:
    "Contabilidade especializada para médicos, dentistas, clínicas e demais profissionais da saúde. Elenice Sousa, contadora com mais de 15 anos de experiência, atende de forma direta e personalizada.",
  locale: "pt_BR",
  email: "escontabilidade22@gmail.com",
  phoneDisplay: "+55 61 99679-6542",
  phoneE164: "+5561996796542",
  googleProfileUrl: "https://share.google/MpBh9a3sx4OSzm13O",
  instagramUrl: "https://www.instagram.com/contabilidadees/",
  instagramHandle: "@contabilidadees",
} as const;

export const nav = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/#faq", label: "FAQ" },
] as const;
