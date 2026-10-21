import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { TechToolPill } from "../TechToolPill";

export interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  badge?: string;
  tags?: string[];
  features?: string[];
  githubUrl?: string;
  projectUrl?: string;
}

export interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}

export interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}

export interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
  onSelectProject?: (project: Testimonial) => void;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
  onSelectProject,
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex] || testimonials[0],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay && testimonialsLength > 1) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 6000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.9,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.9,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) translateY(0px) scale(0.7) rotateY(0deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -15 },
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto p-4 sm:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Side: 3D Image Carousel Container */}
        <div className="lg:col-span-6 w-full flex justify-center">
          <div
            className="relative w-full max-w-[480px] h-[300px] sm:h-[380px] [perspective:1000px] flex items-center justify-center"
            ref={imageContainerRef}
          >
            {testimonials.map((testimonial, index) => (
              <img
                key={testimonial.src + index}
                src={testimonial.src}
                alt={testimonial.name}
                data-index={index}
                onClick={() => {
                  setActiveIndex(index);
                  if (onSelectProject) onSelectProject(testimonial);
                }}
                className="absolute w-[86%] sm:w-[88%] h-full object-cover rounded-2xl sm:rounded-3xl shadow-[0_12px_35px_rgba(0,0,0,0.18)] cursor-pointer select-none border border-white/60"
                style={getImageStyle(index)}
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            ))}
          </div>
        </div>

        {/* Right Side: Animated Content & Featured Details */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="space-y-4"
            >
              {/* Featured Badge */}
              <div className="flex items-center gap-2">
                <span className="px-3.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-[#2563eb] border border-blue-100">
                  {activeTestimonial.badge || "Featured Project"}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  0{activeIndex + 1} / 0{testimonialsLength}
                </span>
              </div>

              {/* Project Title */}
              <h3
                className="font-extrabold tracking-tight leading-tight"
                style={{ color: colorName, fontSize: fontSizeName }}
              >
                {activeTestimonial.name}
              </h3>

              {/* Designation / Category */}
              <p
                className="font-medium"
                style={{ color: colorDesignation, fontSize: fontSizeDesignation }}
              >
                {activeTestimonial.designation}
              </p>

              {/* Quote / Narrative Description with word-by-word reveal */}
              <motion.p
                className="leading-relaxed text-slate-600 font-normal"
                style={{ color: colorTestimony, fontSize: fontSizeQuote }}
              >
                {activeTestimonial.quote.split(" ").map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{
                      filter: "blur(6px)",
                      opacity: 0,
                      y: 4,
                    }}
                    animate={{
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                      delay: 0.015 * i,
                    }}
                    className="inline-block"
                  >
                    {word}&nbsp;
                  </motion.span>
                ))}
              </motion.p>

              {/* Tags with Logos */}
              {activeTestimonial.tags && activeTestimonial.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {activeTestimonial.tags.map((tag) => (
                    <TechToolPill key={tag} tool={tag} />
                  ))}
                </div>
              )}

              {/* Key Features bullet points if present */}
              {activeTestimonial.features && activeTestimonial.features.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-800 block mb-2">
                    Key Features
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {activeTestimonial.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb] shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Action & Arrow Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-4">
            <div className="flex items-center gap-3">
              <a
                href={activeTestimonial.projectUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#0a0f1c] hover:bg-black text-white text-xs font-semibold rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>View Project</span>
                <span className="text-sm">↗</span>
              </a>

              <a
                href={activeTestimonial.githubUrl || "https://github.com/YASVANTHKUMAR23"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-semibold rounded-full shadow-sm transition-all flex items-center gap-1.5"
              >
                <span>Source Code</span>
              </a>
            </div>

            {/* Navigation Arrows with hover state */}
            <div className="flex items-center gap-2.5">
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors border-none"
                onClick={handlePrev}
                style={{
                  backgroundColor: hoverPrev ? colorArrowHoverBg : colorArrowBg,
                }}
                onMouseEnter={() => setHoverPrev(true)}
                onMouseLeave={() => setHoverPrev(false)}
                aria-label="Previous project"
              >
                <FaArrowLeft size={16} color={colorArrowFg} />
              </button>
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-colors border-none"
                onClick={handleNext}
                style={{
                  backgroundColor: hoverNext ? colorArrowHoverBg : colorArrowBg,
                }}
                onMouseEnter={() => setHoverNext(true)}
                onMouseLeave={() => setHoverNext(false)}
                aria-label="Next project"
              >
                <FaArrowRight size={16} color={colorArrowFg} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
