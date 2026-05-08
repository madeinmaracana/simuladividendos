import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Merriweather } from "next/font/google";
import { getSeoBaseUrl } from "@/lib/site";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import "./globals.css";

/** UI principal — Inter com zero cortado (feature "zero") */
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
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

/** Monospace — IBM Plex Mono para código/números tabulares */
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
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
  keywords: [
    "dividendos",
    "ações",
    "B3",
    "simulador",
    "renda passiva",
    "proventos",
    "investimentos",
    "Brasil",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: seoBase,
    locale: "pt_BR",
    type: "website",
    siteName: "Simula Dividendos",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${merriweather.variable} ${plexMono.variable}`}>
      <head>
        {/* Material Symbols Outlined — ícones do Google usados no design system */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <GoogleAnalytics />
        <div className="flex min-h-screen flex-col">
          <div
            className={cn(
              "flex min-h-0 flex-1 flex-col pb-0 pt-2 sm:pt-4",
              ui.pageShell
            )}
          >
            <SiteHeader />
            <div className="flex-1">{children}</div>
          </div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
