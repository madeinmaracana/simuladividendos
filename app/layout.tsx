import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSeoBaseUrl } from "@/lib/site";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { cn } from "@/lib/cn";
import { ui } from "@/components/ui/classes";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
    <html lang="pt-BR" className={inter.variable}>
      <body className={`${inter.className} min-h-screen antialiased`}>
        <div
          className={cn(
            "flex min-h-screen flex-col pb-10 pt-2 sm:pb-12 sm:pt-4",
            ui.pageShell
          )}
        >
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
