/** Nome da empresa/fundo na query — remove controles, limita tamanho. */
export function sanitizeOgEntityName(raw: string | null): string | null {
  if (raw == null) return null;
  const t = raw.replace(/[\u0000-\u001F\u007F]/g, "").trim();
  if (!t) return null;
  return t.slice(0, 120);
}

/**
 * Sanitiza o parâmetro `valor` da query string para exibição na OG (evita lixo / XSS em bitmap).
 */
export function sanitizeOgValorParam(raw: string | null): string | null {
  if (raw == null) return null;
  const decoded = raw
    .replace(/\u00a0/g, " ")
    .replace(/\u202f/g, " ")
    .trim();
  if (!decoded) return null;
  if (decoded.length > 40) return null;
  // Apenas caracteres seguros para rótulo monetário em pt-BR
  if (!/^[\dR$\s.,\-]+$/.test(decoded)) return null;
  return decoded;
}
