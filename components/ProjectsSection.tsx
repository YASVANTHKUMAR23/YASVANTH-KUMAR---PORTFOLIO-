"use client";

import React, { useState, useEffect } from "react";
import { MacbookScroll } from "./MacbookScroll";
import { FinderDesktop } from "./FinderDesktop";
import { ProjectCardModal } from "./ProjectCardModal";
import { Project } from "@/lib/types";

export const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
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

  return (
    <section id="projects" className="relative w-full bg-[#050505] overflow-hidden z-20 border-t border-white/5">
      <MacbookScroll
        title={
          <span className="text-white">
            Selected <span className="text-[#00e1ab]">Projects</span>
          </span>
        }
        src={
          <FinderDesktop
            data={projects}
            onFolderClick={(project) => setActiveProject(project)}
          />
        }
        showGradient={false}
      />
      <ProjectCardModal
        active={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
};
