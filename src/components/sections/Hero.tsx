"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion, useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { ImageSource, SiteSettings } from "@/lib/content/types";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

type Props = {
  settings: SiteSettings;
  portrait: ImageSource;
  experienceYears: number;
};

export function Hero({ settings, portrait, experienceYears }: Props) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -40]);
  const textY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], reduced ? [1, 1] : [1, 0.35]);

  const words = settings.heroHeadline.split(" ");

  return (
    <section
      ref={ref}
      id="inicio"
      className="relative overflow-hidden pt-[calc(var(--header-height)+1.5rem)] md:pt-[calc(var(--header-height)+1rem)]"
      aria-labelledby="hero-title"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] bg-cream-200/50 lg:block"
      />
      <div className="container-x relative grid items-center gap-12 pb-20 lg:min-h-[calc(100svh-var(--header-height))] lg:grid-cols-12 lg:gap-8 lg:pb-16">
        <m.div style={{ y: textY, opacity: textOpacity }} className="lg:col-span-7 lg:pr-8 xl:col-span-6">
          <p className="eyebrow anim-rise">{settings.heroEyebrow}</p>

          <h1 id="hero-title" className="display mt-6 max-w-[16ch] text-coffee-900">
            {words.map((word, i) => (
              <span key={`${word}-${i}`}>
                {i > 0 ? " " : null}
                <span className="inline-block align-top">
                  <span
                    className="anim-word inline-block"
                    style={{ animationDelay: `${0.05 + i * 0.035}s` }}
                  >
                    {word}
                  </span>
                </span>
              </span>
            ))}
          </h1>

          <p className="lede anim-rise mt-7 max-w-[52ch]" style={{ animationDelay: "0.5s" }}>
            {settings.heroSubheadline}
          </p>

          <div
            className="anim-rise mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
            style={{ animationDelay: "0.65s" }}
          >
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.hero}
              event="whatsapp_hero_click"
              location="hero"
              number={settings.whatsapp}
              className="btn btn-primary"
            >
              <WhatsAppIcon />
              {settings.defaultCta}
            </WhatsAppLink>
            <Link href="#servicos" className="btn btn-outline">
              Conhecer a consultoria
            </Link>
          </div>
          <p className="anim-fade mt-4 text-sm text-muted" style={{ animationDelay: "0.9s" }}>
            {settings.heroMicrocopy}
          </p>
        </m.div>

        <div className="lg:col-span-5 xl:col-span-6">
          <div className="relative mx-auto mt-4 w-full max-w-[420px] sm:max-w-[480px] lg:mt-0 lg:ml-auto lg:max-w-[520px] xl:max-w-[560px]">
            <m.div
              aria-hidden="true"
              style={{ y: frameY }}
              className="anim-fade absolute -top-4 -right-4 bottom-6 left-8 rounded-[2px] border border-gold-500/70 [animation-delay:0.45s] lg:-right-6 lg:-top-6 lg:left-12"
            />
            <m.figure
              style={{ y: imageY }}
              className="anim-fade relative aspect-[4/5] overflow-hidden rounded-[2px] bg-cream-200 shadow-soft lg:aspect-[3/4]"
            >
              <Image
                src={portrait.src}
                alt={portrait.alt}
                fill
                priority
                fetchPriority="high"
                sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 640px) 480px, 90vw"
                className="object-cover object-top"
              />
            </m.figure>
            <div
              className="anim-rise absolute -bottom-5 left-0 flex items-baseline gap-2 bg-cream-100 px-4 py-3 shadow-lift sm:-left-6"
              style={{ animationDelay: "1s" }}
            >
              <span className="font-serif text-4xl leading-none text-coffee-900 tabular">+{experienceYears}</span>
              <span className="max-w-[9rem] text-[0.78rem] leading-tight text-muted">
                anos de experiência com profissionais da saúde
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
