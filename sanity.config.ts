"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemas";

const singletonTypes = new Set(["siteSettings", "professional"]);

export default defineConfig({
  name: "es-contabilidade",
  title: "ES Contabilidade",
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schemaTypes,
    templates: (templates) => templates.filter((t) => !singletonTypes.has(t.schemaType)),
  },
  document: {
    actions: (actions, context) =>
      singletonTypes.has(context.schemaType)
        ? actions.filter(({ action }) => action !== "duplicate" && action !== "delete" && action !== "unpublish")
        : actions,
  },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Conteúdo")
          .items([
            S.listItem().title("Configurações do site").id("siteSettings").child(
              S.document().schemaType("siteSettings").documentId("siteSettings"),
            ),
            S.listItem().title("Elenice Sousa").id("professional").child(
              S.document().schemaType("professional").documentId("professional"),
            ),
            S.divider(),
            S.documentTypeListItem("service").title("Serviços"),
            S.documentTypeListItem("faq").title("Perguntas frequentes"),
            S.documentTypeListItem("testimonial").title("Depoimentos"),
            S.divider(),
            S.documentTypeListItem("article").title("Artigos"),
            S.documentTypeListItem("articleCategory").title("Categorias"),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
