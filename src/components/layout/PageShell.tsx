import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { FinalCta } from "@/components/sections/FinalCta";
import { getProfessional, getSettings } from "@/lib/content/get";

export async function PageShell({ children, withCta = true }: { children: ReactNode; withCta?: boolean }) {
  const [settings, professional] = await Promise.all([getSettings(), getProfessional()]);
  return (
    <>
      <Header whatsapp={settings.whatsapp} />
      <main id="conteudo" className="flex-1 pt-[var(--header-height)]">
        {children}
        {withCta ? <FinalCta settings={settings} portrait={professional.portrait} /> : null}
      </main>
      <Footer settings={settings} />
      <StickyWhatsApp whatsapp={settings.whatsapp} />
    </>
  );
}
