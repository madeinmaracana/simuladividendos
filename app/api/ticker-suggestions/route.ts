import { NextResponse } from "next/server";
import { searchTickerSuggestions } from "@/lib/brapi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  try {
    const suggestions = await searchTickerSuggestions(q);
    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
