"use client";
import { motion, Variants } from "motion/react";
import { FooterData } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export function StickyFooter({ data }: { data: FooterData }) {
  const [footerHeight, setFooterHeight] = useState(0);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    
    const observer = new ResizeObserver(() => {
      if (footerRef.current) {
        setFooterHeight(footerRef.current.offsetHeight);
      }
    });
    
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      className="relative w-full"
      style={{ 
        height: footerHeight ? `${footerHeight}px` : 'auto',
      }}
    >
      <div className="fixed bottom-0 left-0 w-full -z-10">
        <footer 
          ref={footerRef}
          className="w-full bg-[#050505] border-t border-white/5 py-20 px-6 md:px-12 flex items-center justify-center"
        >
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            variants={containerVariants}
            className="relative w-full max-w-6xl bg-white rounded-[2rem] p-8 md:p-16 shadow-2xl"
          >
            {/* Tape Top Left */}
            <div className="absolute -top-4 -left-4 md:-top-6 md:-left-8 w-24 md:w-32 h-8 md:h-12 bg-[#00e1ab] -rotate-12 rounded-sm shadow-md z-10" />
            {/* Tape Top Right */}
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-8 w-24 md:w-32 h-8 md:h-12 bg-[#6930c3] rotate-12 rounded-sm shadow-md z-10" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24 text-center md:text-left">
              {/* Brand Column */}
              <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 tracking-tight font-display">
                  {data?.name || "YASVANTH KUMAR N"}
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed font-instrument">
                  {data?.description || "Crafting intuitive, user-centered digital experiences that drive engagement and business value."}
                </p>
              </motion.div>

              {/* Navigation */}
              <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
                <h3 className="text-gray-400 font-semibold tracking-wider uppercase text-sm font-sans mb-8">Navigation</h3>
                <ul className="flex flex-col items-center md:items-start gap-4">
                  {(data?.navLinks || []).map((link, idx) => (
                    <li key={idx}>
                      <a href={link.href} className="text-gray-600 hover:text-black transition-all hover:scale-105 inline-block font-medium text-base font-sans capitalize">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Socials */}
              <motion.div variants={itemVariants} className="flex flex-col items-center md:items-start">
                <h3 className="text-gray-400 font-semibold tracking-wider uppercase text-sm font-sans mb-8">Social Presence</h3>
                <ul className="flex flex-col items-center md:items-start gap-4">
                  {(data?.socialLinks || []).map((link, idx) => (
                    <li key={idx}>
                      <a href={link.url} target="_blank" className="text-gray-600 hover:text-black transition-all hover:scale-105 inline-block font-medium text-base font-sans capitalize">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center text-center">
              <p className="text-gray-400 text-sm font-mono tracking-widest uppercase">
                {data?.copyright || "© 2026 YASVANTH KUMAR N. ALL RIGHTS RESERVED."}
              </p>
            </div>
          </motion.div>
        </footer>
      </div>
    </div>
  );
}
