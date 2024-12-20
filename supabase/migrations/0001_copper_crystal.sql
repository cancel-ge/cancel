/*
  # Initial Schema Setup for cancel.ge

  1. New Tables
    - `entries`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `title` (text) - Name of company/person
      - `description` (text) - Optional description
      - `image_url` (text) - Profile image/logo URL
      - `screenshot_url` (text) - Screenshot URL
      - `social_link` (text) - Link to social media post
      - `type` (text) - Either 'company' or 'person'
      - `status` (text) - Moderation status
      
  2. Security
    - Enable RLS on `entries` table
    - Add policies for:
      - Public read access
      - Authenticated users can create entries
      - Only admins can update/delete entries
*/

CREATE TABLE entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  image_url text,
  screenshot_url text,
  social_link text,
  type text NOT NULL CHECK (type IN ('company', 'person')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT require_evidence CHECK (
    (screenshot_url IS NOT NULL) OR (social_link IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Public can read approved entries
CREATE POLICY "Public can view approved entries"
  ON entries
  FOR SELECT
  USING (status = 'approved');

-- Authenticated users can create entries
CREATE POLICY "Authenticated users can create entries"
  ON entries
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Only admins can update/delete entries
CREATE POLICY "Admins can update entries"
  ON entries
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admins can delete entries"
  ON entries
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');