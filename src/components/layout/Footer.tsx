import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { WhatsAppIcon, WhatsAppLink } from "@/components/ui/WhatsAppLink";
import type { ExtendedSettings } from "@/lib/content/get";
import { site } from "@/lib/site";
import { WHATSAPP_MESSAGES } from "@/lib/whatsapp";

const links = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#servicos", label: "Serviços" },
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/#faq", label: "FAQ" },
  { href: "/privacidade", label: "Privacidade" },
];

export function Footer({ settings }: { settings: ExtendedSettings }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-cream-100 pb-28 md:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Image
            src="/brand/logo-lockup.png"
            alt="ES Contabilidade, Elenice Sousa"
            width={500}
            height={500}
            className="-ml-4 h-40 w-auto"
            sizes="200px"
          />
          <p className="mt-2 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            Contabilidade especializada para médicos, dentistas, clínicas e demais profissionais da saúde.
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Navegação</p>
          <ul className="mt-5 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-[0.95rem] text-coffee-800 transition-colors hover:text-coffee-900 hover:underline hover:decoration-gold-600 hover:underline-offset-4">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow">Contato</p>
          <ul className="mt-5 flex flex-col gap-3 text-[0.95rem]">
            <li>
              <WhatsAppLink
                message={WHATSAPP_MESSAGES.final}
                location="footer"
                number={settings.whatsapp}
                className="inline-flex items-center gap-2 text-coffee-800 hover:text-coffee-900 hover:underline hover:decoration-gold-600 hover:underline-offset-4"
              >
                <WhatsAppIcon className="size-4 text-gold-700" />
                WhatsApp: {settings.phone}
              </WhatsAppLink>
            </li>
            <li>
              <TrackedLink
                href={`mailto:${settings.email}`}
                event="email_click"
                payload={{ location: "footer" }}
                className="text-coffee-800 hover:text-coffee-900 hover:underline hover:decoration-gold-600 hover:underline-offset-4"
              >
                {settings.email}
              </TrackedLink>
            </li>
            {settings.googleProfileUrl ? (
              <li>
                <TrackedLink
                  href={settings.googleProfileUrl}
                  event="google_profile_click"
                  payload={{ location: "footer" }}
                  className="text-coffee-800 hover:text-coffee-900 hover:underline hover:decoration-gold-600 hover:underline-offset-4"
                >
                  Ver perfil no Google
                </TrackedLink>
              </li>
            ) : null}
            {settings.socials.map((s) => (
              <li key={s.url}>
                <TrackedLink
                  href={s.url}
                  event="instagram_click"
                  payload={{ location: "footer", network: s.label }}
                  className="text-coffee-800 hover:text-coffee-900 hover:underline hover:decoration-gold-600 hover:underline-offset-4"
                >
                  {s.label}
                  {/instagram/i.test(s.label) ? `: ${site.instagramHandle}` : ""}
                </TrackedLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-[0.8rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {settings.brandName} · {site.owner}. Todos os direitos reservados, {year}.
        </p>
        <p>{settings.serviceArea}</p>
      </div>
    </footer>
  );
}
