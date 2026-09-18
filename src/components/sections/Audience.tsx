import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

export function Audience({ audiences }: { audiences: string[] }) {
  return (
    <section id="para-quem" className="container-x py-20 md:py-28" aria-labelledby="audience-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal as="figure" className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-coffee-900 lg:col-span-5 lg:aspect-auto lg:min-h-[640px]">
          <Image
            src="/generated/editorial-pulse.webp"
            alt="Composição abstrata em creme, café e dourado com linhas em ritmo de pulso, representando organização e cuidado"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-coffee-900/85 to-transparent p-6 text-[0.8rem] leading-snug text-cream-50/80 md:p-8">
            Ritmo, precisão e cuidado: a mesma lógica que organiza uma agenda clínica organiza uma rotina contábil.
          </figcaption>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7 lg:flex lg:flex-col lg:justify-center">
          <Reveal>
            <p className="eyebrow">Para quem</p>
            <h2 id="audience-title" className="h2 mt-5 max-w-[14ch] text-coffee-900">
              Profissionais e estruturas que atendemos
            </h2>
            <p className="lede mt-6 max-w-[44ch]">
              Da atuação individual em consultório à clínica com equipe e sócios. O ponto em comum é uma rotina
              dedicada a cuidar de pessoas.
            </p>
          </Reveal>
          <Stagger className="mt-10" stagger={0.06}>
            <ul className="flex flex-col divide-y divide-line border-y border-line">
              {audiences.map((item) => (
                <StaggerItem as="li" key={item} className="group flex items-baseline justify-between gap-6 py-4 md:py-5">
                  <span className="font-serif text-[1.5rem] leading-none text-coffee-900 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 md:text-[2.2rem]">
                    {item}
                  </span>
                  <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold-600 transition-all duration-500 group-hover:w-16" />
                </StaggerItem>
              ))}
            </ul>
          </Stagger>
        </div>
      </div>
    </section>
  );
}
