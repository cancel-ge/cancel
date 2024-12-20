"use client";

import { useEffect, useState } from 'react';

export function useInfiniteScroll<T>(
  items: T[],
  initialLimit: number = 5
) {
  const [displayedItems, setDisplayedItems] = useState<T[]>([]);
  const [limit, setLimit] = useState(initialLimit);

  useEffect(() => {
    setDisplayedItems(items.slice(0, limit));
  }, [items, limit]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100) {
        setLimit(prev => Math.min(prev + initialLimit, items.length));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [initialLimit, items.length]);

  return displayedItems;
}