import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Entry } from "@/lib/types";

interface FetchParams {
  search?: string;
  type?: 'all' | 'company' | 'person';
  sortOrder?: 'desc' | 'asc';
  shuffle?: boolean;
}

export function useSupabaseEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [counts, setCounts] = useState({
    companiesCount: 0,
    peopleCount: 0,
    pendingCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCounts = useCallback(async () => {
    try {
      const [companiesCount, peopleCount, pendingCount] = await Promise.all([
        supabase
          .from("entries")
          .select("*", { count: 'exact', head: true })
          .eq("status", "approved")
          .eq("type", "company"),
        supabase
          .from("entries")
          .select("*", { count: 'exact', head: true })
          .eq("status", "approved")
          .eq("type", "person"),
        supabase
          .from("entries")
          .select("*", { count: 'exact', head: true })
          .eq("status", "pending")
      ]);

      setCounts({
        companiesCount: companiesCount.count || 0,
        peopleCount: peopleCount.count || 0,
        pendingCount: pendingCount.count || 0
      });
    } catch (err) {
      console.error("Error fetching counts:", err);
    }
  }, []);

  const fetchEntries = useCallback(async (params?: FetchParams) => {
    try {
      if (params?.shuffle) {
        const { data, error } = await supabase
          .from("entries")
          .select("*")
          .eq("status", "approved")
          .then(result => ({
            ...result,
            data: result.data?.sort(() => Math.random() - 0.5)
          }));

        if (error) throw error;
        setEntries(data || []);
        return;
      }

      let query = supabase
        .from("entries")
        .select("*")
        .eq("status", "approved");

      if (params?.type && params.type !== 'all') {
        query = query.eq('type', params.type);
      }

      if (params?.search) {
        query = query.ilike('title', `%${params.search}%`);
      }

      query = query.order('created_at', { 
        ascending: params?.sortOrder === 'asc' 
      });

      const { data, error } = await query;

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEntries();
    fetchCounts();
  }, [fetchEntries, fetchCounts]);

  async function addEntry(
    newEntry: Omit<Entry, "id" | "created_at" | "status">
  ) {
    try {
      const { data, error } = await supabase
        .from("entries")
        .insert([{ ...newEntry, status: "pending" }])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (err) {
      throw err;
    }
  }

  return {
    entries,
    loading,
    error,
    addEntry,
    refreshEntries: fetchEntries,
    ...counts
  };
}
