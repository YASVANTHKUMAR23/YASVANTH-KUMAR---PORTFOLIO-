import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowUpRight, Github, ExternalLink, X, GraduationCap, Code2, Sparkles, MapPin, Award, Terminal } from 'lucide-react';

interface AboutProps {
  onNavigateToProjects?: () => void;
  onOpenContact?: () => void;
}

export const About: React.FC<AboutProps> = ({ onNavigateToProjects, onOpenContact }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Parallax scroll effects using Framer Motion
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  // Background ambient parallax
  const bgAuraY = useTransform(smoothProgress, [0, 1], [-80, 80]);

  // Portrait image source with fallback
  const [portraitSrc, setPortraitSrc] = useState(
    '/src/assets/images/about_portrait_1791119468485.jpg'
  );

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 md:px-12 bg-transparent overflow-hidden selection:bg-[#2563eb] selection:text-white"
    >
      {/* Ambient Parallax Gradient Background Light */}
      <motion.div
        style={{ y: bgAuraY }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-blue-100/40 via-sky-50/50 to-indigo-100/30 rounded-full blur-3xl pointer-events-none -z-10"
      />

      <div className="max-w-[1240px] mx-auto">
        {/* Main Card Container with Seamless GSAP-Style Scroll Transition */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-white rounded-[32px] sm:rounded-[40px] border border-slate-100/90 p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_70px_-15px_rgba(37,99,235,0.08)] transition-shadow duration-500"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Portrait Image (Smooth Glide Entrance) */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 15 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.08 }}
              transition={{ duration: 1.5, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center"
            >
              <div className="relative w-full max-w-[420px] aspect-square lg:w-[436.663px] lg:max-w-none lg:h-[550px] lg:aspect-auto group">
                {/* Soft backdrop glow behind image */}
                <div className="absolute inset-2 bg-gradient-to-br from-blue-400/20 to-sky-300/10 rounded-[32px] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

                {/* Portrait container with rounded corners and crisp shadow */}
                <div className="relative w-full h-full rounded-[28px] sm:rounded-[34px] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-[0_15px_35px_-5px_rgba(10,15,28,0.12)]">
                  <img
                    src={portraitSrc}
                    onError={() => {
                      if (portraitSrc !== 'https://github.com/YASVANTHKUMAR23/YASVANTH-PORTFOLIO/blob/main/public/avatar.png?raw=true') {
                        setPortraitSrc('https://github.com/YASVANTHKUMAR23/YASVANTH-PORTFOLIO/blob/main/public/avatar.png?raw=true');
                      }
                    }}
                    onLoad={() => setImageLoaded(true)}
                    alt="Yashvanth Kumar - Python Developer & AI Engineer"
                    className="w-full h-full lg:w-[419.4px] lg:h-[550px] object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out select-none"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Subtle inner border overlay */}
                  <div className="absolute inset-0 rounded-[28px] sm:rounded-[34px] ring-1 ring-black/5 pointer-events-none" />
                </div>

                {/* Stable Engineering Badge with Smooth GSAP-style Entrance */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.08 }}
                  transition={{ duration: 1.35, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:h-[40.5875px] bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl px-3.5 py-2 shadow-lg flex items-center gap-2 select-none"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[11px] sm:text-xs lg:text-[14px] font-bold text-slate-800 tracking-tight">Smart India Hackathon 2025 Grand Finalist</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column: Choreographed Content Entrance */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.08 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.16, delayChildren: 0.15 },
                },
              }}
              className="lg:col-span-7 flex flex-col justify-center space-y-6"
            >
              {/* Kicker Tag: ABOUT ME with Horizontal Blue Accent Line */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -16 },
                  visible: { opacity: 1, x: 0, transition: { duration: 1.35, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="flex items-center gap-2.5"
              >
                <span className="text-xs sm:text-[13px] uppercase font-bold tracking-[0.2em] text-slate-500">
                  ABOUT ME · PYTHON &amp; FULL-STACK AI ENGINEER
                </span>
                <span className="w-8 sm:w-10 h-[2.5px] bg-[#2563eb] rounded-full inline-block" />
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.45, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-3xl sm:text-4xl lg:text-[38px] lg:text-left lg:w-[679.725px] lg:max-w-none font-extrabold text-[#0a0f1c] tracking-[-0.025em] leading-[1.18]"
              >
                Architecting robust <span className="text-[#2563eb]">Python backends</span>, full-stack web applications, and <span className="text-[#2563eb]">autonomous AI agents</span> that solve complex real-world problems.
              </motion.h2>

              {/* Paragraph Description */}
              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.45, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="text-slate-600 text-sm sm:text-base lg:text-[17px] leading-[1.7] max-w-xl font-normal"
              >
                I’m <strong className="font-bold text-[#0a0f1c]">Yasvanth Kumar N</strong>, a Python and Full-Stack AI Engineer pursuing my B.Tech at Dhanalakshmi Srinivasan Engineering College (CGPA: 8.5) and a Smart India Hackathon 2025 Grand Finalist. I specialize in building end-to-end Python applications, high-throughput full-stack web platforms, and deterministic multi-agent AI systems.
              </motion.p>

              {/* Credential Pills */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="flex flex-wrap gap-2 pt-1"
              >
                <span className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#2563eb] text-xs font-semibold">
                  Python &amp; FastAPI Backend Architecture
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold">
                  Full-Stack Web Engineering (React/Next.js)
                </span>
                <span className="px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold">
                  NPTEL Silver Medalist in Java Programming
                </span>
              </motion.div>

              {/* Social Icon Cards Strip */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.35, staggerChildren: 0.1, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="flex items-center gap-3 pt-1"
              >
                {/* LinkedIn Card */}
                <motion.a
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://www.linkedin.com/in/yasvanth-kumar23/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yasvanth Kumar on LinkedIn"
                  title="Connect on LinkedIn"
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.04)] flex items-center justify-center hover:border-blue-400 hover:shadow-md transition-colors group cursor-pointer"
                >
                  <img
                    src="/linkedin.png"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/3536/3536505.png';
                    }}
                    alt="LinkedIn"
                    className="w-5 h-5 object-contain group-hover:scale-110 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </motion.a>

                {/* GitHub Card */}
                <motion.a
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileHover={{ y: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://github.com/YASVANTHKUMAR23"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Yasvanth Kumar on GitHub"
                  title="Explore GitHub Repositories"
                  className="w-12 h-12 rounded-2xl bg-white border border-slate-200/90 shadow-[0_3px_12px_rgba(0,0,0,0.04)] flex items-center justify-center hover:border-slate-400 hover:shadow-md transition-colors group cursor-pointer"
                >
                  <Github className="w-5 h-5 text-[#0a0f1c] group-hover:scale-110 transition-transform" />
                </motion.a>
              </motion.div>

              {/* Primary Action Button: "Know More ↗" */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 1.35, ease: [0.16, 1, 0.3, 1] } },
                }}
                className="pt-2"
              >
                <button
                  onClick={() => setIsDetailModalOpen(true)}
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#070e24] text-white text-sm sm:text-base font-semibold rounded-full hover:bg-black transition-all duration-200 shadow-[0_12px_28px_rgba(37,99,235,0.32)] hover:shadow-[0_16px_36px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer group"
                >
                  <span>Know More</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Interactive "Know More" Detailed Bio Modal */}
      {isDetailModalOpen && (
        <div className="fixed inset-0 z-[10000] bg-black/60 backdrop-blur-sm flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-4 sm:p-7 md:p-9 shadow-2xl border border-slate-200 relative my-auto sm:my-8 max-h-[92vh] sm:max-h-none flex flex-col animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 p-1.5 sm:p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-800 transition-colors cursor-pointer z-10"
              aria-label="Close Bio Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-3.5 sm:mb-6 pr-8 sm:pr-0">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest font-bold text-[#2563eb] mb-0.5 sm:mb-1">
                <span>Engineer Profile</span>
                <span className="w-6 h-[2px] bg-[#2563eb]" />
              </div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#0a0f1c] tracking-tight">
                Yasvanth Kumar N
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-0.5 sm:mt-1 flex items-center gap-1.5 sm:gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                <span>Mutharasanallur, Tiruchirapalli · B.Tech AI &amp; Data Science (CGPA: 8.5)</span>
              </p>
            </div>

            {/* Content Blocks */}
            <div className="space-y-3 sm:space-y-4 text-slate-600 text-xs sm:text-sm leading-relaxed max-h-[55vh] sm:max-h-[60vh] overflow-y-auto pr-1 sm:pr-2">
              <div className="bg-slate-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 space-y-1.5 sm:space-y-2">
                <h4 className="font-bold text-[#0a0f1c] text-xs sm:text-sm flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#2563eb]" />
                  <span>Core Engineering Focus</span>
                </h4>
                <p>
                  Balancing core Python development, scalable full-stack web applications, and cutting-edge agentic AI pipelines. Expert in building data-driven logic, clean REST APIs, and responsive user interfaces.
                </p>
              </div>

              <div className="bg-slate-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 space-y-1.5 sm:space-y-2">
                <h4 className="font-bold text-[#0a0f1c] text-xs sm:text-sm flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-[#2563eb]" />
                  <span>Academic Foundation</span>
                </h4>
                <p>
                  Pursuing B.Tech in Artificial Intelligence &amp; Data Science at Dhanalakshmi Srinivasan Engineering College (Autonomous), Perambalur with an <strong>8.5 CGPA</strong>. Schooling completed at Bishop Heber Hr Sec School, Tiruchirapalli (SSLC: 100%, HSC: 82.5%).
                </p>
              </div>

              <div className="bg-slate-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-slate-100 space-y-1.5 sm:space-y-2">
                <h4 className="font-bold text-[#0a0f1c] text-xs sm:text-sm flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#2563eb]" />
                  <span>Recognitions &amp; Accolades</span>
                </h4>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 font-medium">
                  <li>Smart India Hackathon (SIH) 2025 — Grand Finale Finalist (Ministry of Education)</li>
                  <li>NPTEL Silver Medalist — Java Programming Certification</li>
                  <li>NPTEL Certification — Introduction to LLMs</li>
                  <li>AICTE Learnathon Certification</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="mt-4 sm:mt-6 pt-3.5 sm:pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2.5">
              <a
                href="https://github.com/YASVANTHKUMAR23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-[#2563eb] transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Visit GitHub Profile</span>
                <ExternalLink className="w-3 h-3" />
              </a>

              <button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  if (onOpenContact) onOpenContact();
                }}
                className="px-4 sm:px-5 py-2 sm:py-2.5 bg-[#0a0f1c] hover:bg-black text-white text-xs font-semibold rounded-full shadow-md transition-all cursor-pointer"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
