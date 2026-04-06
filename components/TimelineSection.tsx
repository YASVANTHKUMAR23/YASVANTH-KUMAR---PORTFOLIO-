'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Briefcase, Trophy, Code, MapPin, PenTool, Layout, Star, Loader2 } from 'lucide-react';
import { Experience } from '@/lib/types';

const availableIcons = [
  { name: 'Briefcase', icon: Briefcase },
  { name: 'Trophy', icon: Trophy },
  { name: 'Code', icon: Code },
  { name: 'Layout', icon: Layout },
  { name: 'Star', icon: Star },
  { name: 'PenTool', icon: PenTool },
];

export function TimelineSection() {
  const [timelineData, setTimelineData] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch('/api/cms/experience');
        if (res.ok) {
          const data = await res.json();
          // Sort by date or id descending
          setTimelineData(data.sort((a: Experience, b: Experience) => b.id - a.id));
        }
      } catch (error) {
        console.error("Failed to fetch timeline data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  return (
    <section id="timeline" className="relative w-full bg-[#050505] border-t border-white/5 min-h-screen">
      {loading ? (
        <div className="py-32 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#00e1ab]" />
        </div>
      ) : (
        <TimelineContent timelineData={timelineData} />
      )}
    </section>
  );
}

function TimelineContent({ timelineData }: { timelineData: Experience[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <>
      {/* Hero Section for Timeline */}
      <TimelineHero />

      <div className="relative z-10 pb-32 pt-16">
        <div ref={containerRef} className="relative w-full max-w-6xl mx-auto flex flex-col px-4 sm:px-8">
          {/* SVG Path */}
          <div className="absolute inset-0 z-0 hidden md:block">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pathGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00e1ab" />
                  <stop offset="50%" stopColor="#6930c3" />
                  <stop offset="100%" stopColor="#00e1ab" />
                </linearGradient>
              </defs>
              
              {/* Desktop Path */}
              <path
                d="M 70 0 C 70 5, 30 5, 30 10 C 30 20, 70 20, 70 30 C 70 40, 30 40, 30 50 C 30 60, 70 60, 70 70 C 70 80, 30 80, 30 90 C 30 95, 70 95, 70 100"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="2"
                fill="none"
                vectorEffect="non-scaling-stroke"
              />
              <motion.path
                d="M 70 0 C 70 5, 30 5, 30 10 C 30 20, 70 20, 70 30 C 70 40, 30 40, 30 50 C 30 60, 70 60, 70 70 C 70 80, 30 80, 30 90 C 30 95, 70 95, 70 100"
                stroke="url(#pathGradient)"
                strokeWidth="4"
                fill="none"
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: scrollYProgress }}
              />
            </svg>
          </div>

          {/* Mobile Path */}
          <div className="absolute left-8 sm:left-12 top-0 bottom-0 w-[2px] bg-white/5 md:hidden z-0" />
          <motion.div 
            className="absolute left-8 sm:left-12 top-0 w-[4px] -ml-[1px] bg-gradient-to-b from-[#00e1ab] via-[#6930c3] to-[#00e1ab] md:hidden z-0 origin-top"
            style={{ scaleY: scrollYProgress }}
          />

          {/* Timeline Items */}
          <div className="flex flex-col gap-12 md:gap-0">
            {timelineData.map((item, index) => (
              <TimelineItem key={item.id} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function TimelineHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ opacity, scale, y: textY }} className="text-center z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-white mb-6 tracking-tighter drop-shadow-2xl brightness-125">
            <span className="font-accent italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#00e1ab] to-[#6930c3] pr-2 -mr-2 drop-shadow-xl brightness-150">Exp</span>erience
          </h1>
          <p className="text-xl md:text-2xl text-white font-instrument max-w-2xl mx-auto drop-shadow-xl font-medium brightness-125">
            A cinematic journey through my professional timeline and design achievements.
          </p>
        </motion.div>
      </motion.div>

      {/* Floating Glass Cards */}
      <motion.div 
        style={{ y: y1 }} 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
        className="absolute left-[5%] md:left-[10%] lg:left-[15%] top-[20%] p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hidden md:flex flex-col items-center gap-4 hover:bg-white/10 transition-colors"
      >
        <div className="w-16 h-16 rounded-full bg-[#00e1ab]/20 flex items-center justify-center">
          <Briefcase className="w-8 h-8 text-[#00e1ab]" />
        </div>
        <div className="text-center">
          <h3 className="text-white font-bold font-display text-lg drop-shadow-sm">Roles</h3>
          <p className="text-gray-300 text-sm font-mono font-medium">3+ Positions</p>
        </div>
      </motion.div>

      <motion.div 
        style={{ y: y2 }} 
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
        className="absolute right-[5%] md:right-[10%] lg:right-[15%] bottom-[20%] p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] hidden md:flex flex-col items-center gap-4 hover:bg-white/10 transition-colors"
      >
        <div className="w-16 h-16 rounded-full bg-[#6930c3]/20 flex items-center justify-center">
          <Trophy className="w-8 h-8 text-[#6930c3]" />
        </div>
        <div className="text-center">
          <h3 className="text-white font-bold font-display text-lg drop-shadow-sm">Hackathons</h3>
          <p className="text-gray-300 text-sm font-mono font-medium">Global Winner</p>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-gray-500 text-xs font-mono uppercase tracking-widest animate-pulse mb-4">Scroll</span>
        <div className="w-[2px] md:w-[4px] h-32 bg-gradient-to-b from-transparent via-[#00e1ab] to-[#00e1ab]" />
      </motion.div>
    </section>
  );
}

