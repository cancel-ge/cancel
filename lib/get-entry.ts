import { supabase } from "@/lib/supabase";

export async function getEntry(id: string) {
  const { data } = await supabase
    .from("entries")
    .select("*")
    .eq("page_slug", id)
    .eq("status", "approved")
    .single();

  return data;
}
