"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { track, type AnalyticsEvent, type AnalyticsPayload } from "@/lib/analytics";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event: AnalyticsEvent;
  payload?: AnalyticsPayload;
  children: ReactNode;
  external?: boolean;
};

export function TrackedLink({ href, event, payload, children, external, onClick, ...rest }: Props) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track(event, payload);
    onClick?.(e);
  };
  if (external || /^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a href={href} onClick={handleClick} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
