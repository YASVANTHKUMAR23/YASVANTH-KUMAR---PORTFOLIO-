import { NextResponse } from 'next/server';
import { Experience } from '@/lib/types';
import { supabase } from '@/lib/supabase';

const DEFAULT_EXPERIENCES: Experience[] = [
  {
    id: 1,
    title: "AI & Data Science Engineer",
    description: "Leading the development of Agentic AI solutions and LLM orchestration. Implemented automated ML classifiers and RAG pipelines.",
    icon: "Briefcase",
    isLeftNode: true,
    date: "2025 - Present",
    location: "Tech Innovations Inc."
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    description: "Developed WhatsApp health bots and predictive models for patient care. SIH Grand Finalist for healthcare automation.",
    icon: "Code",
    isLeftNode: false,
    date: "2023 - 2025",
    location: "HealthTech Solutions"
  },
  {
    id: 3,
    title: "Data Scientist",
    description: "Built and deployed scalable machine learning models. Optimized data pipelines reducing processing time by 40%.",
    icon: "Star",
    isLeftNode: true,
    date: "2021 - 2023",
    location: "DataCorp"
  }
];

async function getExperiences(): Promise<Experience[]> {
  const { data, error } = await supabase
    .from('portfolio_data')
    .select('content')
    .eq('id', 'experience')
    .single();

  if (error || !data) {
    await supabase.from('portfolio_data').upsert({ id: 'experience', content: DEFAULT_EXPERIENCES });
    return DEFAULT_EXPERIENCES;
  }

  return data.content as Experience[];
}

export async function GET() {
  const experiences = await getExperiences();
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const experiences = await getExperiences();
  const data = await request.json();
  const newExperience = { ...data, id: Date.now() };
  
  const updatedExperiences = [...experiences, newExperience];
  await supabase.from('portfolio_data').update({ content: updatedExperiences }).eq('id', 'experience');
  
  return NextResponse.json(newExperience);
}

export async function PUT(request: Request) {
  const experiences = await getExperiences();
  const data = await request.json();
  
  const updatedExperiences = experiences.map(exp => exp.id === data.id ? data : exp);
  await supabase.from('portfolio_data').update({ content: updatedExperiences }).eq('id', 'experience');
  
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const experiences = await getExperiences();
  const { searchParams } = new URL(request.url);
  const idStr = searchParams.get('id');
  const id = idStr ? parseInt(idStr) : null;
  
  if (id !== null) {
    const updatedExperiences = experiences.filter(exp => exp.id !== id);
    await supabase.from('portfolio_data').update({ content: updatedExperiences }).eq('id', 'experience');
    return NextResponse.json({ success: true });
  }
  
  return NextResponse.json({ error: 'ID is required' }, { status: 400 });
}
