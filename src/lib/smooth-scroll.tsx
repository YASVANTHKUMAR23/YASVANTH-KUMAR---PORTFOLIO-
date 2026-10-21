import React, { createContext, useContext, useEffect, useRef, useState, useCallback } from 'react';
import Lenis from 'lenis';

export interface SmoothScrollContextValue {
  lenis: Lenis | null;
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number; immediate?: boolean }) => void;
  isReducedMotion: boolean;
  isCoarsePointer: boolean;
}

const SmoothScrollContext = createContext<SmoothScrollContextValue>({
  lenis: null,
  scrollTo: () => {},
  isReducedMotion: false,
  isCoarsePointer: false,
});

// High-performance subscriber registry for unified requestAnimationFrame loop
type ScrollCallback = (scrollY: number, velocity: number) => void;
const subscribers = new Set<ScrollCallback>();

export const registerScrollSubscriber = (callback: ScrollCallback) => {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
};

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);

  useEffect(() => {
    // Check user preferences & device capabilities
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const coarsePointerQuery = window.matchMedia('(pointer: coarse)');

    const prefersReducedMotion = reducedMotionQuery.matches;
    const hasCoarsePointer = coarsePointerQuery.matches;

    setIsReducedMotion(prefersReducedMotion);
    setIsCoarsePointer(hasCoarsePointer);

    let lenis: Lenis | null = null;
    let rafId: number | null = null;

    try {
      // 1. Smooth Scroll Engine Initialization with optimized interpolation parameters
      lenis = new Lenis({
        lerp: prefersReducedMotion ? 1 : 0.085, // Silky smooth linear interpolation
        wheelMultiplier: 0.95, // Normalized wheel step multiplier
        touchMultiplier: 1.1,
        smoothWheel: !prefersReducedMotion,
        autoResize: true,
      });

      lenisRef.current = lenis;
      setLenisInstance(lenis);

      // Listen to scroll events to trigger subscribers
      lenis.on('scroll', (e: { scroll: number; velocity: number }) => {
        subscribers.forEach((cb) => {
          try {
            cb(e.scroll, e.velocity || 0);
          } catch {
            // Ignore subscriber errors to keep frame loop healthy
          }
        });
      });

      // 2. Unified requestAnimationFrame Loop synchronized with Lenis
      const raf = (time: number) => {
        lenis?.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);
    } catch (err) {
      // 5. Graceful Fallback: Browser native scrolling continues unaffected if Lenis fails
      console.warn('Smooth scroll initialization fallback to native:', err);
    }

    // Media query change listeners
    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
      if (lenis) {
        // Toggle smooth wheel behavior dynamically
        lenis.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      }
    };

    const handlePointerChange = (e: MediaQueryListEvent) => {
      setIsCoarsePointer(e.matches);
    };

    reducedMotionQuery.addEventListener('change', handleMotionChange);
    coarsePointerQuery.addEventListener('change', handlePointerChange);

    return () => {
      reducedMotionQuery.removeEventListener('change', handleMotionChange);
      coarsePointerQuery.removeEventListener('change', handlePointerChange);

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }

      if (lenis) {
        lenis.destroy();
        lenisRef.current = null;
        setLenisInstance(null);
      }
    };
  }, []);

  // Programmatic scroll helper with graceful fallback
  const scrollTo = useCallback(
    (target: string | HTMLElement | number, options?: { offset?: number; duration?: number; immediate?: boolean }) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, {
          offset: options?.offset ?? 0,
          duration: options?.immediate ? 0 : options?.duration ?? 1.1,
          immediate: options?.immediate,
        });
      } else {
        // Fallback for native window scroll
        if (typeof target === 'number') {
          window.scrollTo({
            top: target + (options?.offset ?? 0),
            behavior: options?.immediate ? 'auto' : 'smooth',
          });
        } else if (typeof target === 'string') {
          const el = target.startsWith('#') ? document.querySelector(target) : document.getElementById(target);
          if (el) {
            const top = el.getBoundingClientRect().top + window.pageYOffset + (options?.offset ?? 0);
            window.scrollTo({ top, behavior: options?.immediate ? 'auto' : 'smooth' });
          }
        } else if (target instanceof HTMLElement) {
          const top = target.getBoundingClientRect().top + window.pageYOffset + (options?.offset ?? 0);
          window.scrollTo({ top, behavior: options?.immediate ? 'auto' : 'smooth' });
        }
      }
    },
    []
  );

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        isReducedMotion,
        isCoarsePointer,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
};

export const useSmoothScroll = () => useContext(SmoothScrollContext);

/**
 * High-performance Parallax Layer Component
 * Uses CSS transform3d and will-change to avoid layout thrashing and maintain 60/120fps GPU compositing.
 */
interface ParallaxLayerProps {
  speed?: number; // e.g. -0.1 to -0.4 for background drifting upward as you scroll down
  scaleFactor?: number; // subtle scaling based on depth
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  speed = -0.15,
  scaleFactor = 0,
  className = '',
  style = {},
  children,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion, isCoarsePointer } = useSmoothScroll();

  useEffect(() => {
    // If reduced motion is preferred, bypass transforms completely for accessibility
    if (isReducedMotion) {
      if (elementRef.current) {
        elementRef.current.style.transform = 'translate3d(0, 0, 0)';
      }
      return;
    }

    // Dampen parallax speed on mobile / coarse pointer to preserve smooth performance
    const effectiveSpeed = isCoarsePointer ? speed * 0.35 : speed;

    const unsubscribe = registerScrollSubscriber((scrollY) => {
      if (!elementRef.current) return;

      const offset = scrollY * effectiveSpeed;
      const scaleStr = scaleFactor !== 0 ? ` scale(${1 + (scrollY * scaleFactor) / 1000})` : '';

      // Direct GPU transform update without triggering browser reflow or paint
      elementRef.current.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)${scaleStr}`;
    });

    return unsubscribe;
  }, [speed, scaleFactor, isReducedMotion, isCoarsePointer]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        willChange: isReducedMotion ? 'auto' : 'transform',
        transform: 'translate3d(0, 0, 0)',
        ...style,
      }}
    >
      {children}
    </div>
  );
};
