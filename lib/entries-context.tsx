"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import { Entry } from './types';
import { mockEntries } from './mock-data';

interface EntriesContextType {
  entries: Entry[];
  addEntry: (entry: Omit<Entry, 'id' | 'created_at'>) => void;
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
  const [entries, setEntries] = useState<Entry[]>(mockEntries);

  const addEntry = (newEntry: Omit<Entry, 'id' | 'created_at'>) => {
    // Generate a URL-safe ID based on just the title
    const id = newEntry.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
      
    const entry: Entry = {
      ...newEntry,
      id,
      created_at: new Date().toISOString(),
    };
    
    setEntries(prev => [entry, ...prev]);
  };

  return (
    <EntriesContext.Provider value={{ entries, addEntry }}>
      {children}
    </EntriesContext.Provider>
  );
}