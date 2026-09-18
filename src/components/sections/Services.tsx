"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useId, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { Service } from "@/lib/content/types";
import { serviceMessage } from "@/lib/whatsapp";

export function Services({ services, whatsapp }: { services: Service[]; whatsapp: string }) {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null);
  const reduced = useReducedMotion();
  const baseId = useId();

  return (
    <section id="servicos" className="bg-cream-50 py-20 md:py-28" aria-labelledby="services-title">
      <div className="container-x">
        <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">Serviços</p>
            <h2 id="services-title" className="h2 mt-5 max-w-[16ch] text-coffee-900">
              O que a ES cuida para você
            </h2>
          </div>
          <p className="lede md:col-span-5 md:max-w-[38ch]">
            Cada frente pode ser contratada de forma isolada ou combinada, conforme o momento do seu consultório
            ou da sua clínica.
          </p>
        </Reveal>

        <ul className="mt-14 border-t border-line" role="list">
          {services.map((service, i) => {
            const open = openId === service.id;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li key={service.id} className="border-b border-line">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenId(open ? null : service.id)}
                    className="group grid w-full grid-cols-[3rem_1fr_2.5rem] items-center gap-4 py-6 text-left transition-colors md:grid-cols-[4rem_1fr_3rem] md:py-8"
                  >
                    <span className="font-serif text-lg leading-none text-gold-700 tabular md:text-xl">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex flex-col gap-1.5">
                      <span className="font-serif text-[1.55rem] leading-tight text-coffee-900 transition-colors group-hover:text-coffee-700 md:text-[2rem]">
                        {service.title}
                      </span>
                      <span className="max-w-[60ch] text-[0.95rem] leading-relaxed text-muted">{service.shortDescription}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex size-10 items-center justify-center justify-self-end rounded-full border border-line-strong text-coffee-800 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "rotate-45" : ""}`}
                    >
                      <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M8 2v12M2 8h12" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {open ? (
                    <m.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      key="panel"
                      initial={reduced ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduced ? { height: 0, opacity: 0, transition: { duration: 0 } } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-6 pb-8 md:grid-cols-[4rem_1fr] md:pb-10">
                        <span aria-hidden="true" />
                        <div className="grid gap-6 md:grid-cols-12 md:items-start">
                          <p className="max-w-[62ch] text-[1.02rem] leading-relaxed text-coffee-800 md:col-span-8">
                            {service.description}
                          </p>
                          <div className="md:col-span-4 md:justify-self-end">
                            <WhatsAppLink
                              message={service.whatsappMessage?.trim() || serviceMessage(service.title)}
                              event="whatsapp_service_click"
                              location={`service:${service.slug}`}
                              number={whatsapp}
                              className="btn btn-outline"
                            >
                              <WhatsAppIcon className="size-4" />
                              Falar sobre isto
                            </WhatsAppLink>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
