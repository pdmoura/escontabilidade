"use client";

import * as m from "motion/react-m";
import { useReducedMotion } from "motion/react";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: "div" | "section" | "p" | "li" | "span" | "figure" | "article" | "h2" | "h3";
  delay?: number;
  y?: number;
  once?: boolean;
  amount?: number;
  className?: string;
};

/**
 * Entrance reveal on scroll. Animates only opacity/transform, and under
 * prefers-reduced-motion it renders content immediately visible.
 */
export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 28,
  once = true,
  amount = 0.25,
  className,
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = m[as] as ElementType;
  if (reduced) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Tag>
  );
}

type StaggerProps = ComponentPropsWithoutRef<"div"> & {
  children: ReactNode;
  stagger?: number;
  amount?: number;
};

/** Parent that staggers its `StaggerItem` children. */
export function Stagger({ children, stagger = 0.08, amount = 0.2, className, ...rest }: StaggerProps) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{ visible: { transition: { staggerChildren: stagger } } }}
      {...(rest as Record<string, unknown>)}
    >
      {children}
    </m.div>
  );
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "p" }) {
  const reduced = useReducedMotion();
  const Tag = m[as] as ElementType;
  if (reduced) {
    const Plain = as as ElementType;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      variants={{
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
      }}
    >
      {children}
    </Tag>
  );
}
