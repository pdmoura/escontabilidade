import { WHATSAPP_NUMBER } from "./site";

export const WHATSAPP_MESSAGES = {
  hero: "Olá, Elenice! Encontrei seu site e gostaria de saber mais sobre a contabilidade especializada para profissionais da saúde.",
  final: "Olá, Elenice! Gostaria de conversar sobre minha contabilidade.",
  about: "Olá, Elenice! Gostaria de conversar diretamente com você sobre minha contabilidade.",
  article: "Olá, Elenice! Li um conteúdo no seu site e gostaria de tirar uma dúvida.",
  sticky: "Olá, Elenice! Gostaria de tirar uma dúvida sobre contabilidade para profissionais da saúde.",
  clinic: "Olá, Elenice! Gostaria de falar sobre a contabilidade da minha clínica.",
} as const;

export function serviceMessage(serviceTitle: string): string {
  return `Olá, Elenice! Gostaria de saber mais sobre ${serviceTitle.trim().toLowerCase()} para profissionais da saúde.`;
}

/**
 * Builds a wa.me deep link. The message is only pre-filled: WhatsApp never
 * sends it automatically, the visitor still has to press send.
 */
export function buildWhatsAppUrl(
  message: string,
  number: string = WHATSAPP_NUMBER,
): string {
  const digits = number.replace(/\D/g, "");
  if (!digits) throw new Error("WhatsApp number is required");
  const text = message.trim();
  return text
    ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${digits}`;
}
