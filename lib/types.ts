export interface Entry {
  id: string;
  title: string;
  page_slug: string;
  description?: string;
  image_url: string;
  fact_screenshot_url?: string;
  fact_link?: string;
  type: 'company' | 'person';
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}