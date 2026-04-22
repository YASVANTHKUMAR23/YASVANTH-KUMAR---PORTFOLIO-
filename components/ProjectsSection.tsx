"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { MacbookScroll } from "./MacbookScroll";
import { FinderDesktop } from "./FinderDesktop";
import { ProjectCardModal } from "./ProjectCardModal";
import { Project } from "@/lib/types";

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/cms/projects");
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  if (!mounted) return null;

  return (
    <ProjectsContent 
      projects={projects} 
      activeProject={activeProject} 
      setActiveProject={setActiveProject} 
    />
  );
};

function ProjectsContent({ 
  projects, 
  activeProject, 
  setActiveProject 
}: { 
  projects: Project[], 
  activeProject: Project | null, 
  setActiveProject: (p: Project | null) => void 
}) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Screen-covering background text parallax/size effects
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.2, 0.2, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1.2]);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="relative w-full bg-[#050505] overflow-x-clip z-20 border-t border-white/5"
    >
      {/* Massive Screen-Covering Background Text */}
      <motion.div 
        style={{ opacity, scale }}
        className="fixed inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <h2 className="text-[25vw] font-syne font-black text-white mix-blend-overlay opacity-30 select-none leading-none tracking-tighter whitespace-nowrap">
          PROJECTS
        </h2>
      </motion.div>

      <div className="relative z-10">
        <MacbookScroll
          title={
            <div className="flex flex-col items-center gap-4">
              <motion.span 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-white tracking-tighter"
              >
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00e1ab] to-[#6930c3]">Projects</span>
              </motion.span>
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.6 }}
                transition={{ delay: 0.5 }}
                className="text-sm md:text-base text-white/60 font-mono tracking-widest uppercase mt-4 max-w-xl text-center"
              >
                Open the folder to get access the project card information
              </motion.p>
            </div>
          }
          src={
            <FinderDesktop
              data={projects}
              onFolderClick={(project) => setActiveProject(project)}
            />
          }
          showGradient={false}
        />
      </div>

      <ProjectCardModal
        active={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
