import { notFound } from 'next/navigation';
import { mockEntries } from '@/lib/mock-data';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { SocialLinkButton } from '@/components/social-link-button';

export function generateStaticParams() {
  return mockEntries.map((entry) => ({
    id: entry.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const entry = mockEntries.find(e => e.id === params.id);

  if (!entry) {
    return {
      title: 'Entry Not Found - Cancel.ge',
      description: 'The requested entry could not be found.',
    };
  }

  return {
    title: `${entry.title} - Cancel.ge`,
    description: entry.description,
    openGraph: {
      title: `${entry.title} - Cancel.ge`,
      description: entry.description,
      images: [entry.image_url],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${entry.title} - Cancel.ge`,
      description: entry.description,
      images: [entry.image_url],
    },
  };
}

export default function EntryPage({ params }: { params: { id: string } }) {
  const entry = mockEntries.find(e => e.id === params.id);
  
  if (!entry) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="text-muted-foreground hover:text-foreground mb-6 inline-block">
            ← Back to list
          </Link>
          
          <Card className="mt-4">
            <CardHeader>
              <div className="flex items-center space-x-4">
                {entry.image_url && (
                  <img
                    src={entry.image_url}
                    alt={entry.title}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <CardTitle className="text-2xl">{entry.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{entry.description}</p>

              {entry.screenshot_url && (
                <div className="rounded-lg overflow-hidden">
                  <img
                    src={entry.screenshot_url}
                    alt="Evidence"
                    className="w-full"
                  />
                </div>
              )}

              {entry.social_link && (
                <SocialLinkButton url={entry.social_link} />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}