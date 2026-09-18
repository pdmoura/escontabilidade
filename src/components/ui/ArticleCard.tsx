import Image from "next/image";
import { TrackedLink } from "@/components/ui/TrackedLink";
import type { ArticleSummary } from "@/lib/content/types";
import { formatDate } from "@/lib/format";

export function ArticleCard({ article, location }: { article: ArticleSummary; location: string }) {
  const href = `/conteudos/${article.slug}`;
  return (
    <article className="group flex h-full flex-col">
      <TrackedLink
        href={href}
        event="article_click"
        payload={{ location, slug: article.slug }}
        className="relative block aspect-[16/10] overflow-hidden rounded-[2px] bg-cream-200"
        aria-label={article.title}
      >
        {article.coverImage?.src ? (
          <Image
            src={article.coverImage.src}
            alt={article.coverImage.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center bg-gradient-to-br from-cream-200 to-cream-300">
            <span className="font-serif text-6xl text-coffee-800/40">ES</span>
          </span>
        )}
      </TrackedLink>
      <div className="mt-5 flex items-center gap-3 text-[0.78rem] text-muted">
        <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        <span aria-hidden="true" className="h-px w-4 bg-line-strong" />
        <span>{article.readingTimeMinutes} min de leitura</span>
      </div>
      <h3 className="h3 mt-3 text-coffee-900">
        <TrackedLink
          href={href}
          event="article_click"
          payload={{ location, slug: article.slug }}
          className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gold-600"
        >
          {article.title}
        </TrackedLink>
      </h3>
      <p className="mt-3 line-clamp-3 text-[0.95rem] leading-relaxed text-muted">{article.excerpt}</p>
      {article.categories.length ? (
        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Categorias">
          {article.categories.map((c) => (
            <li key={c.slug} className="rounded-full border border-line px-3 py-1 text-[0.72rem] font-medium tracking-wide text-coffee-800 uppercase">
              {c.title}
            </li>
          ))}
        </ul>
      ) : null}
    </article>
  );
}
