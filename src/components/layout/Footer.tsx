import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, MailIcon, MapPinIcon } from "@/components/ui/SocialIcons";
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

const contactLink =
  "inline-flex items-center gap-2 text-coffee-800 transition-colors hover:text-coffee-900 hover:underline hover:decoration-gold-600 hover:underline-offset-4";

export function Footer({ settings }: { settings: ExtendedSettings }) {
  const year = new Date().getFullYear();
  const instagram = settings.socials.find((s) => /instagram/i.test(s.label))?.url ?? settings.instagramUrl;

  return (
    <footer className="border-t border-line bg-cream-200/60 pb-28 md:pb-0">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-end gap-5" aria-label="ES Contabilidade, página inicial">
            <Image
              src="/brand/es-mark.png"
              alt=""
              width={800}
              height={717}
              sizes="160px"
              className="h-28 w-auto drop-shadow-[0_10px_24px_rgb(43_25_18_/_0.18)] md:h-36"
            />
            <span className="flex flex-col pb-2 leading-none">
              <span className="font-serif text-[1.6rem] tracking-tight text-coffee-900 md:text-[1.9rem]">
                Elenice Sousa
              </span>
              <span className="mt-2 text-[0.7rem] font-semibold tracking-[0.22em] text-gold-700 uppercase">
                ES Contabilidade
              </span>
            </span>
          </Link>
          <p className="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-muted">
            Contabilidade especializada para médicos, dentistas, clínicas e demais profissionais da saúde.
          </p>
          <ul className="mt-6 flex items-center gap-3" aria-label="Redes e contato">
            {instagram ? (
              <li>
                <TrackedLink
                  href={instagram}
                  event="instagram_click"
                  payload={{ location: "footer-icons" }}
                  className="icon-link"
                  aria-label={`Instagram ${site.instagramHandle}`}
                  title="Instagram"
                >
                  <InstagramIcon />
                </TrackedLink>
              </li>
            ) : null}
            {settings.googleProfileUrl ? (
              <li>
                <TrackedLink
                  href={settings.googleProfileUrl}
                  event="google_profile_click"
                  payload={{ location: "footer-icons" }}
                  className="icon-link"
                  aria-label="Perfil no Google Maps"
                  title="Ver no Google"
                >
                  <MapPinIcon />
                </TrackedLink>
              </li>
            ) : null}
            <li>
              <TrackedLink
                href={`mailto:${settings.email}`}
                event="email_click"
                payload={{ location: "footer-icons" }}
                className="icon-link"
                aria-label={`E-mail ${settings.email}`}
                title="E-mail"
              >
                <MailIcon />
              </TrackedLink>
            </li>
            <li>
              <WhatsAppLink
                message={WHATSAPP_MESSAGES.final}
                location="footer-icons"
                number={settings.whatsapp}
                className="icon-link"
                aria-label={`WhatsApp ${settings.phone}`}
                title="WhatsApp"
              >
                <WhatsAppIcon className="size-5" />
              </WhatsAppLink>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow">Navegação</p>
          <ul className="mt-5 flex flex-col gap-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={contactLink}>
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
                className={contactLink}
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
                className={contactLink}
              >
                <MailIcon className="size-4 text-gold-700" />
                {settings.email}
              </TrackedLink>
            </li>
            {settings.googleProfileUrl ? (
              <li>
                <TrackedLink
                  href={settings.googleProfileUrl}
                  event="google_profile_click"
                  payload={{ location: "footer" }}
                  className={contactLink}
                >
                  <MapPinIcon className="size-4 text-gold-700" />
                  Ver perfil no Google
                </TrackedLink>
              </li>
            ) : null}
            {instagram ? (
              <li>
                <TrackedLink
                  href={instagram}
                  event="instagram_click"
                  payload={{ location: "footer", network: "Instagram" }}
                  className={contactLink}
                >
                  <InstagramIcon className="size-4 text-gold-700" />
                  Instagram: {site.instagramHandle}
                </TrackedLink>
              </li>
            ) : null}
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
