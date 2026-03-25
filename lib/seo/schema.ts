import { getSeoBaseUrl } from "@/lib/site";
import type { FaqItem } from "@/data/stocks";

function toAbsoluteUrl(href: string): string {
  const base = getSeoBaseUrl().replace(/\/$/, "");
  if (href.startsWith("http://") || href.startsWith("https://")) return href;
  const path = href.startsWith("/") ? href : `/${href}`;
  return `${base}${path}`;
}

export type BreadcrumbSchemaItem = { label: string; href: string };

/** Schema.org BreadcrumbList — só itens com URL (exclui a página atual se não tiver href). */
export function buildBreadcrumbListSchema(items: BreadcrumbSchemaItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      item: toAbsoluteUrl(item.href),
    })),
  };
}

export function buildFaqPageSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

type ArticleSchemaInput = {
  title: string;
  description: string;
  url: string;
};

export function buildArticleSchema({ title, description, url }: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
  };
}

/** `path` começa com `/` (ex.: `/artigos/slug`). */
export function buildArticleSchemaFromPath(
  article: { title: string; description: string },
  path: string
) {
  return buildArticleSchema({
    title: article.title,
    description: article.description,
    url: toAbsoluteUrl(path),
  });
}

type WebPageSchemaInput = {
  name: string;
  description: string;
  path: string;
};

export function buildWebPageSchema({ name, description, path }: WebPageSchemaInput) {
  const url = toAbsoluteUrl(path);
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
  };
}
