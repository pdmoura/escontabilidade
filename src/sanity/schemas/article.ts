import { defineArrayMember, defineField, defineType } from "sanity";

export const articleCategory = defineType({
  name: "articleCategory",
  title: "Categoria de conteúdo",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title", maxLength: 64 }, validation: (r) => r.required() }),
    defineField({ name: "description", title: "Descrição", type: "text", rows: 2 }),
  ],
});

export const article = defineType({
  name: "article",
  title: "Artigo",
  type: "document",
  groups: [
    { name: "content", title: "Conteúdo", default: true },
    { name: "seo", title: "SEO" },
    { name: "workflow", title: "Origem e revisão" },
  ],
  fields: [
    defineField({ name: "title", title: "Título", type: "string", group: "content", validation: (r) => r.required().max(120) }),
    defineField({ name: "slug", title: "Slug", type: "slug", group: "content", options: { source: "title", maxLength: 96 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Resumo", type: "text", rows: 3, group: "content", validation: (r) => r.required().max(300) }),
    defineField({
      name: "coverImage",
      title: "Imagem de capa",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Parágrafo", value: "normal" },
            { title: "Título 2", value: "h2" },
            { title: "Título 3", value: "h3" },
            { title: "Citação", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Negrito", value: "strong" },
              { title: "Itálico", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [defineField({ name: "href", title: "URL", type: "url", validation: (r) => r.uri({ scheme: ["http", "https", "mailto"] }) })],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
        }),
      ],
    }),
    defineField({ name: "categories", title: "Categorias", type: "array", group: "content", of: [{ type: "reference", to: [{ type: "articleCategory" }] }] }),
    defineField({ name: "author", title: "Autor", type: "reference", group: "content", to: [{ type: "professional" }] }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "workflow",
      options: { list: [
        { title: "Rascunho", value: "draft" },
        { title: "Em revisão", value: "review" },
        { title: "Publicado", value: "published" },
        { title: "Arquivado", value: "archived" },
      ], layout: "radio" },
      initialValue: "draft",
      validation: (r) => r.required(),
    }),
    defineField({ name: "publishedAt", title: "Data de publicação", type: "datetime", group: "workflow" }),
    defineField({ name: "seoTitle", title: "Título para SEO", type: "string", group: "seo", validation: (r) => r.max(70) }),
    defineField({ name: "seoDescription", title: "Descrição para SEO", type: "text", rows: 3, group: "seo", validation: (r) => r.max(170) }),
    defineField({ name: "canonical", title: "URL canônica", type: "url", group: "seo", description: "Só preencha se o conteúdo foi publicado originalmente em outro endereço." }),
    defineField({ name: "origin", title: "Origem", type: "string", group: "workflow", options: { list: [{ title: "Manual", value: "manual" }, { title: "Automação", value: "ai" }] }, initialValue: "manual" }),
    defineField({ name: "generatedByAI", title: "Gerado por automação", type: "boolean", group: "workflow", initialValue: false, readOnly: true }),
    defineField({ name: "reviewedByHuman", title: "Revisado por pessoa", type: "boolean", group: "workflow", initialValue: false }),
    defineField({ name: "aiModel", title: "Modelo utilizado", type: "string", group: "workflow", readOnly: true }),
    defineField({ name: "generationId", title: "ID de geração", type: "string", group: "workflow", readOnly: true }),
    defineField({ name: "reviewWarnings", title: "Pontos para revisar", type: "array", group: "workflow", of: [{ type: "string" }], readOnly: true }),
    defineField({ name: "sources", title: "Fontes sugeridas", type: "array", group: "workflow", of: [{ type: "url" }] }),
  ],
  orderings: [{ title: "Mais recentes", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "status", media: "coverImage" },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: subtitle === "published" ? "Publicado" : subtitle === "review" ? "Em revisão" : subtitle === "archived" ? "Arquivado" : "Rascunho",
      media,
    }),
  },
});
