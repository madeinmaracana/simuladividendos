import type { FaqItem, SectorSlug } from "@/data/stocks";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
};

export type ArticleRecord = {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  sections: ArticleSection[];
  faqs: FaqItem[];
  relatedTickers: string[];
  relatedSectors: SectorSlug[];
};
