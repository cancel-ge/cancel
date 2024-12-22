import { Entry } from './types';

export const mockEntries: Entry[] = [
  {
    id: 'example-company',
    title: 'Example Company',
    description: 'A company that has shown resistance to EU integration efforts.',
    image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    type: 'company',
    created_at: '2024-03-20T12:00:00Z',
    fact_url: 'https://example.com',
    status: 'approved',
    page_slug: "mock"
  },
  {
    id: 'john-smith',
    title: 'John Smith',
    description: 'Public figure who has expressed skepticism about EU membership.',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    type: 'person',
    created_at: '2024-03-19T12:00:00Z',
    fact_url: 'https://example.com',
    status: 'approved',
    page_slug: "mock"
  }
];