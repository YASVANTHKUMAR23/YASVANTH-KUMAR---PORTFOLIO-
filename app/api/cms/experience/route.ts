import { NextResponse } from 'next/server';
import { Experience } from '@/lib/types';

// In-memory store for demo purposes
let experiences: Experience[] = [
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

export async function GET() {
  return NextResponse.json(experiences);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newExperience = { ...data, id: Date.now() };
  experiences.push(newExperience);
  return NextResponse.json(newExperience);
}

export async function PUT(request: Request) {
  const data = await request.json();
  experiences = experiences.map(exp => exp.id === data.id ? data : exp);
  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  experiences = experiences.filter(exp => exp.id !== id);
  return NextResponse.json({ success: true });
}
