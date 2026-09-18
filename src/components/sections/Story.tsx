"use client";

import Image from "next/image";
import { useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { storyLines } from "@/lib/content/defaults";

/**
 * Pinned narrative chapter. Scroll drives which line is visible; the final
 * line resolves the story. Under reduced motion all lines render statically.
 */
export function Story() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  if (reduced) {
    return (
      <section className="bg-coffee-900 text-cream-50" aria-label="Enquanto você cuida dos seus pacientes">
        <div className="container-x py-24">
          <ul className="flex flex-col gap-10">
            {storyLines.map((line) => (
              <li key={line.focus}>
                <p className="font-serif text-2xl leading-tight text-cream-50/60 md:text-3xl">{line.lead}</p>
                <p className="font-serif mt-2 text-3xl leading-tight text-cream-50 md:text-5xl">{line.focus}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="relative h-[420svh] bg-coffee-900 text-cream-50" aria-label="Enquanto você cuida dos seus pacientes">
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <StoryBackdrop progress={scrollYProgress} />
        <div className="container-x relative grid gap-8 lg:grid-cols-12">
          <div className="relative min-h-[16rem] lg:col-span-9 lg:min-h-[20rem]">
            {storyLines.map((line, i) => (
              <StoryLine
                key={line.focus}
                lead={line.lead}
                focus={line.focus}
                index={i}
                total={storyLines.length}
                progress={scrollYProgress}
              />
            ))}
          </div>
          <div className="hidden lg:col-span-3 lg:flex lg:flex-col lg:items-end lg:justify-end">
            <ProgressRail progress={scrollYProgress} steps={storyLines.length} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Piecewise progress curve for one line: 0 before/after its slot, 1 while it holds. */
export function lineProgress(p: number, index: number, total: number): { opacity: number; y: number } {
  const slot = 1 / total;
  const start = index * slot;
  const end = start + slot;
  const fadeIn = 0.22 * slot;
  const fadeOut = 0.18 * slot;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  if (p < start) return { opacity: 0, y: 36 };
  if (p < start + fadeIn && !isFirst) {
    const t = (p - start) / fadeIn;
    return { opacity: t, y: 36 * (1 - t) };
  }
  if (isLast || p <= end - fadeOut) return { opacity: 1, y: 0 };
  if (p < end) {
    const t = (p - (end - fadeOut)) / fadeOut;
    return { opacity: 1 - t, y: -28 * t };
  }
  return { opacity: 0, y: -28 };
}

function StoryLine({
  lead,
  focus,
  index,
  total,
  progress,
}: {
  lead: string;
  focus: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const isLast = index === total - 1;
  const opacity = useTransform(progress, (p) => lineProgress(p, index, total).opacity);
  const y = useTransform(progress, (p) => lineProgress(p, index, total).y);

  return (
    <m.div
      style={{ opacity, y }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <p className="font-serif text-2xl leading-tight text-cream-50/55 sm:text-3xl md:text-[2.4rem]">{lead}</p>
      <p
        className={`font-serif mt-3 leading-[1.02] text-cream-50 ${
          isLast
            ? "text-[2.2rem] sm:text-5xl md:text-[4.4rem]"
            : "text-[2.4rem] sm:text-5xl md:text-[4.8rem]"
        }`}
      >
        {isLast ? <span className="text-gold-400">{focus}</span> : focus}
      </p>
    </m.div>
  );
}

function ProgressRail({ progress, steps }: { progress: MotionValue<number>; steps: number }) {
  const scaleY = useTransform(progress, [0, 1], [0, 1]);
  return (
    <div className="flex items-end gap-4">
      <span className="text-[0.7rem] font-semibold tracking-[0.2em] text-cream-50/50 uppercase">
        {steps} movimentos
      </span>
      <div className="relative h-40 w-px bg-cream-50/15">
        <m.div style={{ scaleY, transformOrigin: "top" }} className="absolute inset-0 bg-gold-500" />
      </div>
    </div>
  );
}

function StoryBackdrop({ progress }: { progress: MotionValue<number> }) {
  const x = useTransform(progress, [0, 1], ["6%", "-6%"]);
  const opacity = useTransform(progress, [0, 0.15, 0.85, 1], [0.5, 0.75, 0.75, 0.95]);
  return (
    <m.div aria-hidden="true" style={{ x, opacity }} className="pointer-events-none absolute inset-0">
      <Image
        src="/generated/editorial-sheets.webp"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-coffee-900 via-coffee-900/75 to-coffee-900/10" />
    </m.div>
  );
}
