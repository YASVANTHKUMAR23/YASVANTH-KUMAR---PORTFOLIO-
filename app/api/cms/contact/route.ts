import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use the Service Role Key to bypass RLS in server-side routes
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('portfolio_data')
      .select('content')
      .eq('id', 'contact')
      .single();

    if (error || !data) return NextResponse.json({});
    return NextResponse.json(data.content);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { error } = await supabaseAdmin
      .from('portfolio_data')
      .upsert({ id: 'contact', content: data });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update contact data' }, { status: 500 });
  }
}