function TimelineItem({ item, index }: { item: Experience; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Card animations
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, -100]);

  // Node animations
  const nodeScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.5, 1.2, 0.8]);
  const nodeGlow = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [
    "0px 0px 0px rgba(0,0,0,0)",
    "0px 0px 20px rgba(0, 225, 171, 0.8)",
    "0px 0px 0px rgba(0,0,0,0)"
  ]);

  // Icon animations
  const iconScale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.8, 1.1, 0.8]);
  const iconRotate = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [-10, 0, 10]);

  const Icon = availableIcons.find(i => i.name === item.icon)?.icon || Briefcase;

  return (
    <div ref={ref} className="relative md:h-[450px] w-full flex items-center z-10 py-8 md:py-0">
      {/* Node */}
      <motion.div
        className={`absolute w-6 h-6 rounded-full bg-black border-4 border-[#00e1ab] z-20 -translate-x-1/2 md:-translate-y-1/2 
          left-8 sm:left-12 top-8 md:top-1/2
          ${item.isLeftNode ? 'md:left-[30%]' : 'md:left-[70%]'}`}
        style={{
          scale: nodeScale,
          boxShadow: nodeGlow
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Date & Location Box */}
      <motion.div
        className={`absolute z-10 flex flex-col
          /* Mobile: positioned above the card */
          top-0 left-20 sm:left-24
          /* Desktop: vertically centered, opposite side */
          md:top-1/2 md:-translate-y-1/2
          ${item.isLeftNode 
            ? 'md:right-[75%] md:left-auto md:items-end md:text-right' 
            : 'md:left-[75%] md:right-auto md:items-start md:text-left'}
        `}
        style={{ scale, opacity, y }}
      >
        <div className="inline-flex flex-col gap-1.5 p-3 md:p-4 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <span className="text-[#00e1ab] font-mono text-sm md:text-base font-bold tracking-wider uppercase">{item.date}</span>
          <span className="text-gray-400 text-xs md:text-sm font-medium flex items-center gap-1.5">
            <MapPin size={14} className="text-gray-500" />
            {item.location}
          </span>
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        className={`relative md:absolute w-[calc(100%-5rem)] sm:w-[calc(100%-6rem)] md:w-[42%] lg:w-[40%] 
          ml-20 sm:ml-24 mt-20 md:mt-0 md:ml-0
          ${item.isLeftNode 
            ? 'md:left-[38%] md:right-auto' 
            : 'md:right-[38%] md:left-auto'}
          p-6 sm:p-8 md:p-10 rounded-3xl border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] overflow-hidden group`}
        style={{ scale, opacity, y }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start gap-5">
          <motion.div 
            className="p-4 rounded-2xl bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0"
            style={{ scale: iconScale, rotate: iconRotate }}
          >
            <Icon size={28} className="sm:w-8 sm:h-8" />
          </motion.div>
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">{item.title}</h3>
            <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-instrument">{item.description}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
