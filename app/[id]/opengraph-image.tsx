import { ImageResponse } from '@vercel/og';
import { mockEntries } from '@/lib/mock-data';
 
export const runtime = 'edge';
export const contentType = 'image/png';
 
export default async function Image({ params }: { params: { id: string } }) {
  const entry = mockEntries.find(e => e.id === params.id);
 
  return new ImageResponse(
    (
      <div
        style={{
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '48px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
          }}
        >
          {entry?.image_url && (
            <img
              src={entry.image_url}
              alt={entry.title}
              width="200"
              height="200"
              style={{
                borderRadius: '50%',
              }}
            />
          )}
          <h1
            style={{
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            {entry?.title || 'Cancel.ge Entry'}
          </h1>
        </div>
        <p
          style={{
            fontSize: '24px',
            color: '#666',
            marginTop: '24px',
            textAlign: 'center',
          }}
        >
          {entry?.description || 'View details about this entry on Cancel.ge'}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}