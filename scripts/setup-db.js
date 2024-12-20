const fetch = require('node-fetch');

// Read environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing required environment variables');
  process.exit(1);
}

const createTableSQL = `
  CREATE TABLE IF NOT EXISTS entries (
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
`;

async function setupDatabase() {
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
      },
      body: JSON.stringify({
        query: createTableSQL
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to create table: ${error}`);
    }

    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();