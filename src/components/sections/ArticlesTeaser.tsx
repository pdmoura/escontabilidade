import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArticleCard } from "@/components/ui/ArticleCard";
import type { ArticleSummary } from "@/lib/content/types";

/** Latest published articles. Hidden while the content hub is still empty. */
export function ArticlesTeaser({ articles }: { articles: ArticleSummary[] }) {
  if (!articles.length) return null;
  return (
    <section id="conteudos" className="container-x py-20 md:py-28" aria-labelledby="articles-title">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow">Conteúdos</p>
          <h2 id="articles-title" className="h2 mt-5 max-w-[16ch] text-coffee-900">
            Leituras para quem cuida do próprio negócio
          </h2>
        </div>
        <Link
          href="/conteudos"
          className="inline-flex items-center gap-2 text-[0.95rem] font-medium text-coffee-800 underline decoration-gold-600 underline-offset-4 hover:text-coffee-900"
        >
          Ver todos os conteúdos
        </Link>
      </Reveal>
      <Stagger className="mt-12" stagger={0.1}>
        <ul className="grid gap-10 md:grid-cols-3">
          {articles.map((article) => (
            <StaggerItem as="li" key={article.id}>
              <ArticleCard article={article} location="home" />
            </StaggerItem>
          ))}
        </ul>
      </Stagger>
    </section>
  );
}
