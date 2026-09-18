"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useId, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { track } from "@/lib/analytics";
import type { Faq as FaqItem } from "@/lib/content/types";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function Faq({ faqs, whatsapp }: { faqs: FaqItem[]; whatsapp: string }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const baseId = useId();

  const toggle = (faq: FaqItem) => {
    const next = openId === faq.id ? null : faq.id;
    setOpenId(next);
    if (next) track("faq_open", { question: faq.question });
  };

  return (
    <section id="faq" className="container-x py-20 md:py-28" aria-labelledby="faq-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
            <Reveal>
              <p className="eyebrow">Perguntas frequentes</p>
              <h2 id="faq-title" className="h2 mt-5 max-w-[12ch] text-coffee-900">
                O que costumam perguntar antes de começar
              </h2>
              <p className="mt-6 max-w-[36ch] text-[0.98rem] leading-relaxed text-muted">
                Não encontrou a sua dúvida? Ela provavelmente cabe em uma mensagem.
              </p>
              <WhatsAppLink
                message={WHATSAPP_MESSAGES.sticky}
                location="faq"
                number={whatsapp}
                className="btn btn-outline mt-6"
              >
                <WhatsAppIcon className="size-4" />
                Tirar uma dúvida no WhatsApp
              </WhatsAppLink>
            </Reveal>
          </div>
        </div>
        <div className="lg:col-span-7 lg:col-start-6">
          <ul className="border-t border-line">
            {faqs.map((faq, i) => {
              const open = openId === faq.id;
              const panelId = `${baseId}-faq-panel-${i}`;
              const buttonId = `${baseId}-faq-button-${i}`;
              return (
                <li key={faq.id} className="border-b border-line">
                  <h3 className="m-0">
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => toggle(faq)}
                      className="flex w-full items-start justify-between gap-6 py-5 text-left md:py-6"
                    >
                      <span className="font-serif text-[1.25rem] leading-snug text-coffee-900 md:text-[1.5rem]">
                        {faq.question}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong text-coffee-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "rotate-45" : ""}`}
                      >
                        <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M8 2v12M2 8h12" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {open ? (
                      <m.div
                        key="panel"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduced ? { height: 0, opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-[60ch] pb-6 text-[1rem] leading-relaxed text-coffee-800">{faq.answer}</p>
                      </m.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
