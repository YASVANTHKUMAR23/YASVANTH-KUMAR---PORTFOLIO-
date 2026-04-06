import { NextResponse } from 'next/server';
import { FooterData } from '@/lib/types';

let footerData: FooterData = {
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

export async function GET() {
  return NextResponse.json(footerData);
}

export async function PUT(request: Request) {
  const data = await request.json();
  footerData = { ...footerData, ...data };
  return NextResponse.json(footerData);
}
