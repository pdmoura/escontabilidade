"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { nav } from "@/lib/site";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

const SECTION_IDS = ["sobre", "servicos", "faq"];

function useActiveNav(pathname: string) {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(null);
      return;
    }
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    if (!sections.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActiveSection(best);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [pathname]);

  return (href: string) => {
    if (href.startsWith("/#")) return pathname === "/" && activeSection === href.slice(2);
    return pathname === href || pathname.startsWith(`${href}/`);
  };
}

export function Header({ whatsapp }: { whatsapp: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuId = useId();
  const pathname = usePathname();
  const isActive = useActiveNav(pathname);

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
          <Link href="/" className="group flex items-center gap-3" aria-label="ES Contabilidade, página inicial">
            <Image
              src="/brand/es-mark.png"
              alt=""
              width={800}
              height={717}
              priority
              className="h-10 w-auto transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-coffee-900 font-serif text-[1.05rem] tracking-tight">Elenice Sousa</span>
              <span className="text-gold-700 mt-1 text-[0.62rem] font-semibold tracking-[0.2em] uppercase">
                Contabilidade
              </span>
            </span>
          </Link>

          <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`nav-link ${active ? "is-active" : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <WhatsAppLink
              message={WHATSAPP_MESSAGES.sticky}
              location="header"
              number={whatsapp}
              className="btn btn-primary btn-shine ml-1 min-h-11 px-5 py-2.5 text-[0.88rem]"
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
          {nav.map((item, i) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                tabIndex={open ? 0 : -1}
                aria-current={active ? "page" : undefined}
                className={`flex items-center justify-between py-5 font-serif text-[2rem] leading-none transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  active ? "text-coffee-900" : "text-coffee-800/80"
                } ${open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}`}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
              >
                {item.label}
                {active ? <span aria-hidden="true" className="bg-gold-600 size-2 rounded-full" /> : null}
              </Link>
            );
          })}
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
