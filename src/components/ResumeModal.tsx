import React, { useState, useEffect } from 'react';
import { X, Download, Printer, Copy, Check, FileText, ExternalLink, MapPin, Mail, Github } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = () => {
    const summary = `
YASVANTH KUMAR N
Python & Full-Stack AI Engineer
Location: Mutharasanallur, Tiruchirapalli - 620101, Tamil Nadu, India
Phone: +91 9750839996
Email: yasvanthkumar2306@gmail.com
GitHub: https://github.com/YASVANTHKUMAR23
LinkedIn: https://www.linkedin.com/in/yasvanth-kumar23/

SUMMARY:
AI & Data Science Engineer specializing in Agentic AI and LLM Orchestration. Expert in Python, n8n, and RAG, delivering real-world solutions like WhatsApp health bots and automated tasks. SIH Grand Finalist with a focus on high-impact healthcare automation and industrial-grade Gen AI implementation.

CORE SKILLS:
- Languages: Python (Advanced), Java (NPTEL Silver Medalist), JavaScript, TypeScript, SQL
- Full-Stack: React.js, Next.js, HTML5, CSS3, Tailwind CSS, REST APIs
- AI & ML: Agentic AI, LangGraph, RAG (ChromaDB, PubMed), LLMs, Scikit-Learn, SVM
- Cloud & DevOps: Supabase, IBM Cloud, Microsoft Azure, Docker, Git, n8n Automation

EXPERIENCE:
- Smart India Hackathon (SIH) 2025 — Grand Finale Finalist | Backend & Automation Lead (HealthMate)
- VOIS & Vodafone Idea Foundation Internship [AICTE] — Major Project Developer & Python Intern
- Microsoft Elevate [AICTE] — Machine Learning & Cloud Intern (98%+ SVM Classifier)
- IBM Skill Build [AICTE] — AI Skills & Web Development Intern (College Admission Agent)

EDUCATION:
- B.Tech in Artificial Intelligence & Data Science (CGPA: 8.5) | Dhanalakshmi Srinivasan Engineering College (Autonomous), Perambalur
- Bishop Heber Hr Sec School, Tiruchirapalli (SSLC: 100% | HSC: 82.5%)
    `.trim();

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl border border-slate-200 relative my-8 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header Actions */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
            <FileText className="w-4 h-4 text-[#2563eb]" />
            <span>Curriculum Vitae Preview</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>

            <a
              href="/YASVANTH_RESUME.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="YASVANTH_RESUME.pdf"
              className="px-3.5 py-1.5 bg-[#0a0f1c] hover:bg-black text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Resume Body */}
        <div className="overflow-y-auto pt-6 pr-2 space-y-6 text-slate-700">
          {/* Resume Header */}
          <div className="border-b border-slate-200 pb-6">
            <h1 className="text-3xl font-extrabold text-[#0a0f1c] tracking-tight">Yasvanth Kumar N</h1>
            <p className="text-base font-semibold text-[#2563eb] mt-0.5">Python &amp; Full-Stack AI Engineer</p>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-3 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" /> Mutharasanallur, Tiruchirapalli - 620101
              </span>
              <span>·</span>
              <a href="mailto:yasvanthkumar2306@gmail.com" className="flex items-center gap-1 hover:text-[#2563eb]">
                <Mail className="w-3.5 h-3.5 text-slate-400" /> yasvanthkumar2306@gmail.com
              </a>
              <span>·</span>
              <a href="https://github.com/YASVANTHKUMAR23" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#2563eb]">
                <Github className="w-3.5 h-3.5 text-slate-400" /> GitHub
              </a>
              <span>·</span>
              <a href="https://www.linkedin.com/in/yasvanth-kumar23/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-[#2563eb]">
                LinkedIn
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Executive Summary</h2>
            <p className="text-sm leading-relaxed text-slate-600">
              AI &amp; Data Science Engineer specializing in Agentic AI and LLM Orchestration. Expert in Python, n8n, and RAG, delivering real-world solutions like WhatsApp health bots and automated tasks. Smart India Hackathon Grand Finalist with a focus on high-impact healthcare automation and industrial-grade Gen AI implementation.
            </p>
          </div>

          {/* Technical Skills */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Core Technical Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-[#0a0f1c] block mb-1">Python &amp; Backend (40%)</span>
                <p className="text-slate-600">Python (FastAPI, Flask, Scripting, Automation), Java (NPTEL Silver Medal), PostgreSQL, SQLite, Supabase</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-[#0a0f1c] block mb-1">Full-Stack Web (30%)</span>
                <p className="text-slate-600">JavaScript (ES6+), TypeScript, React.js, Next.js, HTML5, CSS3, Tailwind CSS, REST APIs</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-[#0a0f1c] block mb-1">Agentic &amp; Gen AI (30%)</span>
                <p className="text-slate-600">Agentic AI, LangGraph, RAG (ChromaDB, PubMed), LLM Orchestration, n8n, Scikit-Learn, Machine Learning</p>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="font-bold text-[#0a0f1c] block mb-1">Cloud &amp; DevOps</span>
                <p className="text-slate-600">Git &amp; GitHub, Docker, IBM Cloud, Microsoft Azure, AI Studio, Antigravity IDE, VS Code</p>
              </div>
            </div>
          </div>

          {/* Verified Experience */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">Experience &amp; Internships</h2>
            <div className="space-y-4 text-xs">
              <div className="border-l-2 border-[#2563eb] pl-3 py-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#0a0f1c]">Smart India Hackathon (SIH) 2025 — Grand Finale Finalist</span>
                  <span className="font-mono text-slate-400">Dec 2025</span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  Backend &amp; Automation Team Member for HealthMate. Built an AI-powered WhatsApp healthcare assistant using n8n, APIs, and LLMs with symptom guidance and caregiver notifications.
                </p>
              </div>

              <div className="border-l-2 border-slate-300 pl-3 py-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#0a0f1c]">VOIS &amp; Vodafone Idea Foundation [AICTE] — Major Project</span>
                  <span className="font-mono text-slate-400">Oct 2025 — Nov 2025</span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  Built scalable Python automation modules and data-driven backend systems focusing on secure data transmission and error recovery.
                </p>
              </div>

              <div className="border-l-2 border-slate-300 pl-3 py-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#0a0f1c]">Microsoft Elevate [AICTE] — Machine Learning &amp; Cloud Intern</span>
                  <span className="font-mono text-slate-400">Jan 2026 — Feb 2026</span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  Engineered a 98%+ accurate SVM digit classifier with end-to-end data pipeline, visualization dashboard, and cloud deployment.
                </p>
              </div>

              <div className="border-l-2 border-slate-300 pl-3 py-0.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#0a0f1c]">IBM Skill Build [AICTE] — AI Skills &amp; Web Development Intern</span>
                  <span className="font-mono text-slate-400">Jul 2025 — Aug 2025</span>
                </div>
                <p className="text-slate-600 mt-1 leading-relaxed">
                  Completed web development fundamentals internship and developed the College Admission Agent portal for candidate workflows.
                </p>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Education &amp; Accolades</h2>
            <div className="text-xs space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <div className="font-bold text-sm text-[#0a0f1c]">B.Tech – Artificial Intelligence &amp; Data Science (CGPA: 8.5)</div>
                <p className="text-slate-600">Dhanalakshmi Srinivasan Engineering College (Autonomous), Perambalur</p>
                <p className="text-slate-500 text-[11px] mt-0.5">Schooling: Bishop Heber Hr Sec School, Tiruchirapalli (SSLC: 100% | HSC: 82.5%)</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-700">
                <span className="font-bold text-[#0a0f1c] block mb-1">Key Certifications:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px]">
                  <li>Smart India Hackathon (SIH) 2025 — Grand Finale Finalist | Ministry of Education</li>
                  <li>NPTEL Certification in JAVA Programming (Silver Medalist)</li>
                  <li>NPTEL Certification in INTRO TO LLM</li>
                  <li>AICTE Learnathon Certification</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Official Profile of Yasvanth Kumar N</span>
          <a
            href="/YASVANTH_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="YASVANTH_RESUME.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#2563eb] text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Open &amp; Download PDF</span>
          </a>
        </div>
      </div>
    </div>
  );
};
