import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { Professional } from "@/lib/content/types";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function About({ professional, whatsapp }: { professional: Professional; whatsapp: string }) {
  const portrait = professional.secondaryPortrait;
  return (
    <section id="sobre" className="bg-cream-50 py-20 md:py-28" aria-labelledby="about-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6 lg:pr-6">
          <Reveal>
            <p className="eyebrow">Sobre</p>
            <h2 id="about-title" className="h2 mt-5 text-coffee-900">
              Conheça {professional.name.split(" ")[0]}{" "}
              <span className="text-coffee-700">{professional.name.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="lede mt-6 max-w-[48ch]">{professional.shortBio}</p>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex max-w-[56ch] flex-col gap-5 text-[1.02rem] leading-relaxed text-coffee-800">
            {professional.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
          {professional.credentials?.length ? (
            <Reveal delay={0.15} className="mt-8">
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                {professional.credentials.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </Reveal>
          ) : null}
          <Reveal delay={0.2} className="mt-10">
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.about}
              location="about"
              number={whatsapp}
              className="btn btn-primary"
            >
              <WhatsAppIcon />
              Conversar diretamente com {professional.name.split(" ")[0]}
            </WhatsAppLink>
          </Reveal>
        </div>

        <Reveal as="figure" delay={0.1} className="relative lg:col-span-6">
          <div className="relative ml-auto aspect-[4/5] w-full max-w-[560px] overflow-hidden rounded-[2px] bg-cream-200 shadow-soft lg:aspect-[5/6]">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <figcaption className="mt-4 flex items-baseline justify-between gap-6 text-[0.82rem] text-muted lg:max-w-[560px] lg:ml-auto">
            <span>
              {professional.name}, {professional.title.toLowerCase()}
            </span>
            <span className="tabular">+{professional.experienceYears} anos</span>
          </figcaption>
        </Reveal>
      </div>
    </section>
  );
}
