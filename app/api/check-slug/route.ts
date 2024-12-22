import { supabase } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ exists: false });
  }

  const { data, error } = await supabase
    .from('entries')
    .select('page_slug')
    .eq('page_slug', slug)
    .single();

  if (error && error.code === 'PGRST116') {
    // PGRST116 means no rows found
    return NextResponse.json({ exists: false });
  }

  return NextResponse.json({ exists: !!data });
} 