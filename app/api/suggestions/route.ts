import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabase
    .from("entries")
    .select("title, page_slug")
    .ilike("page_slug", `%${query}%`)
    .limit(5);

  if (error) {
    console.error("Error fetching suggestions:", error);
    return NextResponse.json([]);
  }

  return NextResponse.json(data);
}
