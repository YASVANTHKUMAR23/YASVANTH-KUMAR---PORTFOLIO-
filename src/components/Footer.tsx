import React from 'react';
import { ArrowUp, ArrowUpRight, Github, Mail, Linkedin } from 'lucide-react';
import { MotionLogo } from './MotionLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white text-[#0a0f1c] pt-20 pb-0 border-t border-slate-100 select-none overflow-hidden relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        {/* Top 4-Column Grid matching reference design */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-16">
          {/* Column 1: Brand Info & Socials (Span 5) */}
          <div className="md:col-span-5 flex flex-col justify-between">
            <div>
              {/* Eyebrow in parenthesis */}
              <p className="text-slate-400 text-xs sm:text-sm font-normal mb-2">
                (From the developer)
              </p>

              {/* Brand Title with Authentic Logo */}
              <div className="flex items-center gap-3 mb-4">
                <MotionLogo size="md" />
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[#0a0f1c]">
                  Yasvanth Kumar
                </h3>
              </div>

              {/* Bio / Mission statement */}
              <p className="text-slate-500 text-sm sm:text-[15px] leading-relaxed max-w-sm mb-6 font-normal">
                A software practice for digital products, AI architectures, and resilient systems built to stand the test of time.
              </p>
            </div>

            {/* Horizontal Social Links / Buttons with Logos (Transparent, No Pill Borders) */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-7 text-sm font-medium text-slate-700 pt-2">
              <a
                href="https://www.linkedin.com/in/yasvanth-kumar23/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-700 hover:text-[#2563eb] transition-colors group cursor-pointer text-xs sm:text-sm font-semibold bg-transparent border-0 p-0"
                aria-label="LinkedIn Profile"
              >
                <img
                  src="/linkedin.png"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      'https://cdn-icons-png.flaticon.com/512/3536/3536505.png';
                  }}
                  alt="LinkedIn"
                  className="w-4 h-4 object-contain shrink-0"
                />
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563eb] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="https://github.com/YASVANTHKUMAR23"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-slate-700 hover:text-[#0a0f1c] transition-colors group cursor-pointer text-xs sm:text-sm font-semibold bg-transparent border-0 p-0"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4 text-slate-700 group-hover:text-[#0a0f1c] transition-colors shrink-0" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#0a0f1c] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href="mailto:yasvanthkumar2306@gmail.com"
                className="inline-flex items-center gap-2 text-slate-700 hover:text-[#2563eb] transition-colors group cursor-pointer text-xs sm:text-sm font-semibold bg-transparent border-0 p-0"
                aria-label="Email Yasvanth Kumar"
              >
                <Mail className="w-4 h-4 text-slate-700 group-hover:text-[#2563eb] transition-colors shrink-0" />
                <span>Email</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#2563eb] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>

          {/* Column 2: Studio / Navigation (Span 2) */}
          <div className="md:col-span-2 md:col-start-7">
            <h4 className="text-xs sm:text-sm font-bold text-[#0a0f1c] tracking-tight mb-4 uppercase">
              Studio
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 font-normal">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  About me
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Selected work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('skills')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Tech capabilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('experience')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Timeline & roles
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Output / Capabilities (Span 2) */}
          <div className="md:col-span-2">
            <h4 className="text-xs sm:text-sm font-bold text-[#0a0f1c] tracking-tight mb-4 uppercase">
              Output
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 font-normal">
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Python Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  AI & LLM Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('skills')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Full-Stack Apps
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('skills')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Autonomous Agents
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Case studies
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Reach (Span 2) */}
          <div className="md:col-span-2">
            <h4 className="text-xs sm:text-sm font-bold text-[#0a0f1c] tracking-tight mb-4 uppercase">
              Reach
            </h4>
            <ul className="space-y-3 text-sm text-slate-500 font-normal">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left font-medium text-slate-700"
                >
                  New opportunities
                </button>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/yasvanth-kumar23/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#2563eb] transition-colors text-left block"
                >
                  LinkedIn message
                </a>
              </li>
              <li>
                <a
                  href="mailto:yasvanthkumar2306@gmail.com"
                  className="hover:text-[#2563eb] transition-colors text-left block"
                >
                  General enquiries
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-[#2563eb] transition-colors cursor-pointer text-left"
                >
                  Schedule discussion
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-slate-200/80 pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-slate-500">
          {/* Copyright Line matching reference format */}
          <p className="font-normal text-slate-500">
            © 2026 Yasvanth Kumar. Handcrafted with care, shipped on time.
          </p>

          {/* Up Arrow Button */}
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-semibold text-slate-700 hover:text-[#0a0f1c] bg-slate-100 hover:bg-slate-200/90 rounded-full transition-all duration-200 cursor-pointer group shadow-2xs hover:shadow-xs active:scale-95"
            aria-label="Scroll back to top"
            title="Scroll back to top"
          >
            <span>Back to top</span>
            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-slate-700 group-hover:text-[#2563eb] group-hover:-translate-y-0.5 transition-all shadow-xs">
              <ArrowUp className="w-3 h-3 stroke-[2.5]" />
            </div>
          </button>
        </div>
      </div>

      {/* Massive Typographic Watermark at Bottom (Capitalized font) */}
      <div className="w-full overflow-hidden select-none pointer-events-none -mb-3 sm:-mb-6 lg:-mb-10 flex justify-center items-end">
        <span
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="font-black uppercase tracking-wider text-[17vw] leading-[0.76] text-[#e2e8f0] text-center select-none block"
        >
          YASVANTH
        </span>
      </div>
    </footer>
  );
};

export default Footer;
