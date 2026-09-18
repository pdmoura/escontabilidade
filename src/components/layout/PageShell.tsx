import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { getSettings } from "@/lib/content/get";

export async function PageShell({ children }: { children: ReactNode }) {
  const settings = await getSettings();
  return (
    <>
      <Header whatsapp={settings.whatsapp} />
      <main id="conteudo" className="flex-1 pt-[var(--header-height)]">
        {children}
      </main>
      <Footer settings={settings} />
      <StickyWhatsApp whatsapp={settings.whatsapp} />
    </>
  );
}
