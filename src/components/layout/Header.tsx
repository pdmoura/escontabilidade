"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { nav } from "@/lib/site";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

export function Header({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative z-[55] transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
          scrolled || open
            ? "bg-cream-100/85 shadow-[0_1px_0_0_rgb(64_40_32_/_0.08)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <a
          href="#conteudo"
          className="focus:bg-coffee-800 focus:text-cream-50 sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:px-4 focus:py-2"
        >
          Pular para o conteúdo
        </a>
        <div className="container-x flex h-[var(--header-height)] items-center justify-between gap-6">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="ES Contabilidade, página inicial"
          >
            <Image
              src="/brand/es-monogram.png"
              alt=""
              width={179}
              height={160}
              priority
              className="h-9 w-auto"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-coffee-900 font-serif text-[1.05rem] tracking-tight">Elenice Sousa</span>
              <span className="text-gold-700 mt-1 text-[0.62rem] font-semibold tracking-[0.2em] uppercase">
                Contabilidade
              </span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-coffee-800/85 hover:text-coffee-900 text-[0.92rem] font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.sticky}
              location="header"
              number={whatsapp}
              className="btn btn-primary min-h-11 px-5 py-2.5 text-[0.88rem]"
            >
              <WhatsAppIcon className="size-4" />
              WhatsApp
            </WhatsAppLink>
          </nav>

          <button
            type="button"
            className="border-line-strong text-coffee-900 relative z-[60] flex size-11 items-center justify-center rounded-full border md:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3.5 w-5" aria-hidden="true">
              <span
                className={`absolute inset-x-0 top-0 h-px bg-current transition-transform duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 top-[7px] h-px bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={`bg-cream-100 fixed inset-0 top-0 z-40 flex flex-col px-[var(--gutter)] pt-[calc(var(--header-height)+1.5rem)] pb-10 transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Menu" className="divide-line flex flex-col divide-y">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="text-coffee-900 py-5 font-serif text-[2rem] leading-none"
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-4">
          <p className="text-muted text-sm">Atendimento direto e personalizado.</p>
          <WhatsAppLink
            message={WHATSAPP_MESSAGES.sticky}
            location="mobile-menu"
            number={whatsapp}
            className="btn btn-primary w-full"
            tabIndex={open ? 0 : -1}
          >
            <WhatsAppIcon />
            Falar com Elenice no WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </header>
  );
}
