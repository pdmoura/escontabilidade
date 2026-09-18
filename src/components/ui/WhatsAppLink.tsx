"use client";

import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  message: string;
  event?: AnalyticsEvent;
  location: string;
  children: ReactNode;
  number?: string;
};

export function WhatsAppLink({ message, event = "whatsapp_click", location, children, number, onClick, ...rest }: Props) {
  const href = buildWhatsAppUrl(message, number);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        track(event, { location });
        if (event !== "whatsapp_click") track("whatsapp_click", { location });
        onClick?.(e);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m0 1.67c4.55 0 8.24 3.7 8.24 8.24s-3.7 8.24-8.24 8.24c-1.5 0-2.96-.4-4.24-1.17l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.29-8.24m-3.5 4.4c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.43 1.03 2.6.13.17 1.77 2.7 4.29 3.79 2.09.83 2.52.67 2.97.63.45-.04 1.46-.6 1.66-1.17.2-.58.2-1.07.15-1.17-.06-.1-.23-.17-.48-.29s-1.46-.72-1.69-.8c-.23-.08-.4-.13-.56.12-.17.25-.65.8-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.42h-.49Z" />
    </svg>
  );
}
