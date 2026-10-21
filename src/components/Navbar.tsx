import React, { useState, useEffect, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Home, User, Briefcase, Award, Cpu, Mail, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MotionLogo } from './MotionLogo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenContact?: () => void;
  logoVisible: boolean;
}

export const Navbar = forwardRef<HTMLAnchorElement, NavbarProps>(
  ({ activeSection, onNavigate, onOpenContact, logoVisible }, ref) => {
    const [isMobile, setIsMobile] = useState(false);

    const { scrollY } = useScroll();
    // Tubelight nav pill zooms out subtly while scrolling
    const navScale = useTransform(scrollY, [0, 150, 400], [1, 0.95, 0.92]);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
      { id: 'home', name: 'Home', icon: Home },
      { id: 'about', name: 'About', icon: User },
      { id: 'projects', name: 'Projects', icon: Briefcase },
      { id: 'skills', name: 'Skills', icon: Cpu },
      { id: 'experience', name: 'Experience', icon: Award },
      { id: 'contact', name: 'Contact', icon: Mail },
    ];

    const handleItemClick = (id: string, e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      onNavigate(id);
    };

    return (
      <header
        style={{
          marginTop: '-24px',
          paddingTop: '13px',
          paddingLeft: isMobile ? '16px' : '42px',
          paddingRight: isMobile ? '16px' : '52px',
          paddingBottom: '12px',
        }}
        className="w-full z-50 sticky top-0 transition-all select-none"
      >
        {/* Transparent container without heavy background enclosure */}
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 py-2 flex items-center justify-between transition-all">
          {/* Zone 1: Brand Wordmark (Target for Intro Flying Animation) */}
          <a
            ref={ref}
            href="#home"
            onClick={(e) => handleItemClick('home', e)}
            className="flex items-center z-50 group cursor-pointer shrink-0"
            aria-label="Yasvanth Kumar Home"
          >
            <div
              className={`transition-all duration-500 ${
                logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            >
              <MotionLogo size="md" />
            </div>
          </a>

          {/* Zone 2: Tubelight Glowing Navbar (Center with Glassmorphism & Scroll Zoom) */}
          <motion.nav
            style={{
              scale: navScale,
              width: '695.812px',
              height: '51.6px',
              marginLeft: '120px',
              paddingLeft: '7px',
            }}
            className={cn(
              'hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-slate-200/60 py-1 px-1.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
              logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            )}
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={(e) => handleItemClick(item.id, e)}
                  className={cn(
                    'relative cursor-pointer text-xs lg:text-sm font-semibold px-4 py-1.5 lg:px-5 lg:py-2 rounded-full transition-colors select-none flex items-center gap-1.5',
                    'text-slate-600 hover:text-[#0a0f1c]',
                    isActive && 'text-[#2563eb] font-bold'
                  )}
                >
                  <Icon size={14} strokeWidth={isActive ? 2.5 : 2} className="hidden lg:inline text-current opacity-80" />
                  <span>{item.name}</span>

                  {/* Refined Tubelight Lamp Effect with reduced, subtle blue shade */}
                  {isActive && (
                    <motion.div
                      layoutId="tubelight-lamp"
                      className="absolute inset-0 w-full bg-[#2563eb]/5 rounded-full -z-10"
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 450,
                        damping: 32,
                        mass: 0.6,
                      }}
                    >
                      {/* Subtle, delicate light line without overpowering blue shade */}
                      <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-[2px] bg-[#2563eb] rounded-full shadow-[0_0_6px_rgba(37,99,235,0.4)]">
                        {/* Soft light diffusion with reduced intensity */}
                        <div className="absolute w-8 h-3 bg-[#2563eb]/15 rounded-full blur-[3px] -top-1 -left-1" />
                        <div className="absolute w-5 h-2 bg-[#2563eb]/10 rounded-full blur-[2px] -top-0.5 left-0.5" />
                      </div>
                    </motion.div>
                  )}
                </button>
              );
            })}
          </motion.nav>

          {/* Zone 3: Primary Action CTA */}
          <div
            className={cn(
              'flex items-center gap-2 sm:gap-3 shrink-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]',
              logoVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            )}
          >
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center px-3.5 py-1.5 sm:px-4 sm:py-2 lg:px-7 lg:py-3 bg-[#0a0f1c] text-white text-[11px] sm:text-xs lg:text-sm font-semibold rounded-full hover:bg-black transition-all shadow-sm hover:shadow-md hover:scale-[1.02] active:scale-[0.98] gap-1 sm:gap-1.5 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 text-slate-300" />
            </button>

          </div>
        </div>

        {/* Mobile Floating Tubelight Quick Bar at Bottom with delicate blue light */}
        <div className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-xl border border-slate-200/80 p-1.5 rounded-full shadow-[0_8px_25px_rgba(0,0,0,0.1)]">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <button
                  key={item.id}
                  onClick={(e) => handleItemClick(item.id, e)}
                  aria-label={item.name}
                  className={cn(
                    'relative p-2.5 rounded-full transition-colors cursor-pointer',
                    isActive ? 'text-[#2563eb]' : 'text-slate-600 hover:text-slate-900'
                  )}
                >
                  <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
                  {isActive && (
                    <motion.div
                      layoutId="mobile-lamp"
                      className="absolute inset-0 w-full bg-[#2563eb]/10 rounded-full -z-10"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 450, damping: 32, mass: 0.6 }}
                    >
                      <div className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-[#2563eb] rounded-full shadow-[0_0_4px_rgba(37,99,235,0.4)]" />
                    </motion.div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>
    );
  }
);

Navbar.displayName = 'Navbar';
