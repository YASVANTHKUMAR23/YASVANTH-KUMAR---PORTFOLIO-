import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { IntroAnimation } from './components/IntroAnimation';
import { ContactModal } from './components/ContactModal';
import { ResumeModal } from './components/ResumeModal';
import { ParallaxBackground } from './components/ParallaxBackground';
import { SmoothScrollProvider, useSmoothScroll, registerScrollSubscriber } from './lib/smooth-scroll';

function PortfolioApp() {
  const [showIntro, setShowIntro] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);
  const [targetLogoRect, setTargetLogoRect] = useState<DOMRect | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const navLogoRef = useRef<HTMLAnchorElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Measure navbar logo coordinate on mount or resize
  const measureTargetLogo = useCallback(() => {
    if (navLogoRef.current) {
      setTargetLogoRect(navLogoRef.current.getBoundingClientRect());
    }
  }, []);

  useEffect(() => {
    measureTargetLogo();
    const timer = setTimeout(measureTargetLogo, 80);
    window.addEventListener('resize', measureTargetLogo);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', measureTargetLogo);
    };
  }, [measureTargetLogo]);

  // Handle completion of intro animation
  const handleIntroComplete = () => {
    setShowIntro(false);
    setLogoVisible(true);
  };

  // Smooth scroll to target section
  const isNavigatingRef = useRef(false);
  const navigationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll to target section with instant active lock using Lenis
  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    isNavigatingRef.current = true;

    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
    }

    if (sectionId === 'home') {
      scrollTo(0, { duration: 1.1 });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        scrollTo(element, { offset: -70, duration: 1.1 });
      } else {
        scrollTo(`#${sectionId}`, { offset: -70, duration: 1.1 });
      }
    }

    // Unblock scroll spy after smooth scroll settles
    navigationTimeoutRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);
  };

  // Synchronized active section update on Lenis scroll updates
  useEffect(() => {
    const handleScrollUpdate = (scrollY: number) => {
      if (isNavigatingRef.current) return;
      const windowHeight = window.innerHeight;

      // When near top, highlight 'home'
      if (scrollY < 120) {
        setActiveSection('home');
        return;
      }

      // Check if user is scrolled near the bottom of the page
      if (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 80) {
        setActiveSection('contact');
        return;
      }

      const sectionIds = ['contact', 'experience', 'skills', 'projects', 'about', 'home'];
      const triggerPoint = scrollY + windowHeight * 0.35;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= triggerPoint) {
          setActiveSection(id);
          break;
        }
      }
    };

    // Register with unified Lenis scroll subscriber loop
    const unsubscribeLenis = registerScrollSubscriber(handleScrollUpdate);

    // Fallback native listener
    const handleNativeScroll = () => {
      handleScrollUpdate(window.scrollY);
    };
    window.addEventListener('scroll', handleNativeScroll, { passive: true });

    return () => {
      unsubscribeLenis();
      window.removeEventListener('scroll', handleNativeScroll);
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#0a0f1c] flex flex-col relative selection:bg-[#2563eb] selection:text-white font-sans">
      {/* Full-Site Parallax Background Layer */}
      <ParallaxBackground />

      {/* Modern Typewriter & Morphing Intro Animation */}
      {showIntro && (
        <IntroAnimation
          onComplete={handleIntroComplete}
          targetLogoRect={targetLogoRect}
        />
      )}

      {/* Top Navigation Bar */}
      <Navbar
        ref={navLogoRef}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        logoVisible={logoVisible}
      />

      {/* Main Content Sections */}
      <main id="home" className="flex-grow">
        {/* Pixel-Perfect Hero Section */}
        <Hero
          onViewWork={() => handleNavigate('projects')}
          onDownloadResume={() => {
            const link = document.createElement('a');
            link.href = '/YASVANTH_RESUME.pdf';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          onSelectTech={() => {
            handleNavigate('skills');
          }}
          introCompleted={!showIntro}
        />

        {/* Detailed About Section (Directly after Hero) */}
        <About
          onNavigateToProjects={() => handleNavigate('projects')}
          onOpenContact={() => handleNavigate('contact')}
        />

        {/* Featured Projects & AI Architectures */}
        <Projects />

        {/* Technical Skills & Specialization (Card-Free 15 Tech Stack Icons) */}
        <Skills />

        {/* Professional Experience & Timeline */}
        <Experience />

        {/* Dedicated Contact Section (After Experience) */}
        <Contact />
      </main>

      {/* Clean Modern Footer Matching Project Theme */}
      <Footer onNavigate={handleNavigate} />

      {/* Interactive Contact & Collaboration Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* Interactive Resume Preview & Download Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <SmoothScrollProvider>
      <PortfolioApp />
    </SmoothScrollProvider>
  );
}
