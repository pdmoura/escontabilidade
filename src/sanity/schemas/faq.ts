import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Pergunta frequente",
  type: "document",
  fields: [
    defineField({ name: "question", title: "Pergunta", type: "string", validation: (r) => r.required() }),
    defineField({ name: "answer", title: "Resposta", type: "text", rows: 5, validation: (r) => r.required() }),
    defineField({ name: "order", title: "Ordem", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Ordem", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "question" } },
});
