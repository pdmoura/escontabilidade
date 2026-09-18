import { defineField, defineType } from "sanity";

export const professional = defineType({
  name: "professional",
  title: "Profissional",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nome", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Título profissional", type: "string" }),
    defineField({ name: "shortBio", title: "Bio curta", type: "text", rows: 3 }),
    defineField({ name: "biography", title: "Biografia", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "experienceYears", title: "Anos de experiência", type: "number", validation: (r) => r.min(0).max(80) }),
    defineField({
      name: "portrait",
      title: "Foto principal",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
    }),
    defineField({
      name: "secondaryPortrait",
      title: "Foto secundária",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Texto alternativo", type: "string" })],
    }),
    defineField({ name: "specialties", title: "Especialidades atendidas", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "credentials",
      title: "Registros e credenciais",
      type: "array",
      of: [{ type: "string" }],
      description: "Ex.: CRC. Só publique informações verificadas.",
    }),
  ],
  preview: { select: { title: "name", subtitle: "title", media: "portrait" } },
});
