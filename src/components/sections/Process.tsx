import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { processSteps } from "@/lib/content/defaults";

export function Process() {
  return (
    <section id="como-funciona" className="container-x py-20 md:py-28" aria-labelledby="process-title">
      <Reveal className="max-w-[60ch]">
        <p className="eyebrow">Como funciona</p>
        <h2 id="process-title" className="h2 mt-5 text-coffee-900">
          Do primeiro contato ao acompanhamento contínuo
        </h2>
      </Reveal>
      <Stagger className="mt-14" stagger={0.12}>
        <ol className="grid gap-x-8 gap-y-12 md:grid-cols-2 xl:grid-cols-4">
          {processSteps.map((step, i) => (
            <StaggerItem as="li" key={step.title} className="relative border-t border-coffee-800/30 pt-6">
              <span
                aria-hidden="true"
                className="absolute top-[-1px] left-0 h-px bg-gold-500"
                style={{ width: `${((i + 1) / processSteps.length) * 100}%` }}
              />
              <span className="font-serif text-[0.95rem] tracking-[0.08em] text-gold-700 tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="h3 mt-4 text-coffee-900">{step.title}</h3>
              <p className="mt-3 max-w-[36ch] text-[0.98rem] leading-relaxed text-muted">{step.text}</p>
            </StaggerItem>
          ))}
        </ol>
      </Stagger>
    </section>
  );
}
