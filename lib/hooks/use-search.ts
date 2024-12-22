"use client";

import { useState, useEffect, useMemo } from 'react';
import { useEntries } from '@/lib/entries-context';
import debounce from 'lodash/debounce';

export function useSearch() {
  const { entries, refreshEntries } = useEntries();
  const [search, setSearch] = useState('');
  const [type, setType] = useState<'all' | 'company' | 'person'>('all');
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  const debouncedRefresh = useMemo(
    () => debounce((params: { search?: string; type?: 'all' | 'company' | 'person'; sortOrder?: 'desc' | 'asc', shuffle?: boolean }) => {
      refreshEntries(params);
    }, 300),
    [refreshEntries]
  );

  useEffect(() => {
    debouncedRefresh({
      search,
      type,
      sortOrder,
      shuffle: false
    });
    
    return () => {
      debouncedRefresh.cancel();
    };
  }, [search, type, sortOrder, debouncedRefresh]);

  const handleShuffle = () => {
    debouncedRefresh.cancel();
    refreshEntries({
      search,
      type,
      sortOrder,
      shuffle: true,
    });
  };

  return {
    search,
    setSearch,
    type,
    setType,
    sortOrder,
    setSortOrder,
    onShuffle: handleShuffle,
    filteredEntries: entries,
  };
}


