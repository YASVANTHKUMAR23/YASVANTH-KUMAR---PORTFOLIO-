import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, X, Sparkles, ExternalLink, Layers, CheckCircle2 } from 'lucide-react';
import { CircularTestimonials, Testimonial } from '@/components/ui/circular-testimonials';
import { BorderBeam } from '@/components/ui/border-beam';
import { TechToolPill } from './TechToolPill';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  githubUrl: string;
  demoUrl?: string;
  highlights: string[];
  image?: string;
}

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Top 3 Featured Projects configured for the CircularTestimonials 3D Carousel
  const featuredProjects: Testimonial[] = [
    {
      name: 'HealthMate',
      designation: 'WhatsApp AI Healthcare Assistant',
      quote: 'Zero-friction conversational healthcare assistant built on WhatsApp to democratize symptom triage, medication reminders, and caregiver escalation.',
      badge: 'Smart India Hackathon Finalist',
      src: '/projects/healthmate.png',
      tags: ['Python', 'n8n', 'WhatsApp API', 'LLMs', 'REST APIs'],
      features: [
        'Automated symptom triage with medical context guidance',
        'Multi-channel support (WhatsApp Business API & alerts)',
        'Caregiver notification system with automated event workflows',
        'Scalable and secure serverless architecture',
      ],
      githubUrl: 'https://github.com/YASVANTHKUMAR23/HEALTHMATE',
      projectUrl: 'https://github.com/YASVANTHKUMAR23/HEALTHMATE',
    },
    {
      name: 'SHOP.AI',
      designation: 'Multi-Agent E-Commerce Comparison Engine',
      quote: 'Production-grade multi-agent system with live A2UI streaming built for real-time, explainable product comparison and transparent user experiences.',
      badge: 'Featured Multi-Agent System',
      src: '/projects/shopai.png',
      tags: ['Python', 'FastAPI', 'React', 'Multi-Agent Architecture', 'WebSockets'],
      features: [
        'Multi-agent price and feature comparison engine',
        'Live A2UI streaming for transparent user reasoning',
        'Fast asynchronous FastAPI backend with WebSocket feeds',
        'Interactive modern frontend with responsive evaluation views',
      ],
      githubUrl: 'https://github.com/YASVANTHKUMAR23/THE-OFFICIAL-SHOP-AI',
      projectUrl: 'https://github.com/YASVANTHKUMAR23/THE-OFFICIAL-SHOP-AI',
    },
    {
      name: 'CuraBot',
      designation: 'Agentic AI Multi-Agent Healthcare System',
      quote: 'Autonomous multi-agent clinical healthcare system featuring specialized triage agents, PubMed hybrid RAG, and persistent patient memory.',
      badge: 'Agentic AI System',
      src: '/projects/curabot.png',
      tags: ['LangGraph', 'RAG (PubMed)', 'ChromaDB', 'Supabase', 'Python'],
      features: [
        'Multi-agent triage orchestration powered by LangGraph',
        'Hybrid RAG retrieval grounded in PubMed research papers',
        'Long-term patient session memory and health records on Supabase',
        'Automated clinical escalation protocols for critical conditions',
      ],
      githubUrl: 'https://github.com/YASVANTHKUMAR23/CuraBot',
      projectUrl: 'https://github.com/YASVANTHKUMAR23/CuraBot',
    },
  ];

  // 6 Other Projects in the clean responsive grid
  const otherProjects: ProjectItem[] = [
    {
      id: 'gm-motors',
      title: 'GM-MOTORS Automotive Portal',
      category: 'Automotive & Full-Stack Web',
      description: 'Modern automotive portal showcasing vehicle inventory, specifications, and interactive booking inquiry workflows.',
      longDescription: 'Engineered a full-featured vehicle showcase and dealership portal. Features responsive vehicle specification comparisons, interactive test drive booking flows, dynamic inventory filtering, and an optimized customer inquiry routing engine.',
      tags: ['JavaScript', 'React', 'Next.js', 'Tailwind CSS'],
      metrics: 'Sub-1.5s load times · 100% responsive UI',
      githubUrl: 'https://github.com/YASVANTHKUMAR23',
      highlights: [
        'Dynamic vehicle comparison matrix with technical specifications',
        'Interactive test-drive reservation workflow with automated confirmations',
        'High-performance responsive layouts built with Tailwind CSS',
      ],
    },
    {
      id: 'powerfit',
      title: 'Powerfit Fitness Tracking Platform',
      category: 'Fitness & Health Tech',
      description: 'Comprehensive fitness tracking and workout analytics platform with dynamic routine planners and performance metrics.',
      longDescription: 'Full-stack health and fitness tracking web application. Enables personalized workout routine building, progress metric logging, calorie expenditure estimation, and goal-tracking visualizations with client-side state caching.',
      tags: ['Next.js', 'Tailwind CSS', 'State Management', 'React'],
      metrics: 'Full offline-first caching · Dynamic workout planner',
      githubUrl: 'https://github.com/YASVANTHKUMAR23',
      highlights: [
        'Personalized routine creation with exercise set and rep logging',
        'Dynamic weekly progression charts and calorie expenditure metrics',
        'Clean modern dark-accented fitness user interface',
      ],
    },
    {
      id: 'digit-recognizer',
      title: 'Microsoft AICTE Digit Recognizer',
      category: 'Machine Learning & Cloud',
      description: '98%+ accurate SVM digit classifier with end-to-end data pipeline, visualization dashboard, and cloud deployment.',
      longDescription: 'Developed during the Microsoft Elevate AICTE internship. Built a 98%+ accurate Support Vector Machine (SVM) classification model trained on digit image arrays, accompanied by an interactive drawing/prediction dashboard and cloud deployment.',
      tags: ['Python', 'SVM', 'Scikit-Learn', 'IBM Cloud'],
      metrics: '98%+ model accuracy · Live cloud inference',
      githubUrl: 'https://github.com/YASVANTHKUMAR23/AICTE_MICROSOFT_INTERSHIP_YASVANTHKUMAR_N',
      image: '/experience/exp_card_3.png',
      highlights: [
        'End-to-end ML data preprocessing, normalization, and hyperparameter tuning',
        'Interactive web drawing canvas for real-time digit classification',
        'Containerized and hosted on cloud infrastructure for external API inference',
      ],
    },
    {
      id: 'vois-major-project',
      title: 'VOIS Major Project Automation Suite',
      category: 'Python & Enterprise Automation',
      description: 'Enterprise-grade Python automation modules and data-driven backend systems with robust error handling and secure transmission.',
      longDescription: 'Completed as the official capstone major project under the VOIS & Vodafone Idea Foundation AICTE internship program. Implements scalable Python automation modules, automated ETL pipelines, and robust data validation with secure API endpoints.',
      tags: ['Python', 'Enterprise Workflows', 'APIs', 'Git'],
      metrics: '100% test coverage · Automated data verification',
      githubUrl: 'https://github.com/YASVANTHKUMAR23/VOIS_AICTE_Oct2025_MajorProject_YASVANTH_KUMAR_N',
      image: '/experience/exp_card_2.png',
      highlights: [
        'Modular Python architecture with structured configuration management',
        'Automated data parsing and error-resilient pipeline execution',
        'Standardized logging, exception recovery, and clean Git commits',
      ],
    },
    {
      id: 'pillcarex',
      title: 'PillCareX Healthcare OCR Utility',
      category: 'Healthcare & OCR',
      description: 'Prescription dosage extraction via multimodal OCR with automated dosage alerts and drug contraindication checks.',
      longDescription: 'Intelligent patient medication adherence platform. Combines computer vision OCR and language models to extract medical dosages, prescription schedules, and deliver timely reminders with drug interaction alerts.',
      tags: ['Python', 'OCR', 'RAG', 'Backend Automation'],
      metrics: '92% adherence compliance rate · 10,000+ doses scheduled',
      githubUrl: 'https://github.com/YASVANTHKUMAR23',
      highlights: [
        'Multimodal OCR scanning for handwritten and printed prescriptions',
        'Automated dosage reminder dispatching',
        'Drug-to-drug contraindication detection',
      ],
    },
    {
      id: 'capacity-connect',
      title: 'Capacity Connect Enterprise Portal',
      category: 'EdTech & RBAC Architecture',
      description: 'Enterprise competency assessment and learning portal with role-based permissions and automated digital certificate generation.',
      longDescription: 'Scalable enterprise training and capacity building portal. Features multi-tenant architecture, role-based access control (RBAC), customized skill learning pathways, and automated cryptographically verifiable certification.',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma'],
      metrics: '3,500+ active learners · Multi-tenant institutional portal',
      githubUrl: 'https://github.com/YASVANTHKUMAR23',
      highlights: [
        'Multi-tenant architecture with institutional role-based permissions',
        'Automated competency grading and interactive progress dashboards',
        'Cryptographically verifiable digital credential generator',
      ],
    },
  ];

  return (
    <section
      id="projects"
      className="w-full py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-transparent selection:bg-[#2563eb] selection:text-white"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Header with Smooth GSAP-Style Scrolling Transition */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-xs sm:text-[13px] uppercase font-bold tracking-[0.2em] text-slate-500">
                PROJECTS
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-[#2563eb] rounded-full inline-block" />
            </div>

            {/* Title: Things I’ve built to solve real problems. */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f1c] tracking-tight leading-[1.15]">
              Things I’ve built to solve{' '}
              <span className="text-[#2563eb]">real problems.</span>
            </h2>
          </div>

          {/* Right Subtitle */}
          <p className="text-slate-500 text-sm md:text-base max-w-md leading-relaxed font-normal">
            A collection of projects where I combine backend engineering, AI and modern interfaces to build practical solutions.
          </p>
        </motion.div>

        {/* Featured Section with 3D CircularTestimonials Component (Smooth GSAP Scroll Transition) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 1.65, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <div className="bg-[#f8faff] rounded-[28px] sm:rounded-[36px] border border-blue-100/70 p-4 sm:p-8 lg:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.06)] transition-all duration-300">
            <CircularTestimonials
              testimonials={featuredProjects}
              autoplay={true}
              colors={{
                name: '#0a0f1c',
                designation: '#2563eb',
                testimony: '#475569',
                arrowBackground: '#0a0f1c',
                arrowForeground: '#ffffff',
                arrowHoverBackground: '#2563eb',
              }}
              fontSizes={{
                name: '2rem',
                designation: '0.95rem',
                quote: '1.05rem',
              }}
              onSelectProject={(project) => {
                const match = otherProjects.find((p) => p.title.toLowerCase().includes(project.name.toLowerCase()));
                if (match) {
                  setSelectedProject({ ...match, image: project.src });
                } else {
                  setSelectedProject({
                    id: project.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    title: project.name,
                    category: project.designation,
                    description: project.quote,
                    longDescription: project.quote,
                    tags: project.tags || [],
                    metrics: project.badge || 'Featured Flagship Project',
                    githubUrl: project.githubUrl || 'https://github.com/YASVANTHKUMAR23',
                    highlights: project.features || [],
                    image: project.src,
                  });
                }
              }}
            />
          </div>
        </motion.div>

        {/* Other Projects Header with Smooth Glide */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <div className="flex items-center gap-2.5">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0a0f1c]">
              Other Projects
            </h3>
            <span className="w-8 h-[2.5px] bg-[#2563eb] rounded-full inline-block" />
          </div>
        </motion.div>

        {/* Other Projects Grid with Unhurried Staggered GSAP-Style Keyframes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {otherProjects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{
                duration: 1.45,
                delay: (idx % 3) * 0.18,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
              className="relative overflow-hidden bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Animated BorderBeam accent on card border */}
              <BorderBeam
                size={160}
                duration={12}
                delay={idx * 1.8}
                colorFrom="#2563eb"
                colorTo="#38bdf8"
                borderWidth={1.5}
              />
              <div>
                {/* Project Title */}
                <h4 className="text-xl font-bold text-[#0a0f1c] group-hover:text-[#2563eb] transition-colors">
                  {project.title}
                </h4>

                {/* Short Description */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mt-2.5 mb-5 min-h-[48px]">
                  {project.description}
                </p>

                {/* Tech Pills with Logos */}
                <div className="flex flex-wrap items-center gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <TechToolPill key={tag} tool={tag} />
                  ))}
                </div>
              </div>

              {/* Action Buttons matching screenshot */}
              <div className="flex items-center gap-2.5 pt-4 border-t border-slate-100">
                {/* View Project Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-4 py-2 bg-[#0a0f1c] hover:bg-black text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>View Project</span>
                  <span className="text-xs">↗</span>
                </button>

                {/* GitHub Button */}
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-full shadow-xs transition-all flex items-center gap-1.5"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 shadow-2xl border border-slate-200 relative my-8 animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer z-10 bg-white/80 backdrop-blur-xs"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedProject.image && (
              <div className="w-full h-52 sm:h-60 rounded-2xl overflow-hidden mb-5 border border-slate-200/80 bg-slate-50 flex items-center justify-center shadow-xs">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <span className="text-xs font-bold uppercase tracking-wider text-[#2563eb]">
              {selectedProject.category}
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0a0f1c] mt-1 mb-3">
              {selectedProject.title}
            </h3>

            <div className="bg-blue-50/60 p-4 rounded-xl mb-5 border border-blue-100">
              <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider block mb-0.5">
                Key Performance Impact
              </span>
              <p className="text-sm font-bold text-[#0a0f1c]">{selectedProject.metrics}</p>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              {selectedProject.longDescription}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
              Engineering Architecture Highlights:
            </h4>
            <ul className="space-y-2 mb-6">
              {selectedProject.highlights.map((h, i) => (
                <li key={i} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] mt-1.5 shrink-0" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.tags.map((t) => (
                  <TechToolPill key={t} tool={t} />
                ))}
              </div>

              <a
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0a0f1c] text-white text-xs font-semibold rounded-full hover:bg-black transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Visit Repository</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
