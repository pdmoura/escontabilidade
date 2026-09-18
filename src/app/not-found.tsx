import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="container-x flex min-h-[60svh] flex-col justify-center py-20">
        <p className="eyebrow">Página não encontrada</p>
        <h1 className="h2 mt-5 max-w-[18ch] text-coffee-900">Este endereço não existe ou foi movido.</h1>
        <p className="lede mt-6 max-w-[48ch]">
          Volte para a página inicial ou explore os conteúdos publicados pela ES Contabilidade.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Ir para a página inicial
          </Link>
          <Link href="/conteudos" className="btn btn-outline">
            Ver conteúdos
          </Link>
        </div>
      </section>
    </PageShell>
  );
}
