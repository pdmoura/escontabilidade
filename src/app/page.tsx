import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BackToTop } from "@/components/layout/BackToTop";
import { StickyWhatsApp } from "@/components/layout/StickyWhatsApp";
import { About } from "@/components/sections/About";
import { ArticlesTeaser } from "@/components/sections/ArticlesTeaser";
import { Audience } from "@/components/sections/Audience";
import { Differentials } from "@/components/sections/Differentials";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { Pains } from "@/components/sections/Pains";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Statement } from "@/components/sections/Statement";
import { Story } from "@/components/sections/Story";
import { Testimonials } from "@/components/sections/Testimonials";
import { JsonLd } from "@/components/ui/JsonLd";
import { audiences } from "@/lib/content/defaults";
import { getHomeContent, getSettings } from "@/lib/content/get";
import { OG_ALT } from "@/lib/og/render";
import { faqJsonLd, graph, organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/seo";

export const revalidate = 300;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();
  return {
    title: { absolute: settings.seoTitle },
    description: settings.seoDescription,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      url: "/",
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: OG_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.seoTitle,
      description: settings.seoDescription,
      images: [{ url: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: OG_ALT }],
    },
  };
}

export default async function HomePage() {
  const { settings, professional, services, faqs, testimonials, articles } = await getHomeContent();

  return (
    <>
      <JsonLd
        data={graph(
          organizationJsonLd(settings, professional),
          personJsonLd(professional, settings),
          websiteJsonLd(settings),
          faqJsonLd(faqs),
        )}
      />
      <Header whatsapp={settings.whatsapp} />
      <main id="conteudo" className="flex-1">
        <Hero settings={settings} portrait={professional.portrait} experienceYears={professional.experienceYears} />
        <Statement />
        <Pains />
        <Story />
        <Services services={services} whatsapp={settings.whatsapp} />
        <Audience audiences={professional.specialties.length >= 4 ? [...professional.specialties, "Demais profissionais da saúde"] : audiences} />
        <About professional={professional} whatsapp={settings.whatsapp} />
        <Process />
        <Differentials />
        <Testimonials testimonials={testimonials} />
        <ArticlesTeaser articles={articles} />
        <Faq faqs={faqs} whatsapp={settings.whatsapp} />
        <FinalCta settings={settings} portrait={professional.portrait} />
      </main>
      <Footer settings={settings} />
      <StickyWhatsApp whatsapp={settings.whatsapp} />
      <BackToTop />
    </>
  );
}
