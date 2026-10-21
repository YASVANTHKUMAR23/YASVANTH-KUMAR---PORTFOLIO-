import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Terminal, Code2, Cpu } from 'lucide-react';

interface TechSkill {
  name: string;
  category: 'Python & Backend' | 'Full-Stack Web' | 'Agentic & Gen AI' | 'Cloud & Tools';
  level: string;
  iconUrl?: string;
  customIcon?: React.ReactNode;
}

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Exactly 15 prominent skills balanced across Python (40%), Full-Stack (30%), and AI (30%)
  const skills: TechSkill[] = [
    {
      name: 'Python',
      category: 'Python & Backend',
      level: 'Advanced · FastAPI, Automation & OOP',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'JavaScript / TypeScript',
      category: 'Full-Stack Web',
      level: 'Advanced · ES6+, Async & Architecture',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg',
    },
    {
      name: 'React.js & Next.js',
      category: 'Full-Stack Web',
      level: 'Production Ready · Modern Web Apps & SSR',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
    {
      name: 'FastAPI & Flask',
      category: 'Python & Backend',
      level: 'API Development · High-Performance Services',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg',
    },
    {
      name: 'Agentic AI & LangGraph',
      category: 'Agentic & Gen AI',
      level: 'Multi-Agent Supervisors & Swarms',
      customIcon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 17L12 22L22 17" stroke="#0a0f1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2 12L12 17L22 12" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
    {
      name: 'Java',
      category: 'Python & Backend',
      level: 'Certified · NPTEL Silver Medalist, OOP',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'SQL & Databases',
      category: 'Python & Backend',
      level: 'PostgreSQL, SQLite, Supabase',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
    },
    {
      name: 'Tailwind CSS & UI/UX',
      category: 'Full-Stack Web',
      level: 'Design Systems & Responsive Layouts',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
    },
    {
      name: 'Git, GitHub & Docker',
      category: 'Cloud & Tools',
      level: 'DevOps Basics · Containerization & CI/CD',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
    },
    {
      name: 'n8n Automation & APIs',
      category: 'Agentic & Gen AI',
      level: 'Workflow Orchestration & Webhooks',
      customIcon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill="#ea4b71">
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="7" r="3" />
          <circle cx="18" cy="17" r="3" />
          <path d="M6 12h12M12 12V7h6M12 12v5h6" stroke="#ea4b71" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      name: 'Machine Learning & SVM',
      category: 'Agentic & Gen AI',
      level: 'Scikit-Learn, ML Pipelines, Cloud',
      customIcon: (
        <svg className="w-10 h-10 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      ),
    },
    {
      name: 'Cloud & IBM Cloud',
      category: 'Cloud & Tools',
      level: 'Cloud Deployment, Model Hosting',
      customIcon: (
        <svg className="w-10 h-10 text-[#0f62fe]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
        </svg>
      ),
    },
    {
      name: 'AI Studio & Antigravity',
      category: 'Cloud & Tools',
      level: 'Prototyping & Modern IDEs',
      customIcon: (
        <svg className="w-10 h-10 text-[#2563eb]" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L1 21h22L12 2zm0 4.5l7.5 13h-15L12 6.5z"/>
        </svg>
      ),
    },
    {
      name: 'RAG & Vector Stores',
      category: 'Agentic & Gen AI',
      level: 'ChromaDB, PubMed, Semantic Retrieval',
      customIcon: (
        <svg className="w-10 h-10 text-[#2563eb]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      ),
    },
    {
      name: 'HTML5 & CSS3',
      category: 'Full-Stack Web',
      level: 'Semantic Web, Accessibility, Standards',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    },
  ];

  const categories = ['All', 'Python & Backend', 'Full-Stack Web', 'Agentic & Gen AI', 'Cloud & Tools'];

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      className="w-full py-20 lg:py-28 px-4 sm:px-6 md:px-12 bg-white/80 backdrop-blur-[1px] border-t border-slate-100 selection:bg-[#2563eb] selection:text-white"
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
                SKILLS &amp; TECHNOLOGIES
              </span>
              <span className="w-8 sm:w-10 h-[2.5px] bg-[#2563eb] rounded-full inline-block" />
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0a0f1c] tracking-tight leading-[1.15]">
              Core Tech Stack &amp;{' '}
              <span className="text-[#2563eb]">Specializations.</span>
            </h2>
          </div>

          {/* Filter Pills with motion feedback */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-2xl self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-[#0a0f1c] shadow-sm font-bold'
                    : 'text-slate-600 hover:text-black'
                }`}
              >
                {activeCategory === cat && (
                  <motion.div
                    layoutId="activeCategoryIndicator"
                    className="absolute inset-0 bg-white rounded-xl shadow-xs -z-10"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}
                <span>{cat}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Clean, Card-Free Tech Stack Icon Grid with Staggered GSAP-Style Scroll Keyframes */}
        <motion.div
          layout
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, idx) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.06 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.25 } }}
                transition={{
                  duration: 1.4,
                  delay: (idx % 5) * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
                className="flex flex-col items-center justify-center text-center p-5 rounded-2xl group cursor-pointer"
              >
                {/* Tech Icon Container */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-white/95 border border-slate-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] group-hover:shadow-[0_12px_28px_rgba(37,99,235,0.15)] group-hover:border-blue-400/80 flex items-center justify-center p-3 transition-all duration-300 relative">
                  {skill.iconUrl ? (
                    <img
                      src={skill.iconUrl}
                      alt={skill.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <div className="group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                      {skill.customIcon}
                    </div>
                  )}

                  {/* Subtle ping indicator on hover */}
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Tech Name */}
                <h4 className="mt-3.5 text-sm sm:text-base font-bold text-[#0a0f1c] group-hover:text-[#2563eb] transition-colors">
                  {skill.name}
                </h4>

                {/* Sub-label Level */}
                <span className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5">
                  {skill.level}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Skill Proficiency Strip with Scroll Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mt-14 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#2563eb]" />
            <span className="font-medium text-slate-700">Specialized in Autonomous AI Agents &amp; Asynchronous Python Backends</span>
          </div>
          <span className="font-mono text-slate-400">15 CORE TECHNOLOGIES</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
