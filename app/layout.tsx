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
const defaultTitle = "Simula Dividendos | Simulador de renda passiva";
const defaultDescription =
  "Simule seus dividendos e descubra quanto você pode ganhar com investimentos em ações e renda passiva.";

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
  keywords: ["dividendos", "ações", "B3", "simulador", "renda passiva", "proventos", "investimentos", "Brasil"],
  robots: { index: false, follow: false },
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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="min-h-screen antialiased" style={{ background: "#F3F4F6" }}>
        <GoogleAnalytics />
        {/*
          p-2 = 8px gap on all sides — cria a margem entre o card hero e as bordas do viewport.
          Cada página inclui o SiteNav dentro do seu próprio card hero escuro.
        */}
        <div className="flex min-h-screen flex-col gap-0">
          {/* p-2 = 8px gap que cria a margem flutuante dos cards hero */}
          <div className="flex-1 p-2">{children}</div>
          {/* Footer temporariamente removido */}
          {/* <SiteFooter /> */}
        </div>
      </body>
    </html>
  );
}
