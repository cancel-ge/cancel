"use client";

import { notFound } from 'next/navigation';
import { use } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SocialLinkButton } from '@/components/social-link-button';
import { useEntries } from '@/lib/entries-context';
import { useEffect } from 'react';
import { Header } from '@/components/header';

export default function EntryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { entries, loading, error } = useEntries();
  const entry = entries.find(e => e.page_slug === id);

  useEffect(() => {
    // If we have entries but can't find the requested one, show 404
    if (!loading && entries.length > 0 && !entry) {
      notFound();
    }
  }, [loading, entries, entry]);

  if (loading) {
    return (
      <main className="min-h-screen bg-background bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="animate-pulse">
              <div className="h-6 w-24 bg-muted rounded" />
              <Card className="mt-4">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-full bg-muted" />
                    <div className="h-8 w-48 bg-muted rounded" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-3/4 bg-muted rounded" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-background bg-slate-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Error Loading Entry</h2>
            <p className="text-muted-foreground">{error.message}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!entry) {
    return null; // Let useEffect handle the notFound() redirect
  }

  return (
    <main className="min-h-screen bg-background bg-slate-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-muted-foreground hover:text-foreground inline-block">
            ← Back to list
          </Link>

          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center space-x-4">
                {entry.image_url && (
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-16 h-16 rounded-full border-4 border-red-500/60 relative">
                        {/* <div className="absolute top-1/2 left-1/2 w-[100%] h-[4px] bg-red-500/45 -translate-x-1/2 -translate-y-1/2 rotate-45" /> */}
                      </div>
                    </div>
                    <img
                      src={entry.image_url}
                      title={entry.title}
                      alt={entry.title}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  </div>
                )}
                <CardTitle className="text-2xl"><h1>🚫 {entry.title}</h1></CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{entry.description}</p>

              {entry.fact_screenshot_url && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={entry.fact_screenshot_url}
                    title={entry.title}
                    alt="Evidence"
                    className="w-full"
                  />
                </div>
              )}

              {entry.fact_url && (
                <SocialLinkButton url={entry.fact_url} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}