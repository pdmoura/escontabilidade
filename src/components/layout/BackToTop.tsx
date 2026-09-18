"use client";

import { useEffect, useState } from "react";

/** Bottom-right "back to top" control. Appears after the first viewport is scrolled. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Voltar ao topo"
      title="Voltar ao topo"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`group fixed right-4 bottom-[calc(5.5rem+env(safe-area-inset-bottom))] z-40 flex size-12 items-center justify-center rounded-full border border-gold-500/60 bg-cream-100/90 text-coffee-800 shadow-lift backdrop-blur-sm transition-[opacity,transform,background-color,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-coffee-800 hover:text-cream-50 md:right-6 md:bottom-6 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="size-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5" />
        <path d="m6 11 6-6 6 6" />
      </svg>
    </button>
  );
}
