"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { Twitter, Facebook, Instagram } from "lucide-react";
import { AboutData } from "./AboutManager";

export function AboutSection() {
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<AboutData | null>(null);
  
  useEffect(() => {
    setMounted(true);
    fetch('/api/cms/about')
      .then(res => res.json())
      .then(d => {
        if (d && !d.error) setData(d);
      });
  }, []);

  if (!mounted || !data) return null;

  return <AboutContent data={data} />;
}

function AboutContent({ data }: { data: AboutData }) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for the image
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative w-full bg-[#050505] py-32 md:py-48 overflow-hidden z-20 border-t border-white/5"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative flex flex-col md:flex-row items-start">
        
        {/* Decorative Asterisk */}
        <div className="absolute left-0 top-1/4 -translate-x-1/2 md:-translate-x-1/2 z-10 opacity-80 pointer-events-none">
          <svg width="120" height="120" viewBox="0 0 100 100" className="fill-white animate-spin-slow" style={{ animationDuration: '20s' }}>
            <path d="M45 0h10v35.5L80.1 10.4l7.1 7.1L62.1 42.6H95v10H62.1l25.1 25.1-7.1 7.1L55 59.7V95H45V59.7L19.9 84.8l-7.1-7.1L37.9 52.6H5v-10h32.9L12.8 17.5l7.1-7.1L45 35.5V0z" />
          </svg>
        </div>

        {/* Left Column: Image & Socials */}
        <div className="w-full md:w-[45%] relative z-10 pl-0 md:pl-12">
          <div className="relative w-full aspect-[3/4] overflow-hidden rounded-sm bg-[#111] shadow-2xl">
            <motion.div 
              className="absolute inset-[-15%] w-[130%] h-[130%]"
              style={{ y }}
            >
              <Image
                src={data.imageSrc || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"}
                alt="About Me"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                unoptimized
              />
            </motion.div>
          </div>
          
          {/* Social Icons */}
          <div className="flex gap-8 mt-12 justify-center md:justify-center w-full">
            <SocialLink href={data.twitter} icon={<Twitter className="w-6 h-6" />} />
            <SocialLink href={data.facebook} icon={<Facebook className="w-6 h-6" />} />
            <SocialLink href={data.instagram} icon={<Instagram className="w-6 h-6" />} />
          </div>
        </div>

        {/* Right Column: Text Content */}
        <div className="w-full md:w-[55%] relative z-20 mt-20 md:mt-12 flex flex-col">
          {/* Overlapping Heading */}
          <h2 className="text-[18vw] md:text-[9vw] font-syne font-bold leading-[0.85] tracking-tighter text-white md:-ml-[15%] relative z-30 mb-12 mix-blend-difference uppercase">
            {data.heading || "ABOUT ME"}
          </h2>
          
          <div className="pl-0 md:pl-12 max-w-2xl self-end md:self-start">
            <p className="text-[#b0b0c0] text-lg md:text-xl leading-relaxed font-instrument mb-8">
              {data.desc1}
            </p>
            
            <p className="text-[#b0b0c0] text-lg md:text-xl leading-relaxed font-instrument mb-16">
              {data.desc2}
            </p>

            {/* Decorative Rectangle */}
            <div className="w-24 h-4 bg-[#6930c3] ml-auto"></div>
          </div>
        </div>

      </div>
    </section>
  );
}

function SocialLink({ href, icon }: { href: string, icon: React.ReactNode }) {
  if (!href || href === '#') {
    return (
      <div className="text-white/20 cursor-not-allowed">
        {icon}
      </div>
    );
  }
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-white hover:text-[#00e1ab] transition-all hover:scale-110 duration-300"
    >
      {icon}
    </a>
  );
}
