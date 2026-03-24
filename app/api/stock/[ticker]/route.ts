import { NextResponse } from "next/server";
import { BrapiError, getStockData } from "@/lib/brapi";

export async function GET(
  _request: Request,
  context: { params: { ticker: string } }
) {
  const { ticker } = context.params;
  try {
    const stock = await getStockData(ticker);
    return NextResponse.json({ stock });
  } catch (e) {
    if (e instanceof BrapiError) {
      return NextResponse.json({ error: e.message }, { status: e.status });
    }
    return NextResponse.json({ error: "Erro inesperado ao consultar o ativo." }, { status: 500 });
  }
}
