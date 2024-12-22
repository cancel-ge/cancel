"use client";

import { createContext, useContext, ReactNode } from 'react';
import { Entry } from './types';
import { useSupabaseEntries } from './hooks/use-entries';

interface EntriesContextType {
  entries: Entry[];
  loading: boolean;
  error: Error | null;
  addEntry: (entry: Omit<Entry, 'id' | 'created_at' | 'status'>) => Promise<Entry>;
  refreshEntries: (params?: { 
    search?: string; 
    type?: 'all' | 'company' | 'person'; 
    sortOrder?: 'desc' | 'asc';
    shuffle?: boolean;
  }) => Promise<void>;
  companiesCount: number;
  peopleCount: number;
  pendingCount: number;
}

const EntriesContext = createContext<EntriesContextType | undefined>(undefined);

export function useEntries() {
  const context = useContext(EntriesContext);
  if (context === undefined) {
    throw new Error('useEntries must be used within an EntriesProvider');
  }
  return context;
}

export function EntriesProvider({ children }: { children: ReactNode }) {
  const { entries, loading, error, addEntry, refreshEntries, companiesCount, peopleCount, pendingCount } = useSupabaseEntries();

  return (
    <EntriesContext.Provider value={{ entries, loading, error, addEntry, refreshEntries, companiesCount, peopleCount, pendingCount }}>
      {children}
    </EntriesContext.Provider>
  );
}