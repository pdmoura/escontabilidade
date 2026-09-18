"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

/** Discreet persistent CTA for small screens. Appears after the hero. */
export function StickyWhatsApp({ whatsapp }: { whatsapp: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
      }`}
      aria-hidden={!visible}
    >
      <WhatsAppLink
        message={WHATSAPP_MESSAGES.sticky}
        event="whatsapp_sticky_click"
        location="sticky-mobile"
        number={whatsapp}
        tabIndex={visible ? 0 : -1}
        className="btn btn-gold w-full shadow-[0_18px_40px_-16px_rgb(43_25_18_/_0.5)]"
      >
        <WhatsAppIcon />
        Falar com Elenice
      </WhatsAppLink>
    </div>
  );
}
