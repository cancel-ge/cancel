export interface Entry {
  id: string;
  title: string;
  description: string;
  image_url: string;
  screenshot_url?: string;
  social_link?: string;
  type: 'company' | 'person';
  created_at: string;
}