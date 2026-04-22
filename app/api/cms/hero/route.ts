import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { HeroData } from '@/components/CMS';

// Helper to get admin client safely
function getAdminClient() {
  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
  // Using the secure server-only key (no NEXT_PUBLIC_ prefix)
  const key = (process.env.SUPABASE_SERVICE_ROLE_KEY || '').trim();
  
  if (!url || !key) {
    throw new Error('Supabase URL or Service Role Key is missing');
  }
  
  return createClient(url, key);
}

const DEFAULT_HERO: HeroData = {
  name: "YASVANTH",
  imageSrc: "/avatar.png",
  leftText: "AI & Data Science Engineer specialized in Expert Python & n8n RAG.",
  rightText: "WhatsApp health bots and ML models are my specialty.",
  twitterUrl: "#",
  instagramUrl: "#",
  youtubeUrl: "#",
  buttonText: "Let's Talk",
  buttonUrl: "#"
};

async function getHero(): Promise<HeroData> {
  const supabaseAdmin = getAdminClient();
  const { data, error } = await supabaseAdmin
    .from('portfolio_data')
    .select('content')
    .eq('id', 'hero')
    .single();

  if (error || !data) {
    await supabaseAdmin.from('portfolio_data').upsert({ id: 'hero', content: DEFAULT_HERO });
    return DEFAULT_HERO;
  }

  return data.content as HeroData;
}

export async function GET() {
  try {
    const hero = await getHero();
    return NextResponse.json(hero);
  } catch (error: any) {
    console.error('Error fetching hero data:', error);
    return NextResponse.json(DEFAULT_HERO);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const supabaseAdmin = getAdminClient();
    const { error } = await supabaseAdmin
      .from('portfolio_data')
      .upsert({ id: 'hero', content: data });

    if (error) throw error;
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Error updating hero data:', error);
    return NextResponse.json({ 
      error: 'Failed to update hero data',
      details: error.message || 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  return POST(request);
}
