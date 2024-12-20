CREATE TABLE entries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  title text NOT NULL,
  description text,
  image_url text,
  fact_screenshot text,
  fact_link text,
  type text NOT NULL CHECK (type IN ('company', 'person')),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  CONSTRAINT require_evidence CHECK (
    (fact_screenshot IS NOT NULL) OR (fact_link IS NOT NULL)
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