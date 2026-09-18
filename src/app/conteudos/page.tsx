import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { getArticles, getSettings } from "@/lib/content/get";
import { breadcrumbJsonLd, graph } from "@/lib/seo";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export const revalidate = 300;

const title = "Conteúdos sobre contabilidade para profissionais da saúde";
const description =
  "Artigos e orientações da ES Contabilidade para médicos, dentistas, clínicas e demais profissionais da saúde: organização, planejamento e rotina contábil.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/conteudos" },
  openGraph: { title, description, url: "/conteudos", type: "website" },
};

const crumbs = [
  { name: "Início", path: "/" },
  { name: "Conteúdos", path: "/conteudos" },
];

export default async function ArticlesPage() {
  const [articles, settings] = await Promise.all([getArticles(), getSettings()]);

  return (
    <PageShell>
      <JsonLd data={graph(breadcrumbJsonLd(crumbs))} />
      <section className="container-x pt-10 pb-16 md:pt-14 md:pb-24">
        <Breadcrumbs items={crumbs} />
        <Reveal className="mt-8 max-w-[60ch]">
          <p className="eyebrow">Conteúdos</p>
          <h1 className="display mt-5 text-coffee-900">Leituras para quem cuida do próprio negócio</h1>
          <p className="lede mt-6">
            Orientações claras sobre organização, planejamento e rotina contábil, escritas para a realidade de quem
            atende pacientes.
          </p>
        </Reveal>

        {articles.length ? (
          <Stagger className="mt-16" stagger={0.08}>
            <ul className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <StaggerItem as="li" key={article.id}>
                  <ArticleCard article={article} location="articles-index" />
                </StaggerItem>
              ))}
            </ul>
          </Stagger>
        ) : (
          <Reveal className="mt-16 max-w-[56ch] border-t border-line pt-10">
            <h2 className="h3 text-coffee-900">Os primeiros conteúdos estão em preparação.</h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-muted">
              Enquanto isso, a forma mais rápida de tirar uma dúvida sobre a sua contabilidade continua sendo uma
              conversa direta.
            </p>
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.article}
              location="articles-empty"
              number={settings.whatsapp}
              className="btn btn-primary mt-8"
            >
              <WhatsAppIcon />
              Tirar uma dúvida no WhatsApp
            </WhatsAppLink>
          </Reveal>
        )}
      </section>
    </PageShell>
  );
}
