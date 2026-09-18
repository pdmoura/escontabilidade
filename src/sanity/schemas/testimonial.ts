import { defineField, defineType } from "sanity";

export const testimonial = defineType({
  name: "testimonial",
  title: "Depoimento",
  type: "document",
  description: "Publique apenas depoimentos reais e autorizados pelo cliente.",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "profession", title: "Profissão", type: "string" }),
    defineField({ name: "quote", title: "Depoimento", type: "text", rows: 4, validation: (r) => r.required().max(400) }),
    defineField({
      name: "approved",
      title: "Aprovado para publicação",
      type: "boolean",
      initialValue: false,
      description: "Só aparece no site quando marcado.",
    }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "profession" } },
});
