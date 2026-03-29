import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { getSeoBaseUrl } from "@/lib/site";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

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
    <html lang="pt-BR" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className={`${plexSans.className} min-h-screen antialiased`}>
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
