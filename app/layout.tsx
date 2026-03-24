import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSiteUrl } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "SimulaDividendos — simule proventos de ações brasileiras",
    template: "%s · SimulaDividendos",
  },
  description:
    "Ferramenta educativa para estimar dividendos de ações brasileiras com base em dados públicos. Não constitui recomendação de investimento.",
  keywords: [
    "dividendos",
    "ações",
    "B3",
    "simulador",
    "proventos",
    "ticker",
    "Brasil",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "SimulaDividendos",
    description:
      "Simule quanto uma ação pode pagar em dividendos (estimativas, sem garantias).",
    locale: "pt_BR",
    type: "website",
    siteName: "SimulaDividendos",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "SimulaDividendos",
    description:
      "Simule proventos de ações brasileiras com base no histórico (estimativas).",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <div className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
              SimulaDividendos
            </p>
          </header>
          {children}
          <footer className="mt-16 border-t border-neutral-200 pt-8 text-center text-xs text-neutral-400 dark:border-neutral-800">
            Dados via brapi.dev. Uso por sua conta e risco; não é aconselhamento financeiro.
          </footer>
        </div>
      </body>
    </html>
  );
}
