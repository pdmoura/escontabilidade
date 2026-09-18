import { describe, expect, it } from "vitest";
import { buildWhatsAppUrl, serviceMessage, WHATSAPP_MESSAGES } from "@/lib/whatsapp";

describe("buildWhatsAppUrl", () => {
  it("uses the wa.me base with the normalized number", () => {
    expect(buildWhatsAppUrl("", "+55 (61) 99679-6542")).toBe("https://wa.me/5561996796542");
  });

  it("encodes the pre-filled message safely", () => {
    const url = buildWhatsAppUrl(WHATSAPP_MESSAGES.hero, "5561996796542");
    expect(url.startsWith("https://wa.me/5561996796542?text=")).toBe(true);
    const text = new URL(url).searchParams.get("text");
    expect(text).toBe(WHATSAPP_MESSAGES.hero);
    expect(url).not.toContain(" ");
    expect(url).toContain("%C3%A1"); // "á" from "Olá"
  });

  it("throws without a number", () => {
    expect(() => buildWhatsAppUrl("oi", "")).toThrow();
  });

  it("builds a service specific message", () => {
    expect(serviceMessage("Planejamento tributário")).toBe(
      "Olá, Elenice! Gostaria de saber mais sobre planejamento tributário para profissionais da saúde.",
    );
  });
});
