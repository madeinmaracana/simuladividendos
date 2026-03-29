/**
 * Sanitiza o parâmetro `valor` da query string para exibição na OG (evita lixo / XSS em bitmap).
 */
export function sanitizeOgValorParam(raw: string | null): string | null {
  if (raw == null) return null;
  const decoded = raw.trim();
  if (!decoded) return null;
  if (decoded.length > 40) return null;
  // Apenas caracteres seguros para rótulo monetário em pt-BR
  if (!/^[\dR$\s.,\-]+$/.test(decoded)) return null;
  return decoded;
}
