import Link from "next/link";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Você está em" className="text-[0.8rem] text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-coffee-800">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="hover:text-coffee-900 hover:underline hover:underline-offset-4">
                  {item.name}
                </Link>
              )}
              {!last ? (
                <span aria-hidden="true" className="h-px w-3 bg-line-strong" />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
