import { defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Serviço",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "shortDescription", title: "Descrição curta", type: "text", rows: 2, validation: (r) => r.max(200) }),
    defineField({ name: "description", title: "Descrição completa", type: "text", rows: 5 }),
    defineField({ name: "featured", title: "Destaque", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
    defineField({
      name: "whatsappMessage",
      title: "Mensagem pré-preenchida no WhatsApp",
      type: "text",
      rows: 2,
      description: "Opcional. Se vazio, uma mensagem padrão com o nome do serviço será usada.",
    }),
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "shortDescription" } },
});
