import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSmoothScroll } from "../lib/smooth-scroll";

gsap.registerPlugin(ScrollTrigger);

/* Official Brand Tool Icons */
const renderToolIcon = (name: string) => {
  const lower = name.toLowerCase().trim();

  // Python
  if (lower === "python") {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M11.9 1.5c-2.4 0-4.4.4-5.3 1-.9.6-1.3 1.6-1.3 2.8v2.1h6.7v.9H4.2C2.7 8.3 1.5 9.4 1 10.7c-.6 1.4-.6 3.1 0 5 .5 1.5 1.5 2.5 3 2.9.9.2 1.9.3 3 .3v-2.3c0-1.7 1.3-3.1 3-3.1h4.4c.9 0 1.6-.7 1.6-1.6V7.4c0-2.3-2.3-5.9-4.1-5.9zm-2.4 2c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1z" fill="#387eb8"/>
        <path d="M12.1 22.5c2.4 0 4.4-.4 5.3-1 .9-.6 1.3-1.6 1.3-2.8v-2.1H12v-.9h7.8c1.5 0 2.7-1.1 3.2-2.4.6-1.4.6-3.1 0-5-.5-1.5-1.5-2.5-3-2.9-.9-.2-1.9-.3-3-.3v2.3c0 1.7-1.3 3.1-3 3.1H9.6c-.9 0-1.6.7-1.6 1.6v4.5c0 2.3 2.3 5.9 4.1 5.9zm2.4-2c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="#ffe052"/>
      </svg>
    );
  }

  // LangChain / LangGraph
  if (lower.includes("langchain") || lower.includes("langgraph")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563eb" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17L12 22L22 17" stroke="#0f172a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12L12 17L22 12" stroke="#38bdf8" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    );
  }

  // FastAPI
  if (lower.includes("fastapi")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#059669">
        <path d="M12 2L3 13.5h7.5L9 22l11-12h-7.5L14 2H12z" />
      </svg>
    );
  }

  // RAG / Vector DB
  if (lower === "rag") {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
      </svg>
    );
  }

  // Agents
  if (lower.includes("agent")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="2.5" />
        <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2.5" />
      </svg>
    );
  }

  // OpenCV
  if (lower.includes("opencv")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="6" r="4" stroke="#e5483b" strokeWidth="2.5" />
        <circle cx="6" cy="16" r="4" stroke="#2563eb" strokeWidth="2.5" />
        <circle cx="18" cy="16" r="4" stroke="#16a34a" strokeWidth="2.5" />
      </svg>
    );
  }

  // PyTorch
  if (lower.includes("pytorch")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#ee4c2c">
        <path d="M13.5 2.5a6 6 0 0 0-4.24 1.76L6.5 7 5 8.5a6 6 0 0 0 0 8.49 6 6 0 0 0 8.49 0l5-5-2-2-4.5 4.5a3.18 3.18 0 0 1-4.49-4.49l4.5-4.5A3 3 0 0 1 13.5 2.5z" />
        <circle cx="16" cy="5" r="1.5" />
      </svg>
    );
  }

  // Celery
  if (lower.includes("celery")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#37814a">
        <circle cx="12" cy="12" r="9" fill="#c6f6d5" />
        <path d="M12 6v12M8 10l8 4M8 14l8-4" stroke="#22543d" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // PostgreSQL
  if (lower.includes("postgres")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#336791">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16.93V17h-2v1.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v-1.07zm6.79-5.93c-.42 1.4-1.27 2.6-2.4 3.44l-.79-.79V14c0-.55-.45-1-1-1h-1v-2c0-.55-.45-1-1-1h-2V8h2c.55 0 1-.45 1-1V5.5l1.5 1.5c1.46 1.46 2.37 3.42 2.69 5.07z"/>
      </svg>
    );
  }

  // Django
  if (lower.includes("django")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#092e20">
        <rect width="24" height="24" rx="4" />
        <text x="5" y="17" fill="#fff" fontSize="13" fontWeight="bold" fontFamily="sans-serif">dj</text>
      </svg>
    );
  }

  // Docker
  if (lower.includes("docker")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#2496ed">
        <path d="M13 8h2v2h-2V8zm-3 0h2v2h-2V8zm-3 0h2v2H7V8zm6-3h2v2h-2V5zm-3 0h2v2h-2V5zm9 5c-.3-1.8-1.5-2.2-2.2-2.2-.4 0-.8.1-1.1.2V7c0-.6-.4-1-1-1h-6v2h2v2h-2v2h12.5c.3-.7.5-1.4.5-2zm-18 2.5C2 17.2 6.5 21 12 21c6 0 10.3-4.5 10.5-9.5H1.6c.1.4.2.7.4 1z" />
      </svg>
    );
  }

  // AWS
  if (lower.includes("aws")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#f59e0b">
        <path d="M7.5 13.5c-1.5 0-2.5-.8-2.5-2.2 0-1.8 1.4-2.5 3.5-2.5h1.5v1.2H8.6c-1.2 0-1.8.3-1.8 1.2 0 .7.5 1.1 1.4 1.1.9 0 1.5-.5 1.8-1.1v2.3zm8.5 0c-1.5 0-2.5-.8-2.5-2.2 0-1.8 1.4-2.5 3.5-2.5h1.5v1.2h-1.4c-1.2 0-1.8.3-1.8 1.2 0 .7.5 1.1 1.4 1.1.9 0 1.5-.5 1.8-1.1v2.3z" />
        <path d="M5 18c6 3.5 12 2 15-1.5" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  // Linux
  if (lower.includes("linux")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#0f172a">
        <path d="M12 2C9.5 2 8 4 8 7v4c-1.5 1-2 3-2 5 0 2.5 1.5 4 4 4h8c2.5 0 4-1.5 4-4 0-2-.5-4-2-5V7c0-3-1.5-5-4-5zm-1.5 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
      </svg>
    );
  }

  // React
  if (lower.includes("react")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1.8" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" stroke="#0ea5e9" strokeWidth="1.8" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="1.8" fill="#0ea5e9" />
      </svg>
    );
  }

  // Next.js
  if (lower.includes("next")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#000">
        <circle cx="12" cy="12" r="11" fill="#000" />
        <path d="M15.5 16.5l-6-8.5h-1.5v8.5h1.5v-6l5.5 7.8c.2-.2.4-.5.5-.8z" fill="#fff" />
        <path d="M14.5 8h1.5v5.5h-1.5z" fill="#fff" />
      </svg>
    );
  }

  // TypeScript
  if (lower.includes("typescript")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#3178c6">
        <rect width="24" height="24" rx="4" />
        <text x="3" y="17" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">TS</text>
      </svg>
    );
  }

  // MongoDB
  if (lower.includes("mongo")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#47a248">
        <path d="M12 2C11.5 4 6 8.5 6 13.5c0 4 2.8 7.5 6 8.5 3.2-1 6-4.5 6-8.5C18 8.5 12.5 4 12 2z" />
        <path d="M12 2v20c-.2 0-.3 0-.5-.1" stroke="#fff" strokeWidth="1" />
      </svg>
    );
  }

  // Tailwind CSS
  if (lower.includes("tailwind")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#38bdf8">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.335 6.182 14.974 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.335 13.382 8.974 12 6.001 12z" />
      </svg>
    );
  }

  // Java
  if (lower === "java") {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#e76f00">
        <path d="M8.8 18.5c2.7.2 5.5-.1 7.2-1.2.5-.3.8-.7.7-1.1-.3-.6-1.5-.7-2.3-.7-1 0-2.1.2-3.1.4-1.2.2-2.7.4-3.6.8-.7.3-.6.6 1.1.8zm-1.2 2c3.2.2 6.7-.1 8.8-1.4.6-.4 1-.9.8-1.4-.4-.8-1.9-.9-3-.9-1.3 0-2.6.2-3.8.5-1.4.3-3.3.5-4.4 1-.8.4-.7.8 1.6 1.2zm8-6.5c.3-.6-.1-1.3-.8-1.8-1.1-.7-2.6-.9-3.9-1-1.4-.1-2.9 0-4.1.3-.9.2-1.5.5-1.5.9 0 .4.5.7 1.3.9 1.3.3 2.9.4 4.4.4 1.8.1 3.7-.1 4.6-.7z"/>
      </svg>
    );
  }

  // Spring Boot
  if (lower.includes("spring")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#6db33f">
        <path d="M21.5 10.2L13.8 2.5c-1-1-2.6-1-3.6 0L2.5 10.2c-1 1-1 2.6 0 3.6l7.7 7.7c1 1 2.6 1 3.6 0l7.7-7.7c1-1 1-2.6 0-3.6zm-8.8 7.3c-3 1.2-5.5-.3-5.2-3.5.2-1.8 1.4-3.8 3.2-5.1 2-1.5 4.5-2.2 5.8-1.9 1.2.3.8 2.2-.4 3.7-1.4 1.7-2.4 2.8-2.6 3.7-.3 1.2.4 1.8 1.5 1.4.9-.3 1.7-.9 2.4-1.6l.7.7c-1.3 1.4-3.3 2.1-5.4 2.6z"/>
      </svg>
    );
  }

  // MySQL
  if (lower.includes("mysql")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#00758f">
        <path d="M12.1 4.5c-2.4 0-4.2 1.3-4.8 3.5-.4 1.5-.2 3.4.6 4.8.8 1.3 2.2 2.2 3.7 2.4.4 0 .7.1 1.1.1 1.6 0 3.1-.7 4.1-1.8l-1.3-1.1c-.7.8-1.7 1.3-2.8 1.3-.9 0-1.8-.4-2.4-1.1-.6-.7-.8-1.7-.7-2.6.2-1.4 1.3-2.4 2.6-2.4.9 0 1.6.4 2.1 1.1l1.4-1c-.9-1.2-2.1-1.8-3.6-1.8z"/>
      </svg>
    );
  }

  // Git
  if (lower === "git") {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#f05032">
        <path d="M21.7 11.3l-9-9c-.4-.4-1-.4-1.4 0L9.1 4.5l2.4 2.4c.5-.2 1.1-.1 1.5.3.4.4.5 1 .3 1.5l2.3 2.3c.5-.2 1.1-.1 1.5.3.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.4-.4-.5-1-.3-1.5l-2.1-2.1v4.8c.2.1.3.3.4.5.6.6.6 1.5 0 2.1-.6.6-1.5.6-2.1 0-.6-.6-.6-1.5 0-2.1.2-.2.4-.4.6-.5V8.6c-.2-.1-.4-.3-.6-.5-.4-.4-.5-1-.3-1.5L6.9 4.2 2.3 8.8c-.4.4-.4 1 0 1.4l9 9c.4.4 1 .4 1.4 0l9-9c.4-.4.4-1 0-1.4z"/>
      </svg>
    );
  }

  // n8n
  if (lower.includes("n8n")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#ea4b71">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="7" r="3" />
        <circle cx="18" cy="17" r="3" />
        <path d="M6 12h12M12 12V7h6M12 12v5h6" stroke="#ea4b71" strokeWidth="2" />
      </svg>
    );
  }

  // WhatsApp
  if (lower.includes("whatsapp")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#25d366">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2z"/>
      </svg>
    );
  }

  // LLM / AI
  if (lower.includes("llm") || lower.includes("machine learning")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
      </svg>
    );
  }

  // Cloud / IBM Cloud
  if (lower.includes("cloud") || lower.includes("ibm")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#0f62fe">
        <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
      </svg>
    );
  }

  // HTML / CSS / JS / Frontend
  if (lower.includes("html") || lower.includes("css") || lower.includes("javascript") || lower.includes("frontend")) {
    return (
      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#f7df1e">
        <rect width="24" height="24" rx="4" fill="#f7df1e" />
        <text x="5" y="17" fill="#000" fontSize="12" fontWeight="bold">JS</text>
      </svg>
    );
  }

  // Fallback
  return (
    <svg className="w-3.5 h-3.5 shrink-0 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
};

