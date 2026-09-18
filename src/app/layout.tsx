import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { defaultSettings } from "@/lib/content/defaults";
import { OG_ALT } from "@/lib/og/render";
import { SITE_URL, site } from "@/lib/site";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400"],
  display: "swap",
  variable: "--font-newsreader",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultSettings.seoTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultSettings.seoDescription,
  applicationName: site.name,
  authors: [{ name: site.owner, url: SITE_URL }],
  creator: site.owner,
  keywords: [
    "contabilidade para médicos",
    "contabilidade para profissionais da saúde",
    "contador para médicos",
    "contabilidade para clínicas",
    "contabilidade especializada em saúde",
    "contadora para profissionais da saúde",
    "contabilidade para dentistas",
    "planejamento tributário para médicos",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    url: "/",
    title: defaultSettings.seoTitle,
    description: defaultSettings.seoDescription,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: OG_ALT }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSettings.seoTitle,
    description: defaultSettings.seoDescription,
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: OG_ALT }],
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f2ebd8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${newsreader.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" crossOrigin="anonymous" />
      </head>
      <body className="flex min-h-full flex-col">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
