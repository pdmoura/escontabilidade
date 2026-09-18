import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Configurações do site",
  type: "document",
  groups: [
    { name: "brand", title: "Marca e contato", default: true },
    { name: "hero", title: "Hero" },
    { name: "seo", title: "SEO" },
    { name: "local", title: "Local" },
  ],
  fields: [
    defineField({ name: "brandName", title: "Nome da marca", type: "string", group: "brand", validation: (r) => r.required() }),
    defineField({ name: "logo", title: "Logotipo", type: "image", group: "brand", options: { hotspot: true } }),
    defineField({ name: "phone", title: "Telefone (exibição)", type: "string", group: "brand", description: "Ex.: +55 61 99679-6542" }),
    defineField({ name: "whatsapp", title: "WhatsApp (somente números, com DDI)", type: "string", group: "brand", description: "Ex.: 5561996796542", validation: (r) => r.regex(/^\d{10,15}$/, { name: "somente números" }) }),
    defineField({ name: "email", title: "E-mail", type: "string", group: "brand", validation: (r) => r.email() }),
    defineField({ name: "googleProfileUrl", title: "Perfil no Google (URL)", type: "url", group: "brand" }),
    defineField({
      name: "socials",
      title: "Redes sociais",
      type: "array",
      group: "brand",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Rede", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url" }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        },
      ],
    }),
    defineField({ name: "defaultCta", title: "Texto padrão do botão de WhatsApp", type: "string", group: "brand" }),
    defineField({ name: "heroEyebrow", title: "Eyebrow do hero", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", title: "Headline do hero", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroSubheadline", title: "Subheadline do hero", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "heroMicrocopy", title: "Microcopy abaixo do botão", type: "string", group: "hero" }),
    defineField({
      name: "seoDefaults",
      title: "SEO padrão",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", title: "Título (title tag)", type: "string", validation: (r) => r.max(70) }),
        defineField({ name: "description", title: "Descrição", type: "text", rows: 3, validation: (r) => r.max(170) }),
        defineField({ name: "ogImage", title: "Imagem para redes sociais", type: "image" }),
      ],
    }),
    defineField({ name: "city", title: "Cidade", type: "string", group: "local" }),
    defineField({ name: "state", title: "UF", type: "string", group: "local" }),
    defineField({ name: "streetAddress", title: "Endereço comercial (público)", type: "string", group: "local", description: "Só preencha se quiser publicar o endereço no site e no Google." }),
    defineField({ name: "postalCode", title: "CEP", type: "string", group: "local" }),
    defineField({ name: "serviceArea", title: "Região atendida", type: "string", group: "local" }),
    defineField({
      name: "openingHours",
      title: "Horário de atendimento",
      type: "array",
      group: "local",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "days", title: "Dias", type: "array", of: [{ type: "string" }], options: { list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] } }),
            defineField({ name: "opens", title: "Abre (HH:MM)", type: "string" }),
            defineField({ name: "closes", title: "Fecha (HH:MM)", type: "string" }),
          ],
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Configurações do site" }) },
});