/* Job definitions */
const JOBS = [
  {
    y: "Dec 2025",
    role: "Grand Finale Finalist — Full-Stack & AI Lead",
    co: "Smart India Hackathon (SIH) 2025 · Ministry of Education",
    tag: "HealthMate WhatsApp AI Bot · Python & n8n",
    imageSrc: "/experience/exp_card_1.png",
    badgeColor: "bg-blue-600",
    d: "Engineered HealthMate, an automated conversational healthcare assistant leveraging Python backends, REST APIs, and LLM orchestrations to manage real-time patient symptom triage and critical alerts.",
    t: ["Python", "n8n", "WhatsApp API", "LLMs", "REST APIs"],
    github: "https://github.com/YASVANTHKUMAR23/HEALTHMATE",
  },
  {
    y: "Jan 2026 — Feb 2026",
    role: "Machine Learning & Cloud Intern",
    co: "Microsoft Elevate · AICTE",
    tag: "98%+ SVM Classifier & Cloud Deployment",
    imageSrc: "/experience/exp_card_2.png",
    badgeColor: "bg-amber-500",
    d: "Engineered high-accuracy machine learning pipelines and interactive visualization dashboards for a 98%+ accurate Support Vector Machine (SVM) digit classifier. Deployed scalable AI model inference endpoints on cloud infrastructure.",
    t: ["Python", "SVM", "IBM Cloud", "Machine Learning"],
    github: "https://github.com/YASVANTHKUMAR23/AICTE_MICROSOFT_INTERSHIP_YASVANTHKUMAR_N",
  },
  {
    y: "Oct 2025 — Nov 2025",
    role: "Major Project Developer & Python Intern",
    co: "VOIS & Vodafone Idea Foundation · AICTE",
    tag: "Major Project · Python & Enterprise Automation",
    imageSrc: "/experience/exp_card_3.png",
    badgeColor: "bg-red-500",
    d: "Completed major technical project under the VOIS & Vodafone Idea Foundation AICTE initiative. Built scalable Python automation modules and data-driven backend systems focusing on secure data transmission and robust error handling.",
    t: ["Python", "Backend Architecture", "REST APIs", "Git"],
    github: "https://github.com/YASVANTHKUMAR23/VOIS_AICTE_Oct2025_MajorProject_YASVANTH_KUMAR_N",
  },
  {
    y: "Jul 2025 — Aug 2025",
    role: "AI Skills & Web Development Intern",
    co: "IBM Skill Build · AICTE",
    tag: "College Admission Agent & Full-Stack Portals",
    imageSrc: "/experience/exp_card_4.png",
    badgeColor: "bg-emerald-500",
    d: "Completed intensive full-stack development internship focusing on production web fundamentals. Built interactive portals and automated inquiry workflows to streamline candidate data management.",
    t: ["JavaScript", "HTML5", "CSS3", "Python", "Frontend Workflows"],
    github: "https://github.com/YASVANTHKUMAR23/IBM-internship-Projects",
  },
];

