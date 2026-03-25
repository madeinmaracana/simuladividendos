type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  const chunks = Array.isArray(data) ? data : [data];
  return (
    <>
      {chunks.map((obj, i) => {
        const t = typeof obj["@type"] === "string" ? obj["@type"] : "node";
        return (
          <script
            key={`${t}-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
          />
        );
      })}
    </>
  );
}
