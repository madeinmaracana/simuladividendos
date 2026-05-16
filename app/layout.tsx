import type { Metadata } from "next";
import localFont from "next/font/local";
import { Merriweather } from "next/font/google";
import { getSeoBaseUrl } from "@/lib/site";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

/**
 * Inter Variable — fonte local (rsms.me/inter) para suportar OpenType features completas.
 * Google Fonts serve subsets sem as tabelas de features (zero, ss01), por isso usamos
 * o arquivo completo via next/font/local.
 */
const inter = localFont({
  src: [
    {
      path: "./fonts/InterVariable.woff2",
      style: "normal",
    },
    {
      path: "./fonts/InterVariable-Italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

/** Editorial / artigos — Merriweather serif */
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const seoBase = getSeoBaseUrl();
const defaultTitle = "Simula Dividendos | Simulador de dividendos gratuito";
const defaultDescription =
  "Simule dividendos de ações e FIIs da B3. Compare renda passiva, dividend yield e rendimentos mensais com um simulador de dividendos gratuito.";

export const metadata: Metadata = {
  metadataBase: new URL(seoBase),
  title: {
    default: defaultTitle,
    template: "%s | Simula Dividendos",
  },
  description: defaultDescription,
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-icon",
  },
  keywords: [
    "simulador de dividendos",
    "dividendos",
    "ações",
    "FIIs",
    "B3",
    "renda passiva",
    "dividend yield",
    "proventos",
    "fundos imobiliários",
    "investimentos",
  ],
  /*
   * Padrão global: permitir indexação.
   * Páginas específicas sobrescrevem com robots: { index: false } quando necessário
   * (ex.: variantes de URL de ticker que são não-canônicas).
   */
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: seoBase,
    locale: "pt_BR",
    type: "website",
    siteName: "Simula Dividendos",
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${merriweather.variable}`} suppressHydrationWarning>
      <head>
        {/* preconnect reduz latência no carregamento do CSS de ícones */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-screen antialiased">
        <GoogleAnalytics />
        <div className="flex min-h-screen flex-col gap-0">
          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}