const words = (s: string) => s.split(" ").map((w, i) => (
  <span className="xp-wm" key={i}><span className="xp-w">{w}&nbsp;</span></span>
));

export default function ExperienceSection() {
  const root = useRef<HTMLElement | null>(null);
  const wrap = useRef<HTMLDivElement | null>(null);
  const base = useRef<SVGPathElement | null>(null);
  const maskP = useRef<SVGPathElement | null>(null);
  const head = useRef<SVGCircleElement | null>(null);
  const [d, setD] = useState("");
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string; tag: string } | null>(null);
  const { lenis } = useSmoothScroll();

  // Sync GSAP ScrollTrigger seamlessly with Lenis smooth scroll
  useEffect(() => {
    if (!lenis) return;
    const handleLenisScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleLenisScroll);
    return () => {
      lenis.off("scroll", handleLenisScroll);
    };
  }, [lenis]);

  /* ---- build the dotted path through every timeline dot ---- */
  const build = () => {
    const w = wrap.current; if (!w) return;
    const box = w.getBoundingClientRect();
    if (box.width < 900) return setD("");
    const pts = [...w.querySelectorAll<HTMLElement>(".xp-dot")].map((el) => {
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
    });
    if (pts.length === 0) return setD("");
    const start = { x: box.width / 2 - 6, y: -64 };
    const last = pts[pts.length - 1];
    const end = { x: last.x - 4, y: box.height - 70 };
    const all = [start, ...pts, end];
    let s = `M ${start.x} ${start.y}`;
    for (let i = 1; i < all.length; i++) {
      const a = all[i - 1], b = all[i], dy = b.y - a.y;
      s += ` C ${a.x} ${a.y + dy * 0.55}, ${b.x} ${b.y - dy * 0.45}, ${b.x} ${b.y}`;
    }
    setD(s);
  };

  useLayoutEffect(() => {
    build();
    const ro = new ResizeObserver(() => {
      build();
      ScrollTrigger.refresh();
    });
    if (wrap.current) ro.observe(wrap.current);
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(build);
    }
    return () => ro.disconnect();
  }, []);

  /* ---- line-following animation ---- */
  useEffect(() => {
    if (!d || !base.current || !maskP.current || !head.current) return;
    const len = base.current.getTotalLength();
    const mp = maskP.current;
    mp.style.strokeDasharray = `${len}`;
    const reduce = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    mp.style.strokeDashoffset = reduce ? "0" : `${len}`;
    if (reduce) { head.current.style.display = "none"; return; }
    const o = { p: 0 };
    const tw = gsap.to(o, {
      p: 1, ease: "none",
      scrollTrigger: { trigger: wrap.current, start: "top 80%", end: "bottom 82%", scrub: 0.6 },
      onUpdate: () => {
        if (!maskP.current || !base.current || !head.current) return;
        maskP.current.style.strokeDashoffset = `${len * (1 - o.p)}`;
        const pt = base.current.getPointAtLength(len * o.p);
        head.current.setAttribute("cx", `${pt.x}`);
        head.current.setAttribute("cy", `${pt.y}`);
        head.current.style.opacity = o.p > 0.005 && o.p < 0.995 ? "1" : "0";
      },
    });
    return () => { tw.scrollTrigger?.kill(); tw.kill(); };
  }, [d]);

  /* ---- Choreographed Keyframes: Past Div Exact Animation, 1-2-3 Step Lines & Card Sequence ---- */
  useEffect(() => {
    if (!root.current) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Header text entrance
      gsap.from(".xp-w", { yPercent: 110, duration: 0.85, stagger: 0.06, ease: "power3.out" });
      gsap.from(".xp-eye, .xp-sub", { opacity: 0, y: 14, duration: 0.75, delay: 0.3, stagger: 0.08 });

      // Rows choreography: Image and Card appear smoothly at START of scroll
      gsap.utils.toArray<HTMLElement>(".xp-row").forEach((row, i) => {
        const q = gsap.utils.selector(row);
        const isRight = Boolean(i % 2);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: "top 95%", // Fires immediately at the start of scroll as row enters viewport
            toggleActions: "play none none reverse",
          },
        });

        const fromX = isRight ? 30 : -30;

        // 1. Image past div appears right at start of scroll with organic border morph
        tl.fromTo(
          q(".xp-img"),
          { opacity: 0, y: 24, scale: 0.94, force3D: true },
          { opacity: 1, y: 0, scale: 1, duration: 0.54, ease: "power2.out" }
        )
        // 2. Card appears alongside at the start of scroll (no delay!)
        .fromTo(
          q(".xp-card"),
          { opacity: 0, x: fromX, y: 14, force3D: true },
          { opacity: 1, x: 0, y: 0, duration: 0.56, ease: "power2.out" },
          "<0.06"
        )
        // 3. Step 1, 2, 3 text along with lines keyframe transition in parallel
        .fromTo(
          q(".xp-step-num-wrap"),
          { opacity: 0, scale: 0.75, y: -12, force3D: true },
          { opacity: 1, scale: 1, y: 0, duration: 0.38, ease: "back.out(1.8)" },
          "<0.04"
        )
        .fromTo(
          q(".xp-step-line"),
          { scaleY: 0, opacity: 0, transformOrigin: "top center", force3D: true },
          { scaleY: 1, opacity: 1, duration: 0.42, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          q(".xp-step-dot"),
          { scale: 0, opacity: 0, force3D: true },
          { scale: 1, opacity: 1, duration: 0.28, ease: "back.out(2)" },
          "-=0.18"
        )
        .fromTo(
          q(".xp-step-branch"),
          { scaleX: 0, opacity: 0, transformOrigin: isRight ? "right center" : "left center", force3D: true },
          { scaleX: 1, opacity: 1, duration: 0.32, ease: "power2.out" },
          "-=0.2"
        )
        // 4. Tool chips with authentic icons pop in as card settles
        .fromTo(
          q(".xp-chips li"),
          { opacity: 0, scale: 0.85, y: 6, force3D: true },
          { opacity: 1, scale: 1, y: 0, duration: 0.32, stagger: 0.03, ease: "back.out(1.8)" },
          "-=0.28"
        )
        // 5. Timeline dot illuminates
        .fromTo(
          q(".xp-dot"),
          { scale: 0.6, opacity: 0.7, force3D: true },
          { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2)" },
          "-=0.3"
        );
      });

      // Word-by-word animation for "Continuing the Journey…" with proper keyframes
      gsap.timeline({
        scrollTrigger: {
          trigger: ".xp-end",
          start: "top 92%",
          toggleActions: "play none none reverse",
        },
      }).fromTo(
        ".xp-end-word",
        { yPercent: 120, opacity: 0, rotate: 5, force3D: true },
        {
          yPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        }
      );
    }, root.current);

    return () => mm.revert();
  }, []);

  return (
    <section className="xp" id="experience" ref={root}>
      <style>{CSS}</style>

      <header className="xp-head">
        <p className="xp-eye">MY JOURNEY <i /></p>
        <h2 className="xp-h" aria-label="Experience & Milestones">
          <span aria-hidden>{words("Experience &")}<span className="xp-blue">{words("Milestones")}</span></span>
        </h2>
        <p className="xp-sub">A track record of building practical software products, contributing to real-world solutions, and continuously growing as an engineer.</p>
      </header>

      <div className="xp-wrap" ref={wrap}>
        <svg className="xp-svg" aria-hidden>
          <defs>
            <mask id="xp-m" maskUnits="userSpaceOnUse" x="-200" y="-200" width="3000" height="9000">
              <path ref={maskP} d={d} fill="none" stroke="#fff" strokeWidth="20" strokeLinecap="round" />
            </mask>
          </defs>
          <path ref={base} d={d} className="xp-path-base" />
          <path d={d} className="xp-path-on" mask="url(#xp-m)" />
          <circle ref={head} r="6" className="xp-head-dot" style={{ opacity: 0 }} />
        </svg>

        {JOBS.map((j, i) => (
          <article className={`xp-row ${i % 2 ? "is-r" : ""}`} key={j.role}>
            {/* Step Marker: 1, 2, 3 text along with lines with keyframe transition */}
            <div className="xp-step-marker" aria-label={`Step ${i + 1}`}>
              <div className="xp-step-num-wrap">
                <span className="xp-step-badge">
                  <span className="xp-step-val">{String(i + 1).padStart(2, "0")}</span>
                </span>
                <span className="xp-step-lbl">MILESTONE</span>
              </div>
              <div className="xp-step-line-wrap">
                <span className="xp-step-line" />
                <span className="xp-step-dot" />
              </div>
              <span className="xp-step-branch" />
            </div>

            {/* Experience Card: Unified solid rendering to prevent half-drawn card lag */}
            <div className="xp-card">
              {/* Mobile Step Badge with line connector */}
              <div className="xp-mobile-step">
                <span className="xp-mobile-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="xp-mobile-line" />
                <span className="xp-mobile-tag">MILESTONE {i + 1}</span>
              </div>

              <div className="xp-meta">
                <span className="xp-date">{j.y}</span>
                <span className="xp-loc">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
                  Tamil Nadu, India
                </span>
              </div>
              <h3 className="xp-role">{j.role}</h3>
              <p className="xp-co">{j.co}</p>
              <p className="xp-desc">{j.d}</p>
              <ul className="xp-chips">
                {j.t.map((toolName) => (
                  <li key={toolName}>
                    <span className="xp-chip-icon">{renderToolIcon(toolName)}</span>
                    <span>{toolName}</span>
                  </li>
                ))}
              </ul>

              {j.github && (
                <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={j.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#2563eb] hover:underline"
                  >
                    <span>View Official Repository</span>
                    <span className="text-xs">↗</span>
                  </a>
                </div>
              )}
            </div>

            {/* Timeline dot (size strictly unchanged at 16px) */}
            <span className="xp-dot" />

            {/* Non-text [image] figure & div: crisp container with click-to-enlarge preview */}
            <figure className="xp-img">
              <div
                className="xp-clip cursor-pointer group"
                onClick={() => setPreviewImage({ src: j.imageSrc, title: `${j.role} · ${j.co}`, tag: j.tag })}
                title="Click to view full milestone card"
              >
                <img
                  src={j.imageSrc}
                  alt={`${j.role} Architecture & System Illustration`}
                  className="xp-custom-img"
                  loading="lazy"
                />
                <div className="xp-badge-chip">
                  <span className={`xp-badge-dot ${j.badgeColor}`} />
                  <span>{j.tag}</span>
                  <span className="text-[10px] text-blue-600 font-bold ml-1 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
                </div>
              </div>
            </figure>
          </article>
        ))}

        {/* Continuing the Journey - Animated Word by Word */}
        <p className="xp-end">
          {["Continuing", "the", "Journey…"].map((w, idx) => (
            <span key={idx} className="xp-end-word-wrap">
              <span className="xp-end-word">{w}&nbsp;</span>
            </span>
          ))}
        </p>
      </div>

      {/* Interactive Milestone Card Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-[10000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-2xl sm:rounded-3xl max-w-3xl w-full p-3.5 sm:p-6 shadow-2xl border border-slate-200 relative my-auto max-h-[92vh] flex flex-col animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2.5 sm:pb-3 mb-2.5 sm:mb-3 border-b border-slate-100 shrink-0">
              <div className="pr-4">
                <h4 className="text-sm sm:text-lg font-bold text-[#0a0f1c] line-clamp-1 sm:line-clamp-none">{previewImage.title}</h4>
                <p className="text-[11px] sm:text-xs text-[#2563eb] font-semibold mt-0.5 line-clamp-1 sm:line-clamp-none">{previewImage.tag}</p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                className="p-1 sm:p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer shrink-0"
                aria-label="Close preview"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="w-full max-h-[60vh] sm:max-h-[70vh] flex items-center justify-center bg-slate-50/70 rounded-xl sm:rounded-2xl p-1.5 sm:p-4 overflow-hidden border border-slate-100">
              <img
                src={previewImage.src}
                alt={previewImage.title}
                className="max-h-[56vh] sm:max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export const Experience = ExperienceSection;

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Caveat:wght@500;700&display=swap');
.xp{--blue:#2563eb;--ink:#0f172a;--mute:#64748b;--line:#e4e9f7;
  font-family:'Plus Jakarta Sans',Inter,system-ui,sans-serif;color:var(--ink);
  background:#f8faff radial-gradient(circle,#dbe3f7 1px,transparent 1.4px) 0 0/26px 26px;
  padding:110px 24px 90px;overflow:hidden;position:relative}
.xp *{box-sizing:border-box}
.xp-head{text-align:center;max-width:760px;margin:0 auto 96px}
.xp-eye{display:inline-flex;align-items:center;gap:12px;font-size:12px;font-weight:600;letter-spacing:.2em;color:#475569;margin:0 0 18px}
.xp-eye i{width:34px;height:2px;background:var(--blue);border-radius:2px}
.xp-h{margin:0;font-size:clamp(40px,6vw,60px);line-height:1.08;font-weight:800;letter-spacing:-.035em}
.xp-wm{display:inline-block;overflow:hidden;vertical-align:top;padding-bottom:.08em}
.xp-w{display:inline-block}
.xp-blue{color:var(--blue)}
.xp-sub{margin:20px auto 0;max-width:560px;font-size:17px;line-height:1.65;color:var(--mute)}

.xp-wrap{position:relative;max-width:1240px;margin:0 auto;padding-bottom:130px}
.xp-svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;z-index:0}

/* Increased line stroke width only (from 3.5px to 5.5px) — dot size strictly unchanged */
.xp-path-base,.xp-path-on{fill:none;stroke-width:5.5px;stroke-linecap:round;stroke-dasharray:8 11}
.xp-path-base{stroke:#cbd5e1;opacity:.8}
.xp-path-on{stroke:var(--blue)}
.xp-head-dot{fill:var(--blue);filter:drop-shadow(0 0 8px rgba(37,99,235,.75))}

.xp-row{position:relative;z-index:1;display:grid;grid-template-columns:1fr 1fr;column-gap:96px;align-items:center;margin-bottom:60px;min-height:300px}
.xp-card{order:1;justify-self:end;width:100%;max-width:580px;background:#fff;border-radius:22px;padding:32px 34px 30px;
  border:1px solid var(--line);
  box-shadow:0 1px 2px rgba(15,23,42,.04),0 14px 34px -14px rgba(37,99,235,.15),0 34px 70px -34px rgba(30,64,175,.18),inset 0 1px 0 #fff;
  will-change:transform,opacity;transform:translate3d(0,0,0);backface-visibility:hidden;position:relative}
.xp-img{order:2;justify-self:start;width:100%;max-width:480px;height:300px;margin:0;
  filter:drop-shadow(0 20px 30px rgba(59,91,219,.16)) drop-shadow(0 4px 10px rgba(59,91,219,.06));
  will-change:transform,opacity;transform:translate3d(0,0,0);backface-visibility:hidden}
.xp-row.is-r .xp-card{order:2;justify-self:start}
.xp-row.is-r .xp-img{order:1;justify-self:end}

/* Image panel container: Crisp white container with subtle border and elevation */
.xp-clip{position:relative;width:100%;height:100%;overflow:hidden;
  border-radius:26px;
  background:#ffffff;
  border:2px solid #e2e8f0;
  box-shadow:0 14px 34px -14px rgba(37,99,235,.15),0 4px 14px rgba(15,23,42,.04);
  transition:border-color 0.3s ease,box-shadow 0.3s ease;
  will-change:transform;transform:translate3d(0,0,0);backface-visibility:hidden}
.xp-clip:hover{border-color:#93c5fd;box-shadow:0 20px 42px -10px rgba(37,99,235,.22)}

/* Authentic milestone image: sharp, crisp presentation with gentle hover scale */
.xp-custom-img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;padding:12px 16px 36px;
  filter:drop-shadow(0 4px 12px rgba(15,23,42,.06));
  transition:transform 0.5s cubic-bezier(0.16,1,0.3,1);will-change:transform;z-index:1}
.xp-clip:hover .xp-custom-img{transform:scale(1.03)}

.xp-badge-chip{position:absolute;bottom:14px;left:50%;transform:translateX(-50%);z-index:2;display:inline-flex;align-items:center;gap:7px;padding:5px 14px;border-radius:999px;
  background:rgba(255,255,255,.92);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.8);
  font-size:11.5px;font-weight:600;color:#1e293b;box-shadow:0 4px 14px rgba(37,99,235,.1);width:max-content;max-width:calc(100% - 28px)}
.xp-badge-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0}

.xp-meta{display:flex;justify-content:space-between;align-items:center;font-size:13px}
.xp-date{color:var(--blue);font-weight:700}
.xp-loc{display:inline-flex;gap:6px;align-items:center;color:#64748b;font-size:12px;font-weight:500}
.xp-role{margin:14px 0 4px;font-size:22px;font-weight:700;letter-spacing:-.02em;color:#0a0f1c}
.xp-co{margin:0;font-size:14px;color:var(--mute);font-weight:500}
.xp-desc{margin:16px 0 20px;font-size:14.5px;line-height:1.7;color:#475569}

/* Tool Chips with Authentic Brand Icons */
.xp-chips{display:flex;flex-wrap:wrap;gap:8px;margin:0;padding:0;list-style:none}
.xp-chips li{display:inline-flex;align-items:center;gap:7px;padding:5px 12px 5px 8px;border-radius:999px;font-size:12.5px;font-weight:600;
  color:#334155;background:#f8faff;border:1px solid #e2e8f0;box-shadow:0 2px 5px -1px rgba(15,23,42,.05);transition:all .2s ease;
  will-change:transform,opacity}
.xp-chips li:hover{border-color:#93c5fd;background:#fff;transform:translateY(-1px);box-shadow:0 4px 10px -2px rgba(37,99,235,.15)}
.xp-chip-icon{width:16px;height:16px;display:flex;align-items:center;justify-content:center;flex-shrink:0}

/* Dot unchanged (width/height strictly 16px) */
.xp-dot{position:absolute;top:50%;left:calc(50% + 40px);width:16px;height:16px;margin:-8px 0 0 -8px;border-radius:50%;background:var(--blue);
  box-shadow:0 0 0 5px #fff,0 0 0 6px rgba(37,99,235,.2),0 8px 16px rgba(37,99,235,.35);
  will-change:transform;transform:translate3d(0,0,0)}
.xp-row.is-r .xp-dot{left:calc(50% - 40px)}

/* Step 1, 2, 3 Text Along With Lines (Handled via Choreographed Keyframes) */
.xp-step-marker{position:absolute;top:10px;left:-68px;display:flex;flex-direction:column;align-items:center;z-index:2;pointer-events:none}
.xp-row.is-r .xp-step-marker{left:auto;right:-68px}
.xp-step-num-wrap{display:flex;flex-direction:column;align-items:center;gap:3px;will-change:transform,opacity;transform:translate3d(0,0,0)}
.xp-step-badge{display:flex;align-items:center;justify-content:center;width:48px;height:48px;border-radius:16px;
  background:#ffffff;border:1.5px solid #dbeafe;box-shadow:0 8px 20px -4px rgba(37,99,235,.18),0 2px 6px rgba(0,0,0,.04);
  position:relative}
.xp-step-val{font-size:24px;font-weight:800;letter-spacing:-.03em;
  background:linear-gradient(135deg,#0a0f1c 0%,#2563eb 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent}
.xp-step-lbl{font-size:9px;font-weight:800;letter-spacing:.18em;color:#94a3b8;text-transform:uppercase}
.xp-step-line-wrap{display:flex;flex-direction:column;align-items:center;margin-top:6px;position:relative}
.xp-step-line{width:2.5px;height:140px;background:linear-gradient(180deg,#2563eb 0%,#93c5fd 65%,rgba(147,197,253,0) 100%);
  border-radius:2px;will-change:transform,opacity;transform:translate3d(0,0,0)}
.xp-step-dot{width:7px;height:7px;border-radius:50%;background:#2563eb;margin-top:-3px;box-shadow:0 0 10px rgba(37,99,235,.7);
  will-change:transform,opacity;transform:translate3d(0,0,0)}
.xp-step-branch{position:absolute;top:24px;left:48px;width:24px;height:2px;background:linear-gradient(90deg,#93c5fd 0%,rgba(147,197,253,0) 100%);
  border-radius:1px;will-change:transform,opacity}
.xp-row.is-r .xp-step-branch{left:auto;right:48px;background:linear-gradient(270deg,#93c5fd 0%,rgba(147,197,253,0) 100%)}

/* Mobile Step Indicator inside card */
.xp-mobile-step{display:none}

/* Continuing the journey animated word-by-word text */
.xp-end{position:absolute;left:50%;bottom:20px;transform:translateX(-30%) rotate(-4deg);margin:0;font:600 24px 'Caveat',cursive;color:var(--blue)}
.xp-end-word-wrap{display:inline-block;overflow:hidden;vertical-align:bottom}
.xp-end-word{display:inline-block;will-change:transform,opacity;transform:translate3d(0,0,0)}

@media (max-width:899px){
  .xp-row{grid-template-columns:1fr;row-gap:22px;min-height:0;margin-bottom:56px}
  .xp-card,.xp-row.is-r .xp-card{order:1;justify-self:stretch;max-width:none}
  .xp-img,.xp-row.is-r .xp-img{order:2;justify-self:stretch;max-width:none;height:240px}
  .xp-step-marker,.xp-dot,.xp-svg,.xp-end{display:none}
  .xp-mobile-step{display:flex;align-items:center;gap:10px;margin-bottom:14px;padding-bottom:10px;border-bottom:1px solid #f1f5f9}
  .xp-mobile-num{display:inline-flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:10px;background:#eff6ff;color:#2563eb;font-size:15px;font-weight:800;border:1px solid #bfdbfe}
  .xp-mobile-line{flex:1;height:2px;background:linear-gradient(90deg,#93c5fd,rgba(147,197,253,0.1));border-radius:1px}
  .xp-mobile-tag{font-size:10px;font-weight:800;letter-spacing:.15em;color:#64748b;text-transform:uppercase}
}
@media (prefers-reduced-motion:reduce){.xp *{transition:none!important}}
`;
