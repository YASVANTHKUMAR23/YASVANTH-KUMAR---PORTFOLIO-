import { NextResponse } from 'next/server';
import { Project } from '@/lib/types';
import { supabase } from '@/lib/supabase';

const DEFAULT_PROJECTS: Project[] = [
  {
    id: "1",
    folderLabel: "E-Commerce",
    title: "E-Commerce Platform",
    description: "A full-stack e-commerce platform built with Next.js, Stripe, and Tailwind CSS.",
    tag: "Web App",
    date: "2023",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=1000&auto=format&fit=crop",
    tech: ["Next.js", "Stripe", "Tailwind CSS"],
    github: "https://github.com",
    demo: "https://demo.com"
  },
  {
    id: "2",
    folderLabel: "Portfolio",
    title: "Personal Portfolio",
    description: "A creative portfolio website with smooth animations and 3D effects.",
    tag: "Website",
    date: "2024",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
    tech: ["React", "Framer Motion", "Three.js"],
    github: "https://github.com"
  }
];

async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('portfolio_data')
    .select('content')
    .eq('id', 'projects')
    .single();

  if (error || !data) {
    // If not found, initialize with defaults
    await supabase.from('portfolio_data').upsert({ id: 'projects', content: DEFAULT_PROJECTS });
    return DEFAULT_PROJECTS;
  }

  return data.content as Project[];
}

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: Request) {
  const projects = await getProjects();
  const data = await request.json();
  const newProject: Project = {
    ...data,
    id: Date.now().toString(),
  };
  
  const updatedProjects = [...projects, newProject];
  await supabase.from('portfolio_data').update({ content: updatedProjects }).eq('id', 'projects');
  
  return NextResponse.json(newProject, { status: 201 });
}

export async function PUT(request: Request) {
  const projects = await getProjects();
  const data = await request.json();
  const index = projects.findIndex(p => p.id === data.id);
  
  if (index !== -1) {
    projects[index] = { ...projects[index], ...data };
    await supabase.from('portfolio_data').update({ content: projects }).eq('id', 'projects');
    return NextResponse.json(projects[index]);
  }
  
  return NextResponse.json({ error: 'Project not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const projects = await getProjects();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (id) {
    const updatedProjects = projects.filter(p => p.id !== id);
    await supabase.from('portfolio_data').update({ content: updatedProjects }).eq('id', 'projects');
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'ID is required' }, { status: 400 });
}
