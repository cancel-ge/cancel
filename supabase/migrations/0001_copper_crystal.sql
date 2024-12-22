CREATE TABLE entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  page_slug text NOT NULL,
  description text,
  image_url text,
  fact_screenshot_url text,
  fact_url text,
  type text NOT NULL CHECK (type IN ('company', 'person')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT require_evidence CHECK (
    (fact_screenshot_url IS NOT NULL) OR (fact_url IS NOT NULL)
  )
);

-- Enable RLS
ALTER TABLE entries ENABLE ROW LEVEL SECURITY;

-- Public can read all entries
CREATE POLICY "Public can view all entries"
  ON entries
  FOR SELECT
  USING (true);

-- Public users can create entries
CREATE POLICY "Public can create entries"
  ON entries
  FOR INSERT
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