import { SiteNav } from "@/components/layout/SiteNav";

interface SiteHeaderProps {
  /** Título da página — renderiza o hero completo com título + descrição */
  title?: string;
  /** Subtítulo/descrição abaixo do título */
  description?: string;
}

/**
 * Header standalone para páginas sem hero próprio.
 * - Sem title/description → só a barra de nav (card escuro fino)
 * - Com title/description → hero completo igual ao Figma node-id=52-333:
 *   padding 24px top / 120px bottom, gap 120px entre nav e conteúdo,
 *   título 56px light, subtítulo 24px light
 */
export function SiteHeader({ title, description }: SiteHeaderProps = {}) {
  const hasContent = Boolean(title);

  return (
    <div
      className="flex flex-col items-center rounded-[32px]"
      style={{
        backgroundImage: "url(/hero-bg.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#2A2A2A",
        paddingTop: 24,
        paddingBottom: hasContent ? 120 : undefined,
        gap: hasContent ? 120 : undefined,
      }}
    >
      <SiteNav />

      {hasContent && (
        <div
          className="flex w-full flex-col px-4"
          style={{ maxWidth: 980, gap: 32 }}
        >
          <h1
            className="text-white"
            style={{ fontSize: 56, fontWeight: 300, lineHeight: "63px" }}
          >
            {title}
          </h1>
          {description && (
            <p
              className="text-white"
              style={{ fontSize: 24, fontWeight: 300, lineHeight: "normal" }}
            >
              {description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
