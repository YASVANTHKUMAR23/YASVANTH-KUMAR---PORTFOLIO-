import React from 'react';
import { Bot, Sparkles, ScanText, ShieldCheck, Database, Cpu } from 'lucide-react';

interface TechToolPillProps {
  tool: string;
  className?: string;
}

export const TechToolPill: React.FC<TechToolPillProps> = ({ tool, className = '' }) => {
  const getToolIcon = (name: string) => {
    const lower = name.toLowerCase().trim();

    // Devicon CDN mapping
    const deviconMap: Record<string, string> = {
      python: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      pytorch: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg',
      fastapi: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
      react: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      'next.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      nextjs: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
      postgresql: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
      docker: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      redis: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg',
      opencv: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg',
    };

    if (deviconMap[lower]) {
      return (
        <img
          src={deviconMap[lower]}
          alt={name}
          className="w-3.5 h-3.5 object-contain shrink-0"
          loading="lazy"
        />
      );
    }

    // Custom SVGs & Icons for AI & specialized stacks
    if (lower.includes('twilio')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#F22F46">
          <circle cx="12" cy="12" r="10" />
          <circle cx="9" cy="9" r="2" fill="#fff" />
          <circle cx="15" cy="9" r="2" fill="#fff" />
          <circle cx="9" cy="15" r="2" fill="#fff" />
          <circle cx="15" cy="15" r="2" fill="#fff" />
        </svg>
      );
    }

    if (lower.includes('stripe')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#635BFF">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.432 13.034.432 7.747.432 4.14 3.195 4.14 7.697c0 4.093 3.513 5.378 6.777 6.435 2.508.835 3.393 1.547 3.393 2.57 0 .979-.89 1.488-2.316 1.488-2.607 0-5.379-1.127-7.234-2.158l-.946 5.568c1.884.896 4.887 1.468 7.72 1.468 5.751 0 9.537-2.651 9.537-7.399 0-4.301-3.666-5.59-7.095-6.52" />
        </svg>
      );
    }

    if (lower.includes('razorpay')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#0C2340">
          <path d="M14.5 2L5 14h5.5l-2.5 8 9.5-12h-5.5z" fill="#025CFF" />
        </svg>
      );
    }

    if (lower.includes('rasa')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#6A1B9A">
          <circle cx="12" cy="12" r="10" fill="#E1BEE7" />
          <path d="M7 10h10M9 14h6" stroke="#4A148C" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    if (lower.includes('celery')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#37814A">
          <circle cx="12" cy="12" r="9" fill="#B7E1CD" />
          <path d="M12 6v12M8 10l8 4M8 14l8-4" stroke="#0F9D58" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    }

    if (lower.includes('tensorrt')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#76B900">
          <path d="M4 4h16v16H4z" fill="#1A1A1A" />
          <path d="M7 7h10v10H7z" fill="#76B900" />
        </svg>
      );
    }

    if (lower.includes('yolo')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#2563eb">
          <rect x="3" y="3" width="18" height="18" rx="3" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" strokeWidth="2" />
        </svg>
      );
    }

    if (lower.includes('n8n')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#EA4B71">
          <circle cx="6" cy="12" r="4" />
          <circle cx="18" cy="7" r="4" />
          <circle cx="18" cy="17" r="4" />
          <path d="M6 12h12M18 7v10" stroke="#EA4B71" strokeWidth="2" />
        </svg>
      );
    }

    if (lower.includes('langgraph') || lower.includes('langchain')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }

    if (lower.includes('chroma')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
          <circle cx="7" cy="12" r="5" fill="#FF5C5C" />
          <circle cx="17" cy="12" r="5" fill="#3B82F6" />
        </svg>
      );
    }

    if (lower.includes('qdrant')) {
      return (
        <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="#DC2626">
          <path d="M12 2l8 5v10l-8 5-8-5V7l8-5z" fill="#F87171" />
          <circle cx="12" cy="12" r="3" fill="#fff" />
        </svg>
      );
    }

    if (lower.includes('huggingface')) {
      return (
        <span className="text-xs leading-none shrink-0" role="img" aria-label="HuggingFace">
          🤗
        </span>
      );
    }

    if (lower.includes('rag')) {
      return <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />;
    }

    if (lower.includes('ocr')) {
      return <ScanText className="w-3.5 h-3.5 text-indigo-600 shrink-0" />;
    }

    if (lower.includes('agent')) {
      return <Bot className="w-3.5 h-3.5 text-purple-600 shrink-0" />;
    }

    if (lower.includes('llm') || lower.includes('ai')) {
      return <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />;
    }

    if (lower.includes('rbac')) {
      return <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />;
    }

    return <Cpu className="w-3.5 h-3.5 text-slate-500 shrink-0" />;
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200/80 text-slate-700 text-xs rounded-full font-medium transition-colors select-none ${className}`}
    >
      {getToolIcon(tool)}
      <span>{tool}</span>
    </span>
  );
};
export default TechToolPill;
