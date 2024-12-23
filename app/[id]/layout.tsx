import { Metadata } from 'next';
import { getEntry } from '@/lib/get-entry';

export async function generateMetadata({
    params,
}: {
    params: Promise<any> | undefined
}): Promise<Metadata> {
    const resolvedParams = await Promise.resolve(params);
    
    // Ensure params.id exists
    if (!resolvedParams?.id) {
        return {
            title: 'Invalid Entry',
            description: 'No entry ID provided.',
        };
    }

    const entry = await getEntry(resolvedParams.id);

    if (!entry) {
        return {
            title: 'Entry Not Found',
            description: 'The requested entry could not be found.',
        };
    }

    // Create an SEO-optimized description (truncated to ~155 characters)
    const seoDescription = entry.description 
        ? `${entry.description.slice(0, 155)}${entry.description.length > 155 ? '...' : ''}`
        : `${entry.title} - Statement diverges from the Georgian public's demonstrated commitment to democratic values and European aspirations.`;
    
    const seoTitle = `${entry.title} - Cancel.ge`;

    return {
        title: seoTitle,
        description: seoDescription,
        openGraph: {
            title: seoTitle,
            description: seoDescription,
            images: [
                {
                    url: entry.fact_screenshot_url || entry.image_url || '',
                    width: 1200,
                    height: 630,
                    alt: entry.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: seoTitle,
            description: seoDescription,
            images: [entry.fact_screenshot_url || entry.image_url || ''],
        },
    };
}

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
} 