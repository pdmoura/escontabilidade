import { Reveal } from "@/components/motion/Reveal";

const facts = [
  { value: "+15 anos", label: "de experiência contábil" },
  { value: "Saúde", label: "como foco de atuação" },
  { value: "Direto", label: "com a contadora, sem intermediários" },
];

export function Statement() {
  return (
    <section className="border-y border-line bg-cream-50" aria-label="Posicionamento">
      <div className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-8">
          <h2 className="h2 max-w-[22ch] text-coffee-900">
            Uma contabilidade que entende o ritmo de quem{" "}
            <em className="font-serif italic text-coffee-700">cuida de pessoas</em>.
          </h2>
          <p className="lede mt-6 max-w-[58ch]">
            Plantões, convênios, consultório e clínica raramente cabem em um modelo padrão. A ES Contabilidade
            organiza essa realidade com acompanhamento próximo, para que números, impostos e obrigações deixem de
            ocupar espaço na sua agenda.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="md:col-span-4 md:border-l md:border-line md:pl-10">
          <dl className="grid grid-cols-3 gap-6 md:grid-cols-1 md:gap-8">
            {facts.map((f) => (
              <div key={f.value}>
                <dt className="sr-only">{f.label}</dt>
                <dd className="font-serif text-2xl leading-none text-coffee-900 sm:text-3xl">{f.value}</dd>
                <dd className="mt-2 text-[0.82rem] leading-snug text-muted">{f.label}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
