import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { Reveal } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { PortableBody } from "@/components/ui/PortableBody";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { getArticleBySlug, getArticleSlugs, getProfessional, getRelatedArticles, getSettings } from "@/lib/content/get";
import { formatDate } from "@/lib/format";
import { articleJsonLd, breadcrumbJsonLd, graph } from "@/lib/seo";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export const revalidate = 300;
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return { title: "Conteúdo não encontrado", robots: { index: false } };
  const title = article.seoTitle?.trim() || article.title;
  const description = article.seoDescription?.trim() || article.excerpt;
  const path = `/conteudos/${article.slug}`;
  return {
    title,
    description,
    alternates: { canonical: article.canonical?.trim() || path },
    openGraph: {
      type: "article",
      url: path,
      title,
      description,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: [article.authorName],
      images: article.coverImage ? [{ url: article.coverImage.src, width: article.coverImage.width, height: article.coverImage.height, alt: article.coverImage.alt }] : undefined,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const [related, professional, settings] = await Promise.all([
    getRelatedArticles(slug),
    getProfessional(),
    getSettings(),
  ]);

  const crumbs = [
    { name: "Início", path: "/" },
    { name: "Conteúdos", path: "/conteudos" },
    { name: article.title, path: `/conteudos/${article.slug}` },
  ];

  return (
    <PageShell>
      <JsonLd data={graph(articleJsonLd(article, professional), breadcrumbJsonLd(crumbs))} />
      <article className="container-x pt-10 pb-16 md:pt-14 md:pb-24">
        <Breadcrumbs items={crumbs} />
        <header className="mt-8 grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-8">
            {article.categories.length ? (
              <ul className="flex flex-wrap gap-2" aria-label="Categorias">
                {article.categories.map((c) => (
                  <li key={c.slug} className="eyebrow">
                    {c.title}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="eyebrow">Conteúdo</p>
            )}
            <h1 className="h2 mt-5 max-w-[22ch] text-coffee-900">{article.title}</h1>
            <p className="lede mt-6 max-w-[60ch]">{article.excerpt}</p>
            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-[0.85rem] text-muted">
              <div className="flex gap-2">
                <dt>Por</dt>
                <dd className="text-coffee-800">{article.authorName}</dd>
              </div>
              <div className="flex gap-2">
                <dt>Publicado em</dt>
                <dd>
                  <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt>Leitura</dt>
                <dd>{article.readingTimeMinutes} min</dd>
              </div>
            </dl>
          </Reveal>
        </header>

        {article.coverImage?.src ? (
          <Reveal as="figure" className="relative mt-12 aspect-[16/9] overflow-hidden rounded-[2px] bg-cream-200">
            <Image
              src={article.coverImage.src}
              alt={article.coverImage.alt}
              fill
              priority
              sizes="(min-width: 1440px) 1320px, 100vw"
              className="object-cover"
            />
          </Reveal>
        ) : null}

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <PortableBody value={article.body} />
            {article.generatedByAI && !article.reviewedByHuman ? (
              <p className="mt-10 border-t border-line pt-6 text-[0.85rem] text-muted">
                Este conteúdo tem caráter informativo e não substitui a análise do seu caso específico.
              </p>
            ) : (
              <p className="mt-10 border-t border-line pt-6 text-[0.85rem] text-muted">
                Conteúdo informativo. Cada situação contábil e tributária deve ser analisada individualmente.
              </p>
            )}
          </div>
          <aside className="lg:col-span-4">
            <div className="border-t border-coffee-800/30 pt-6 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
              <p className="eyebrow">Ficou com dúvida?</p>
              <p className="h3 mt-4 text-coffee-900">Converse diretamente com {professional.name.split(" ")[0]}.</p>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                O conteúdo orienta, mas cada consultório e cada clínica têm a sua própria realidade.
              </p>
              <WhatsAppLink
                message={WHATSAPP_MESSAGES.article}
                location={`article:${article.slug}`}
                number={settings.whatsapp}
                className="btn btn-primary mt-6 w-full sm:w-auto"
              >
                <WhatsAppIcon />
                Tirar uma dúvida no WhatsApp
              </WhatsAppLink>
            </div>
          </aside>
        </div>
      </article>

      {related.length ? (
        <section className="border-t border-line bg-cream-50" aria-labelledby="related-title">
          <div className="container-x py-16 md:py-24">
            <Reveal>
              <p className="eyebrow">Continue lendo</p>
              <h2 id="related-title" className="h2 mt-4 text-coffee-900">
                Conteúdos relacionados
              </h2>
            </Reveal>
            <ul className="mt-12 grid gap-10 md:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <ArticleCard article={item} location={`article-related:${article.slug}`} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </PageShell>
  );
}
