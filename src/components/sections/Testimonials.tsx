import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { Testimonial } from "@/lib/content/types";

/** Renders only when real, approved testimonials exist in the CMS. */
export function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials.length) return null;
  return (
    <section className="container-x py-20 md:py-28" aria-labelledby="testimonials-title">
      <Reveal>
        <p className="eyebrow">Quem já conversa com a ES</p>
        <h2 id="testimonials-title" className="h2 mt-5 max-w-[16ch] text-coffee-900">
          Depoimentos de profissionais atendidos
        </h2>
      </Reveal>
      <Stagger className="mt-12" stagger={0.1}>
        <ul className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <StaggerItem as="li" key={t.id} className="flex flex-col border-t border-line pt-6">
              <blockquote className="font-serif text-[1.3rem] leading-snug text-coffee-900">“{t.quote}”</blockquote>
              <footer className="mt-5 text-sm text-muted">
                <span className="font-medium text-coffee-800">{t.name}</span>
                {t.profession ? `, ${t.profession}` : ""}
              </footer>
            </StaggerItem>
          ))}
        </ul>
      </Stagger>
    </section>
  );
}
