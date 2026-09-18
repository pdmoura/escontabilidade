import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { pains } from "@/lib/content/defaults";

export function Pains() {
  return (
    <section id="problemas" className="container-x py-20 md:py-28" aria-labelledby="pains-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <Reveal>
              <p className="eyebrow">Você reconhece esta rotina?</p>
              <h2 id="pains-title" className="h2 mt-5 max-w-[16ch] text-coffee-900">
                O que costuma pesar na vida contábil de quem atende pacientes
              </h2>
              <p className="lede mt-6 max-w-[44ch]">
                Nada disso é falta de cuidado. É falta de tempo e de um acompanhamento que fale a sua língua.
              </p>
            </Reveal>
          </div>
        </div>
        <Stagger className="lg:col-span-6 lg:col-start-7" stagger={0.1}>
          <ol className="divide-y divide-line border-y border-line">
            {pains.map((pain, i) => (
              <StaggerItem as="li" key={pain.title} className="grid grid-cols-[3rem_1fr] gap-4 py-7 md:grid-cols-[4rem_1fr] md:py-8">
                <span className="font-serif text-2xl leading-none text-gold-700 tabular">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="h3 text-coffee-900">{pain.title}</h3>
                  <p className="mt-3 max-w-[48ch] text-[1rem] leading-relaxed text-muted">{pain.text}</p>
                </div>
              </StaggerItem>
            ))}
          </ol>
        </Stagger>
      </div>
    </section>
  );
}
