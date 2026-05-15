import type { Metadata } from "next";
import { Inter, Merriweather } from "next/font/google";
import { getSeoBaseUrl } from "@/lib/site";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SiteFooter } from "@/components/layout/SiteFooter";
import "./globals.css";

/** Inter — fonte primária do design system */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
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
          {/* Footer fora do p-2 → sem margin lateral, sem cantos arredondados */}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
