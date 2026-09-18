import { describe, expect, it } from "vitest";
import { defaultProfessional, defaultSettings } from "@/lib/content/defaults";
import type { ExtendedSettings } from "@/lib/content/get";
import { breadcrumbJsonLd, graph, organizationJsonLd, personJsonLd, serializeJsonLd, websiteJsonLd } from "@/lib/seo";

const settings: ExtendedSettings = {
  ...defaultSettings,
  socials: [{ label: "Instagram", url: "https://www.instagram.com/contabilidadees/" }],
  openingHours: [],
};

describe("structured data", () => {
  it("never fabricates address, ratings or price range", () => {
    const org = organizationJsonLd(settings, defaultProfessional);
    expect(org).not.toHaveProperty("address");
    expect(org).not.toHaveProperty("aggregateRating");
    expect(org).not.toHaveProperty("priceRange");
    expect(org).not.toHaveProperty("openingHoursSpecification");
    expect(org.telephone).toBe("+5561996796542");
  });

  it("adds address only when the CMS provides a full one", () => {
    const org = organizationJsonLd(
      { ...settings, streetAddress: "Rua Exemplo, 10", city: "Brasília", state: "DF", postalCode: "70000-000" },
      defaultProfessional,
    );
    expect(org.address).toMatchObject({ "@type": "PostalAddress", addressLocality: "Brasília", addressCountry: "BR" });
  });

  it("links person, organization and website in one graph", () => {
    const data = graph(organizationJsonLd(settings, defaultProfessional), personJsonLd(defaultProfessional, settings), websiteJsonLd(settings));
    const json = JSON.parse(serializeJsonLd(data));
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@graph"]).toHaveLength(3);
    expect(json["@graph"][1].worksFor["@id"]).toBe(json["@graph"][0]["@id"]);
  });

  it("escapes script breaking characters", () => {
    const out = serializeJsonLd({ "@type": "Thing", name: "</script><script>alert(1)</script>" });
    expect(out).not.toContain("</script>");
    expect(out).toContain("\\u003c/script>");
  });

  it("builds breadcrumb positions with absolute urls", () => {
    const crumbs = breadcrumbJsonLd([
      { name: "Início", path: "/" },
      { name: "Conteúdos", path: "/conteudos" },
    ]);
    const items = crumbs.itemListElement as Array<{ position: number; item: string }>;
    expect(items[0].position).toBe(1);
    expect(items[1].item).toMatch(/^https?:\/\/.+\/conteudos$/);
  });
});
