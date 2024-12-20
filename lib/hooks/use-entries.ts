import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Entry } from '@/lib/types';

export function useSupabaseEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchEntries();
  }, []);

  async function fetchEntries() {
    try {
      const { data, error } = await supabase
        .from('entries')
        .select('*')
        .eq('status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEntries(data || []);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  async function addEntry(newEntry: Omit<Entry, 'id' | 'created_at' | 'status'>) {
    try {
      const { data, error } = await supabase
        .from('entries')
        .insert([{ ...newEntry, status: 'pending' }])
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
    refreshEntries: fetchEntries
  };
}