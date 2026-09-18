import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} | ${site.owner}`,
    short_name: site.name,
    description: site.description,
    lang: "pt-BR",
    start_url: "/",
    display: "browser",
    background_color: "#f2ebd8",
    theme_color: "#f2ebd8",
    icons: [
      { src: "/brand/favicon-48.png", sizes: "48x48", type: "image/png" },
      { src: "/brand/es-monogram-512.png", sizes: "512x512", type: "image/png" },
      { src: "/brand/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
