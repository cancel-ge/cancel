"use client";

import { Card } from '@/components/ui/card';
import { useEntries } from '@/lib/entries-context';
import { useSearch } from '@/lib/hooks/use-search';
import { useInfiniteScroll } from '@/lib/hooks/use-infinite-scroll';
import { SearchBar } from '@/components/search-bar';
import Link from 'next/link';

function EntryCardSkeleton() {
  return (
    <Card className="cursor-pointer h-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="w-40 h-40 mb-4 rounded-full bg-muted animate-pulse" />
      <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-background/10 to-transparent skeleton-shimmer" />
    </Card>
  );
}

export function EntryList() {
  const { entries, loading, error } = useEntries();
  
  const {
    search,
    setSearch,
    type,
    setType,
    sortOrder,
    setSortOrder,
    filteredEntries
  } = useSearch(entries);

  const displayedEntries = useInfiniteScroll(filteredEntries);

  if (loading) {
    return (
      <>
        <div className="mb-6 animate-pulse">
          <div className="w-full max-w-md h-10 bg-muted rounded-md mb-4" />
          <div className="flex gap-4">
            <div className="w-[110px] h-10 bg-muted rounded-md" />
            <div className="w-[110px] h-10 bg-muted rounded-md" />
            <div className="w-[110px] h-10 bg-muted rounded-md" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <EntryCardSkeleton key={i} />
          ))}
        </div>
      </>
    );
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading entries: {error.message}</div>;
  }

  return (
    <>
      <SearchBar
        search={search}
        onSearchChange={setSearch}
        type={type}
        onTypeChange={(value: string) => setType(value as "company" | "person" | "all")}
        sortOrder={sortOrder}
        onSortOrderChange={setSortOrder}
        onShuffle={() => {/* Implement shuffle logic here */}}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedEntries.map((entry) => (
          <Link key={entry.id} href={`/${entry.page_slug}`}>
            <Card className="cursor-pointer hover:shadow-lg transition-shadow h-full flex flex-col items-center justify-center p-6">
              {entry.image_url && (
                <div className="w-40 h-40 mb-4">
                  <img
                    src={entry.image_url}
                    alt={entry.title}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-xl font-semibold text-center">{entry.title}</h3>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
}