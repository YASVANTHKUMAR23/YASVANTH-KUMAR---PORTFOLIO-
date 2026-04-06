'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { Twitter, Instagram, Youtube, ArrowUpRight, Menu, X } from 'lucide-react';
import { Login } from '@/components/Login';
import { CMS, HeroData } from '@/components/CMS';
import { Certification } from '@/components/Certification';
import { TimelineSection } from '@/components/TimelineSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { ContactSection } from '@/components/ContactSection';
import { FooterWrapper } from '@/components/FooterWrapper';
import { AboutSection } from '@/components/AboutSection';

const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (custom: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 1.2, ease: "easeInOut" as const, delay: custom * 0.4 + 0.5 },
      opacity: { duration: 0.2, delay: custom * 0.4 + 0.5 }
    }
  })
};

const textVariants = {
  hidden: { opacity: 0, scale: 2, rotate: -15, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -5,
    y: 0,
    transition: {
      type: "spring" as const,
      damping: 12,
      stiffness: 100,
      delay: 2.8
    }
  }
};

const floatVariants = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      ease: "easeInOut" as const,
      repeat: Infinity,
      repeatType: "loop" as const,
      delay: 3.5
    }
  }
};

const LogoContent = ({ isDrawing = false, onClick }: { isDrawing?: boolean, onClick?: () => void }) => {
  const initialState = isDrawing ? "hidden" : "visible";
  
  return (
    <motion.div 
      className="w-full h-full relative flex items-center justify-center cursor-pointer @container"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div variants={floatVariants} animate="animate" className="absolute inset-0 flex items-center justify-center">
        {/* SVG Container */}
        <div className="absolute inset-0 flex items-center justify-center pb-[16%]">
          <svg viewBox="0 0 200 200" className="w-[72%] h-[72%] overflow-visible drop-shadow-lg">
            <defs>
              <linearGradient id="ai-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f9a8d4" />
                <stop offset="50%" stopColor="#c084fc" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>

            {/* Circle */}
            <motion.circle 
              cx="100" cy="90" r="75" 
              fill="none" 
              stroke="url(#ai-grad)" 
              strokeWidth="5" 
              custom={0}
              variants={drawVariants}
              initial={initialState}
              animate="visible"
              style={{ rotate: -90, originX: "100px", originY: "90px" }}
            />

            {/* A left leg */}
            <motion.path 
              d="M 65 150 L 95 25" 
              fill="none" 
              stroke="url(#ai-grad)" 
              strokeWidth="14" 
              strokeLinecap="round" 
              custom={1}
              variants={drawVariants}
              initial={initialState}
              animate="visible"
            />

            {/* A right leg */}
            <motion.path 
              d="M 95 25 L 135 145" 
              fill="none" 
              stroke="url(#ai-grad)" 
              strokeWidth="14" 
              strokeLinecap="round" 
              custom={2}
              variants={drawVariants}
              initial={initialState}
              animate="visible"
            />

            {/* Crossbar & i stem */}
            <motion.path 
              d="M 20 115 Q 90 90 145 70 L 140 135" 
              fill="none" 
              stroke="url(#ai-grad)" 
              strokeWidth="14" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              custom={3}
              variants={drawVariants}
              initial={initialState}
              animate="visible"
            />

            {/* i dot */}
            <motion.circle 
              cx="150" cy="40" r="8" 
              fill="url(#ai-grad)" 
              initial={isDrawing ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: isDrawing ? 2.5 : 0, type: "spring", damping: 10 }}
            />
          </svg>
        </div>

        {/* DEVELOPER Text */}
        <motion.div 
          className="absolute bottom-[20%] w-full text-center z-10"
          variants={textVariants}
          initial={initialState}
          animate="visible"
        >
          <span 
            className="font-display text-[11cqw] tracking-wider text-white block whitespace-nowrap"
            style={{
              textShadow: '3px 3px 0px rgba(0,0,0,0.8), -1px -1px 0px rgba(255,255,255,0.2)',
              transform: 'rotate(-5deg)',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)'
            }}
          >
            DEVELOPER
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default function Page() {
  const [introState, setIntroState] = useState<'drawing' | 'centered' | 'moved'>('drawing');
  const [clickCount, setClickCount] = useState(0);
  const [showLogin, setShowLogin] = useState(false);
  const [showCMS, setShowCMS] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 1000], [0, 120]);

  const [heroData, setHeroData] = useState<HeroData>({
    name: "YASVANTH",
    imageSrc: "/avatar.png",
    leftText: "AI & Data Science Engineer specializing in Agentic AI and LLM Orchestration. Expert in Python, n8n, and RAG,",
    rightText: "delivering real-world solutions like WhatsApp health bots and automated ML classifiers. SIH Grand Finalist with a focus on high-impact healthcare automation and industrial-grade Gen AI implementation.",
    twitterUrl: "#",
    instagramUrl: "#",
    youtubeUrl: "#",
    buttonText: "Let's Talk",
    buttonUrl: "#"
  });

  const contactData = {
    heading: "Let's work together",
    description: "I'm always open to discussing product design work or partnership opportunities.",
    formLabels: {
      name: "Your Name",
      email: "Your Email",
      message: "Your Message"
    }
  };

  useEffect(() => {
    if (introState === 'drawing') {
      const timer = setTimeout(() => {
        setIntroState('centered');
      }, 4000);
      return () => clearTimeout(timer);
    }
    if (introState === 'centered') {
      const timer = setTimeout(() => {
        setIntroState('moved');
      }, 800); // Reduced delay before moving
      return () => clearTimeout(timer);
    }
  }, [introState]);

  useEffect(() => {
    if (clickCount > 0) {
      const timer = setTimeout(() => setClickCount(0), 500);
      return () => clearTimeout(timer);
    }
  }, [clickCount]);

  const handleLogoClick = () => {
    setClickCount(prev => {
      const newCount = prev + 1;
      if (newCount === 3) {
        setShowLogin(true);
        return 0;
      }
      return newCount;
    });
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-clip /* R */">
      
      <AnimatePresence>
        {showLogin && (
          <Login 
            onSuccess={() => {
              setShowLogin(false);
              setShowCMS(true);
            }} 
            onClose={() => setShowLogin(false)} 
          />
        )}
        {showCMS && (
          <CMS 
            data={heroData} 
            onSave={(newData) => {
              setHeroData(newData);
              setShowCMS(false);
            }} 
            onClose={() => setShowCMS(false)} 
          />
        )}
      </AnimatePresence>

      {/* Intro Overlay */}
      <AnimatePresence>
        {(introState === 'drawing' || introState === 'centered') && (
          <motion.div 
            className="fixed inset-0 z-[90] bg-[#0a0514]"
            exit={{ opacity: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }}
          />
        )}
      </AnimatePresence>

      {/* Logo Animation */}
      <motion.div
        layout
        initial={false}
        animate={{
          top: introState === 'moved' ? '16px' : '50%',
          left: introState === 'moved' ? '24px' : '50%',
          x: introState === 'moved' ? 0 : '-50%',
          y: introState === 'moved' ? 0 : '-50%',
          width: introState === 'moved' ? '60px' : 'min(75vmin, 400px)',
          height: introState === 'moved' ? '60px' : 'min(75vmin, 400px)',
        }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed z-[105]"
      >
        <LogoContent isDrawing={introState === 'drawing'} onClick={handleLogoClick} />
      </motion.div>

      {/* Navigation */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: introState === 'moved' ? 0 : -100, opacity: introState === 'moved' ? 1 : 0 }}
        transition={{ duration: 1.5, delay: 0.8 }}
        className="fixed top-6 right-6 z-50 flex items-center gap-4"
      >
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-3.5 rounded-full shadow-lg">
          <a href="#timeline" className="hover:text-[#00e1ab] transition-colors">Experience</a>
          <a href="#certificates" className="hover:text-[#00e1ab] transition-colors">Certifications</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="hover:text-[#00e1ab] transition-colors">Contact</a>
        </nav>

        {/* Mobile/Tablet Hamburger */}
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="md:hidden w-[48px] h-[48px] flex items-center justify-center text-white bg-white/5 backdrop-blur-xl rounded-full border border-white/10 hover:bg-white/10 transition-colors shadow-lg"
        >
          <Menu size={20} />
        </button>
      </motion.header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[280px] bg-[#0a0a0a] border-l border-white/10 z-[120] p-8 flex flex-col md:hidden"
            >
              <div className="flex justify-end mb-12">
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="w-[44px] h-[44px] flex items-center justify-center text-white bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <nav className="flex flex-col gap-8 text-lg font-medium text-white">
                <a href="#timeline" onClick={() => setIsSidebarOpen(false)} className="hover:text-[#00e1ab] transition-colors">Experience</a>
                <a href="#certificates" onClick={() => setIsSidebarOpen(false)} className="hover:text-[#00e1ab] transition-colors">Certifications</a>
                <a href="#contact" onClick={(e) => { e.preventDefault(); setIsSidebarOpen(false); window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' }); }} className="hover:text-[#00e1ab] transition-colors">Contact</a>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Content Container */}
      {introState === 'moved' && (
        <>
          <div className="relative z-10 bg-[#030303] flex flex-col">
            <main className="relative z-10 flex min-h-screen flex-col items-center justify-start pt-24 sm:pt-32 lg:pt-0 lg:justify-center px-6 sm:px-12 lg:px-0 overflow-hidden /* R */">
              
              {/* Background Elements for Hero Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                className="absolute inset-0 z-0 pointer-events-none"
              >
                {/* Top Left Deep Purple Glow */}
                <div 
                  className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full mix-blend-screen"
                  style={{
                    background: 'radial-gradient(circle, rgba(32, 0, 128, 0.5) 0%, rgba(0, 0, 0, 0) 70%)',
                    filter: 'blur(90px)'
                  }}
                />
                
                {/* Top Right White Glow */}
                <div 
                  className="absolute top-[-20%] right-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-screen"
                  style={{
                    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
                    filter: 'blur(80px)'
                  }}
                />

                {/* Center Animated Circles */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
                  {/* Outer Circle */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.4, 0.6, 0.4]
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                    className="absolute w-[85vmin] h-[85vmin] rounded-full bg-[#1a1525]/30 border border-white/[0.02]"
                  />
                  {/* Inner Circle */}
                  <motion.div 
                    animate={{ 
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 0.9, 0.6]
                    }}
                    transition={{ 
                      duration: 6, 
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1 
                    }}
                    className="absolute w-[60vmin] h-[60vmin] rounded-full bg-[#2a1b40]/50 border border-white/[0.04]"
                  />
                </div>
              </motion.div>

              {/* Huge Background Name */}
            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-[system-ui] italic font-black text-white leading-[0.75] lg:leading-[104px] tracking-tighter text-[clamp(3rem,16vw,272px)] text-center lg:absolute lg:top-[18%] lg:mt-[68px] lg:ml-[7px] lg:left-0 lg:w-full z-0 select-none whitespace-nowrap drop-shadow-2xl /* R */"
            >
              {heroData.name}
            </motion.h1>

            {/* Center Image */}
            <motion.div 
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ y: imageY }}
              className="relative w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[700px] h-[350px] sm:h-[450px] lg:h-[734px] mt-8 sm:mt-12 lg:-mt-[167px] lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 z-10 /* R */"
            >
              <Image 
                src={heroData.imageSrc} 
                alt={heroData.name} 
                fill 
                className="object-cover object-center rounded-3xl lg:rounded-none lg:[mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] /* R */"
                priority
              />
            </motion.div>

            {/* Content Grid (Mobile/Tablet) / Absolute (Desktop) */}
            <div className="w-full flex flex-col sm:grid sm:grid-cols-2 sm:gap-8 lg:block relative z-20 mt-12 sm:mt-16 lg:mt-0 /* R */">
              
              {/* Left Box */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[22%] lg:absolute lg:left-[8%] lg:top-[55%] lg:-translate-y-1/2 flex flex-col gap-6 items-center sm:items-start text-center sm:text-left mt-8 sm:mt-24 lg:mt-[90px] pl-1 /* R */"
              >
                <p className="text-white text-base sm:text-lg leading-relaxed font-sans font-medium drop-shadow-md /* R */">
                  {heroData.leftText}
                </p>
                <div className="flex gap-3">
                  <a href={heroData.twitterUrl} className="w-[44px] h-[44px] rounded-full bg-[#6E00FF] flex items-center justify-center hover:bg-[#8B33FF] transition-colors shadow-lg shadow-[#6E00FF]/20 /* R */">
                    <Twitter size={18} className="text-white" />
                  </a>
                  <a href={heroData.instagramUrl} className="w-[44px] h-[44px] rounded-full bg-[#6E00FF] flex items-center justify-center hover:bg-[#8B33FF] transition-colors shadow-lg shadow-[#6E00FF]/20 /* R */">
                    <Instagram size={18} className="text-white" />
                  </a>
                  <a href={heroData.youtubeUrl} className="w-[44px] h-[44px] rounded-full bg-[#6E00FF] flex items-center justify-center hover:bg-[#8B33FF] transition-colors shadow-lg shadow-[#6E00FF]/20 /* R */">
                    <Youtube size={18} className="text-white" />
                  </a>
                </div>
              </motion.div>

              {/* Right Box */}
              <motion.div 
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full lg:w-[22%] lg:absolute lg:right-[8%] lg:top-[60%] lg:-translate-y-1/2 flex flex-col gap-6 items-center sm:items-start text-center sm:text-left mt-12 sm:mt-32 mb-12 lg:mb-0 py-4 /* R */"
              >
                <p className="text-white text-base sm:text-lg leading-relaxed font-sans font-medium drop-shadow-md /* R */">
                  {heroData.rightText}
                </p>
                <a href={heroData.buttonUrl} className="w-full sm:w-auto h-[44px] px-6 rounded-full bg-[#6E00FF] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#8B33FF] transition-colors shadow-lg shadow-[#6E00FF]/20 /* R */">
                  {heroData.buttonText} <ArrowUpRight size={18} />
                </a>
              </motion.div>

            </div>
            </main>
            <AboutSection />
            <ProjectsSection />
            <Certification />
            <TimelineSection />
            <ContactSection data={contactData} />
          </div>
          <FooterWrapper />
        </>
      )}
    </div>
  );
}

