import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { differentials } from "@/lib/content/defaults";

export function Differentials() {
  return (
    <section className="border-y border-line bg-cream-50 py-20 md:py-28" aria-labelledby="diff-title">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">Por que a ES</p>
          <h2 id="diff-title" className="h2 mt-5 max-w-[12ch] text-coffee-900">
            O que muda quando a contabilidade conhece o seu setor
          </h2>
        </Reveal>
        <Stagger className="lg:col-span-8" stagger={0.1}>
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {differentials.map((item) => (
              <StaggerItem as="li" key={item.title} className="flex gap-5">
                <span aria-hidden="true" className="mt-3 h-px w-8 shrink-0 bg-gold-600" />
                <div>
                  <h3 className="h3 text-coffee-900">{item.title}</h3>
                  <p className="mt-3 max-w-[40ch] text-[0.98rem] leading-relaxed text-muted">{item.text}</p>
                </div>
              </StaggerItem>
            ))}
          </ul>
        </Stagger>
      </div>
    </section>
  );
}
