import { NextResponse } from 'next/server';
import { Certification } from '@/lib/types';

let certifications: Certification[] = [
  {
    id: "1",
    title: "Google Cloud Professional Data Engineer",
    issuer: "Google Cloud",
    date: "2025",
    desc: "Professional certification for designing and building data processing systems.",
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1200",
    link: "#"
  },
  {
    id: "2",
    title: "DeepLearning.AI TensorFlow Developer",
    issuer: "Coursera",
    date: "2024",
    desc: "Developer certification for building machine learning models using TensorFlow.",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
    link: "#"
  },
  {
    id: "3",
    title: "AWS Certified Machine Learning – Specialty",
    issuer: "Amazon Web Services",
    date: "2024",
    desc: "Specialty certification validating expertise in building, training, tuning, and deploying machine learning models on AWS.",
    img: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1200",
    link: "#"
  }
];

export async function GET() {
  return NextResponse.json(certifications);
}

export async function POST(request: Request) {
  const data = await request.json();
  const newCert: Certification = {
    ...data,
    id: Date.now().toString(),
  };
  certifications.push(newCert);
  return NextResponse.json(newCert, { status: 201 });
}

export async function PUT(request: Request) {
  const data = await request.json();
  const index = certifications.findIndex(c => c.id === data.id);
  if (index !== -1) {
    certifications[index] = { ...certifications[index], ...data };
    return NextResponse.json(certifications[index]);
  }
  return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (id) {
    certifications = certifications.filter(c => c.id !== id);
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'ID is required' }, { status: 400 });
}
