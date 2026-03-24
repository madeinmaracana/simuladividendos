import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getSeoBaseUrl } from "@/lib/site";
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
    <html lang="pt-BR">
      <body className={`${inter.className} min-h-screen antialiased`}>
        <div className="mx-auto min-h-screen max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          <header className="mb-10 text-left">
            <p className="text-sm font-medium uppercase tracking-widest text-teal-600 dark:text-teal-400">
              Simula Dividendos
            </p>
          </header>
          {children}
          <footer className="mt-16 border-t border-neutral-200 pt-8 text-center text-xs text-neutral-400 dark:border-neutral-800">
            Uso por sua conta e risco; não é aconselhamento financeiro.
          </footer>
        </div>
      </body>
    </html>
  );
}
