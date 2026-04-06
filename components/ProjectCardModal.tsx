"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { Project } from "@/lib/types";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { ArticleCard } from "@/components/ui/card-23";

export const ProjectCardModal = ({
  active,
  onClose,
}: {
  active: Project | null;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

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

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active, onClose]);

  useOutsideClick(ref, () => onClose());

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              ref={ref}
              className="w-full max-w-[500px] flex flex-col rounded-3xl relative group"
              style={{ perspective: 1000 }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-full h-full flex flex-col rounded-3xl relative z-10"
              >
                <ArticleCard
                  tag={active.tag}
                  date={active.date}
                  title={active.title}
                  description={active.description}
                  imageUrl={active.imageUrl}
                  imageAlt={active.title}
                  location={active.location}
                  className="w-full h-full border-0 shadow-2xl rounded-3xl"
                  variants={{}} // Disable internal hover animation to avoid conflict with 3D tilt
                  whileHover={undefined}
                >
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.05 } }}
                    className="absolute top-4 right-4 z-30 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full h-8 w-8 transition-colors"
                    onClick={onClose}
                  >
                    <CloseIcon />
                  </motion.button>
                  {active.tech && active.tech.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.15 }}
                      className="flex flex-wrap gap-2 mb-6"
                    >
                      {active.tech.map((t) => (
                        <span
                          key={t}
                          className="font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full font-semibold"
                        >
                          {t}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-4"
                  >
                    {active.github && (
                      <a
                        href={active.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-3 text-sm rounded-full font-bold border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                      >
                        GitHub
                      </a>
                    )}
                    {active.demo && (
                      <a
                        href={active.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center px-4 py-3 text-sm rounded-full font-bold bg-[#00e1ab] text-[#004a36] hover:bg-[#00f0b7] transition-colors"
                      >
                        Live Demo
                      </a>
                    )}
                  </motion.div>
                </ArticleCard>

                <GlowingEffect blur={0} borderWidth={3} glow={true} className="z-50" />
              </motion.div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
};
