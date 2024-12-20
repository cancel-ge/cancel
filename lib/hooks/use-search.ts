"use client";

import { useState, useMemo } from 'react';
import { Entry } from '@/lib/types';

export function useSearch(entries: Entry[]) {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<'all' | 'company' | 'person'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');
  const [shuffled, setShuffled] = useState(false);

  const filteredEntries = useMemo(() => {
    let result = entries
      .filter(entry => {
        const matchesSearch = entry.title.toLowerCase().includes(search.toLowerCase()) ||
                            entry.description.toLowerCase().includes(search.toLowerCase());
        const matchesType = type === 'all' || entry.type === type;
        return matchesSearch && matchesType;
      });

    if (shuffled) {
      return [...result].sort(() => Math.random() - 0.5);
    }

    return result.sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });
  }, [entries, search, type, sortOrder, shuffled]);

  const handleShuffle = () => {
    setShuffled(true);
    setSortOrder('desc'); // Reset sort order when shuffling
  };

  return {
    search,
    setSearch,
    type,
    setType,
    sortOrder,
    setSortOrder,
    filteredEntries,
    handleShuffle
  };
}