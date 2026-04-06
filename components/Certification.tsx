'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring } from 'motion/react';
import { ZoomIn, X, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { Certification as CertificationType } from '@/lib/types';

export function Certification() {
  const [certifications, setCertifications] = useState<CertificationType[]>([]);
  const [selectedCert, setSelectedCert] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const res = await fetch('/api/cms/certifications');
        if (res.ok) {
          const data = await res.json();
          setCertifications(data);
        }
      } catch (error) {
        console.error('Failed to fetch certifications:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCertifications();
  }, []);

  const [scrollRange, setScrollRange] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const updateRange = () => {
      if (scrollRef.current) {
        const range = scrollRef.current.scrollWidth - window.innerWidth;
        // Add a bit of extra padding at the end, and ensure it's not negative
        setScrollRange(Math.max(0, range + 100));
      }
    };

    updateRange();

    const observer = new ResizeObserver(() => {
      updateRange();
    });

    observer.observe(scrollRef.current);
    window.addEventListener("resize", updateRange);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateRange);
    };
  }, [certifications]);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const textX = useTransform(scrollYProgress, [0, 1], ["0vw", "-100vw"]);

  // Calculate dynamic height based on number of items to ensure smooth scrolling without empty space
  const sectionHeight = certifications.length > 0 ? `${100 + (certifications.length * 50)}vh` : "100vh";

  return (
    <section id="certificates" ref={targetRef} style={{ height: sectionHeight }} className="relative bg-[#030303] border-t border-white/5 z-30">
      {loading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="text-[#00e1ab] animate-pulse">Loading certifications...</div>
        </div>
      ) : certifications.length === 0 ? (
        <div className="h-screen flex items-center justify-center">
          <div className="text-white/50">No certifications found.</div>
        </div>
      ) : (
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          {/* Text Container animated to slide out in sync with cards */}
          <motion.div style={{ x: textX }} className="absolute top-[100px] md:top-[120px] left-[20px] md:left-[80px] w-auto md:w-[40vw] z-50 pointer-events-none pr-8">
            <motion.h2
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-baseline text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tighter text-white"
            >
              <span className="font-accent italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#00e1ab] to-[#6E00FF] pr-1">Certi</span>
              <span>fications</span>
            </motion.h2>
            <p className="mt-4 text-white/60 font-sans text-base md:text-lg leading-[1.6] tracking-wide max-w-xl">
              Verified skills and professional achievements. Scroll to explore my certifications.
            </p>
          </motion.div>

          {/* Cards Container */}
          <motion.div ref={scrollRef} style={{ x }} className="flex gap-12 md:gap-24 px-[500px] md:px-[80px] items-center w-max mt-24 md:mt-0">
            {certifications.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} onClick={() => setSelectedCert(cert)} />
            ))}
          </motion.div>
        </div>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-5xl h-[80vh] bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,225,171,0.15)] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 z-20 p-3 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors border border-white/10"
                onClick={() => setSelectedCert(null)}
              >
                <X size={24} />
              </button>
              <div className="relative flex-1 w-full bg-black/40">
                <Image src={selectedCert.img} alt={selectedCert.title} fill className="object-contain p-4 md:p-8" unoptimized />
              </div>
              <div className="p-6 md:p-8 bg-white/5 border-t border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl md:text-3xl font-display font-bold text-white">{selectedCert.title}</h3>
                  <p className="text-[#00e1ab] mt-1 text-sm md:text-base font-mono">{selectedCert.issuer} • {selectedCert.date}</p>
                  <p className="text-white/60 mt-3 text-base font-sans max-w-2xl">{selectedCert.desc}</p>
                </div>
                <a
                  href={selectedCert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#6E00FF] hover:bg-[#8B33FF] text-white rounded-full font-medium transition-colors whitespace-nowrap"
                >
                  View Credential <ExternalLink size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function CertCard({ cert, index, onClick }: { cert: any, index: number, onClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative group cursor-pointer w-[85vw] md:w-[500px] shrink-0 [perspective:1000px]"
      onClick={onClick}
    >
      {/* Gradient Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-[#00e1ab] via-[#6E00FF] to-[#00e1ab] rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 z-0" />

      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-10"
      >
        <Image
          src={cert.img}
          alt={cert.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />

        <div
          className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500"
          style={{ transform: "translateZ(50px)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#00e1ab] font-mono text-xs uppercase tracking-wider">{cert.issuer}</span>
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0">
              <ZoomIn size={18} />
            </div>
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-2 leading-tight">{cert.title}</h3>
          <p className="text-white/60 font-sans text-sm md:text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {cert.desc}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

