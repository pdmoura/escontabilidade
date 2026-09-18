import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { ExtendedSettings } from "@/lib/content/get";
import type { ImageSource } from "@/lib/content/types";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function FinalCta({ settings, portrait }: { settings: ExtendedSettings; portrait: ImageSource }) {
  return (
    <section id="contato" className="relative overflow-hidden bg-coffee-900 text-cream-50" aria-labelledby="cta-title">
      <div className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-0">
        <div className="md:col-span-7 md:py-28 lg:col-span-6">
          <Reveal>
            <p className="eyebrow text-gold-400">Próximo passo</p>
            <h2 id="cta-title" className="h2 mt-5 max-w-[16ch] text-cream-50">
              Você cuida da saúde deles.{" "}
              <span className="text-gold-400">A ES cuida da saúde contábil do seu negócio.</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[1.05rem] leading-relaxed text-cream-50/75">
              Uma conversa inicial pelo WhatsApp é suficiente para entender a sua realidade e mostrar como o
              acompanhamento funciona. Sem compromisso.
            </p>
          </Reveal>
          <Reveal delay={0.15} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.final}
              location="final-cta"
              number={settings.whatsapp}
              className="btn btn-gold"
            >
              <WhatsAppIcon />
              Conversar pelo WhatsApp
            </WhatsAppLink>
            <TrackedLink
              href={`mailto:${settings.email}`}
              event="email_click"
              payload={{ location: "final-cta" }}
              className="btn btn-ghost-light"
            >
              Enviar um e-mail
            </TrackedLink>
          </Reveal>
          <Reveal delay={0.25} className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-sm text-cream-50/60">
            <span>{settings.phone}</span>
            <span>{settings.email}</span>
          </Reveal>
        </div>
        <Reveal as="figure" delay={0.1} className="relative md:col-span-5 md:col-start-8 lg:col-span-5 lg:col-start-8">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] md:absolute md:inset-y-0 md:right-0 md:aspect-auto md:w-[calc(100%+var(--gutter))]">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover object-top"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-coffee-900/60 via-transparent to-transparent md:from-coffee-900" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
