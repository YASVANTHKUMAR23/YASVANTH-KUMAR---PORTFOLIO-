import { NextResponse } from 'next/server';
import { FooterData } from '@/lib/types';
import { supabase } from '@/lib/supabase';

const DEFAULT_FOOTER: FooterData = {
  name: "YASVANTH KUMAR N",
  description: "Crafting intuitive, user-centered digital experiences that drive engagement and business value.",
  navLinks: [
    { label: "Home", href: "#" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Certifications", href: "#certificates" },
    { label: "Timeline", href: "#timeline" }
  ],
  socialLinks: [
    { label: "Twitter", url: "#" },
    { label: "LinkedIn", url: "#" },
    { label: "GitHub", url: "#" }
  ],
  copyright: "© 2026 YASVANTH KUMAR N. ALL RIGHTS RESERVED."
};

async function getFooter(): Promise<FooterData> {
  const { data, error } = await supabase
    .from('portfolio_data')
    .select('content')
    .eq('id', 'footer')
    .single();

  if (error || !data) {
    await supabase.from('portfolio_data').upsert({ id: 'footer', content: DEFAULT_FOOTER });
    return DEFAULT_FOOTER;
  }

  return data.content as FooterData;
}

export async function GET() {
  const footer = await getFooter();
  return NextResponse.json(footer);
}

export async function PUT(request: Request) {
  const footer = await getFooter();
  const data = await request.json();
  const updatedFooter = { ...footer, ...data };
  
  await supabase.from('portfolio_data').update({ content: updatedFooter }).eq('id', 'footer');
  
  return NextResponse.json(updatedFooter);
}
