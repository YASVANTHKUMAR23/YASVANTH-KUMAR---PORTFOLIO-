import React, { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

/**
 * YASVANTH KUMAR. -> YK. logo
 * 1. "YASVANTH KUMAR." is typed out with a blinking cursor.
 * 2. Every letter except the Y, the K and the full stop dims and collapses away.
 * 3. The remaining "YK." grows to the logo's size, then dissolves while the
 *    real logo shapes assemble in its place.
 * 4. Subtle radiant glow blooms at the end.
 *
 * Install: npm i gsap
 * Usage:   <AnimatedLogo width={720} />
 */

const NAVY = "#08152A";
const BLACK = "#000000";
const BLUE = "#025CFF";
const DIM = "#9AA3B2";

const NAME = "YASVANTH KUMAR.";
const KEEP = [0, 9, 14];
const CAP_HEIGHT = 0.72;
const LOGO_CAP = 478;

const FONT = '"Inter", "Plus Jakarta Sans", "Helvetica Neue", Arial, sans-serif';
const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface AnimatedLogoProps {
  width?: number;
  background?: string;
  replayOnClick?: boolean;
  className?: string;
  style?: React.CSSProperties;
  glow?: boolean;
  onComplete?: () => void;
  flyToNavbar?: boolean;
  targetLogoRect?: DOMRect | null;
}

export default function AnimatedLogo({
  width = 720,
  background = "#ffffff",
  replayOnClick = false,
  className,
  style,
  glow = false,
  onComplete,
  flyToNavbar = false,
  targetLogoRect = null,
}: AnimatedLogoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  useIsoLayoutEffect(() => {
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const build = () => {
      if (!rootRef.current || !stageRef.current) return;

      const $ = (sel: string) =>
        gsap.utils.toArray<HTMLElement>(rootRef.current?.querySelectorAll(sel) || []);
      const one = (sel: string) =>
        rootRef.current?.querySelector<HTMLElement | SVGElement>(sel) || null;

      const svgEl = one(".yk-svg");
      if (svgEl) {
        gsap.set(svgEl, { visibility: "visible" });
      }

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (onComplete) onComplete();
        return;
      }

      const W = stageRef.current.offsetWidth || width || 720;
      const startSize = W * 0.072;
      const endSize = (LOGO_CAP * (W / 880)) / CAP_HEIGHT;

      const text = one(".yk-text") as HTMLElement | null;
      const cursor = one(".yk-cursor") as HTMLElement | null;
      const line = one(".yk-line") as HTMLElement | null;
      const chars = $(".yk-char");
      const others = chars.filter((_, i) => !KEEP.includes(i));

      if (!text || !cursor || !line) return;

      gsap.set(text, { fontSize: startSize, opacity: 1 });

      // Gradient: each letter shows its own slice of one navy -> blue gradient
      const totalEm = line.offsetWidth / startSize || 1;
      chars.forEach((c) => {
        c.style.backgroundImage = `linear-gradient(90deg, ${NAVY}, ${BLUE})`;
        c.style.backgroundRepeat = "no-repeat";
        c.style.backgroundSize = `${totalEm}em 100%`;
        c.style.backgroundPosition = `${-(c.offsetLeft / startSize)}em 0`;
      });
      gsap.set(cursor, { x: 0, opacity: 1 });

      const tl = gsap.timeline();
      tlRef.current = tl;

      // 1. Typewriter
      let t = 0.5;
      chars.forEach((c, i) => {
        const x = c.offsetLeft + c.offsetWidth;
        tl.set(c, { opacity: 1 }, t);
        tl.set(cursor, { x }, t);
        t += i === 7 ? 0.28 : 0.065 + Math.random() * 0.075;
      });

      tl.to(
        cursor,
        { opacity: 0, duration: 0.18, repeat: 4, yoyo: true, ease: "steps(1)" },
        t + 0.1
      );
      tl.addLabel("dim", t + 1.0);

      // 2. Collapse away other letters
      tl.to(others, { opacity: 0.25, duration: 0.45, ease: "power1.inOut" }, "dim");
      tl.addLabel("collapse", "dim+=0.4");
      tl.to(
        others,
        {
          opacity: 0,
          width: 0,
          duration: 0.7,
          ease: "power3.inOut",
          stagger: { each: 0.04, from: "center" },
        },
        "collapse"
      );

      // 3. Grow and assemble logo
      tl.to(text, { fontSize: endSize, duration: 1.0, ease: "power3.inOut" }, "collapse+=0.35");
      tl.addLabel("morph", ">-0.1");
      tl.to(text, { opacity: 0, duration: 0.5, ease: "power2.out" }, "morph");

      const wedge = one(".yk-wedge");
      const ext = one(".yk-ext");
      const stem = one(".yk-stem");
      const leg = one(".yk-leg");
      const swooshRect = one(".yk-swoosh-rect");
      const dot = one(".yk-dot");
      const swoosh = one(".yk-swoosh");

      if (wedge) {
        tl.fromTo(
          wedge,
          { opacity: 0, x: -60, y: -30 },
          { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" },
          "morph"
        );
      }
      if (ext) {
        tl.fromTo(
          ext,
          { opacity: 0, x: -30, y: -55 },
          { opacity: 1, x: 0, y: 0, duration: 0.6, ease: "power3.out" },
          "morph+=0.12"
        );
      }
      if (stem) {
        tl.fromTo(
          stem,
          { opacity: 1, scaleY: 0, transformOrigin: "50% 100%" },
          { scaleY: 1, duration: 0.7, ease: "power3.out" },
          "morph+=0.05"
        );
      }
      if (leg) {
        tl.fromTo(
          leg,
          { opacity: 0, x: -45, y: -45 },
          { opacity: 1, x: 0, y: 0, duration: 0.7, ease: "power3.out" },
          "morph+=0.2"
        );
      }
      if (swooshRect) {
        tl.fromTo(
          swooshRect,
          { attr: { width: 0 } },
          { attr: { width: 880 }, duration: 0.9, ease: "power2.inOut" },
          "morph+=0.25"
        );
      }
      if (dot) {
        tl.fromTo(
          dot,
          { opacity: 0, scale: 0, transformOrigin: "50% 50%" },
          { opacity: 1, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.45)" },
          "morph+=0.6"
        );
      }

      // 4. Place into navbar position after animation finishes at the center
      if (flyToNavbar) {
        tl.addLabel("fly", "morph+=1.6");

        tl.call(() => {
          if (!stageRef.current) return;

          const stageRect = stageRef.current.getBoundingClientRect();
          const target =
            targetLogoRect && targetLogoRect.width > 0
              ? targetLogoRect
              : {
                  left: Math.max(20, window.innerWidth * 0.03),
                  top: 18,
                  width: 58,
                  height: 34,
                };

          const currentCenterX = stageRect.left + stageRect.width / 2;
          const currentCenterY = stageRect.top + stageRect.height / 2;
          const targetCenterX = target.left + target.width / 2;
          const targetCenterY = target.top + target.height / 2;

          const deltaX = targetCenterX - currentCenterX;
          const deltaY = targetCenterY - currentCenterY;
          const targetScale = target.width / stageRect.width;

          // Smoothly glide logo to navbar position
          gsap.to(stageRef.current, {
            x: deltaX,
            y: deltaY,
            scale: targetScale,
            duration: 0.85,
            ease: "power3.inOut",
          });

          // Softly fade background overlay to reveal the site seamlessly
          if (rootRef.current) {
            gsap.to(rootRef.current, {
              backgroundColor: "rgba(255, 255, 255, 0)",
              duration: 0.85,
              ease: "power2.out",
              onComplete: () => {
                if (onComplete) onComplete();
              },
            });
          }
        }, undefined, "fly");
      }
    };

    const start = () => {
      if (!cancelled && rootRef.current) {
        ctx = gsap.context(build, rootRef);
      }
    };

    if (typeof document !== "undefined" && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, [glow, flyToNavbar, targetLogoRect, onComplete, width]);

  return (
    <div
      ref={rootRef}
      className={className}
      onClick={replayOnClick ? () => tlRef.current && tlRef.current.restart() : undefined}
      aria-label="Yasvanth Kumar"
      role="img"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100%",
        width: "100%",
        overflow: "hidden",
        background,
        cursor: replayOnClick ? "pointer" : "default",
        ...style,
      }}
    >
      <div
        ref={stageRef}
        style={{
          position: "relative",
          width: `min(90vw, ${width}px)`,
          aspectRatio: "880 / 520",
          willChange: "transform",
        }}
      >
        <svg
          className="yk-svg"
          viewBox="380 250 880 520"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", visibility: "hidden" }}
          aria-hidden="true"
        >
          <defs>
            <mask id="yk-swoosh-mask" maskUnits="userSpaceOnUse" x="380" y="250" width="880" height="520">
              <rect className="yk-swoosh-rect" x="380" y="250" width="880" height="520" fill="#fff" />
            </mask>
          </defs>
          <polygon className="yk-wedge" fill={NAVY} points="397,272 528,272 622,443 491,443" />
          <polygon className="yk-ext" fill={NAVY} points="491,442 622,442 660,512 529,512" />
          <rect className="yk-stem" fill={NAVY} x="688" y="272" width="128" height="478" />
          <polygon className="yk-leg" fill={NAVY} points="816,440 826,476 1097,750 953,750 816,609" />
          <g mask="url(#yk-swoosh-mask)">
            <path
              className="yk-swoosh"
              fill={BLUE}
              d="M909,272 L1088,272 C1000,335 910,405 828,476 C775,522 730,565 688,609 C640,660 600,702 551,750 L404,750 C490,672 575,590 656,505 L688,474 C735,428 780,386 816,353 C850,322 880,298 909,272 Z"
            />
          </g>
          <circle className="yk-dot" fill={BLUE} cx="1171" cy="687" r="64" />
        </svg>

        <div
          className="yk-text"
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            fontFamily: FONT,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "0.01em",
            color: NAVY,
          }}
        >
          <span className="yk-line" style={{ position: "relative", display: "inline-block", whiteSpace: "pre" }}>
            {[...NAME].map((ch, i) => (
              <span
                key={i}
                className="yk-char"
                style={{
                  display: "inline-block",
                  overflow: "hidden",
                  whiteSpace: "pre",
                  opacity: 0,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {ch}
              </span>
            ))}
            <span
              className="yk-cursor"
              style={{
                position: "absolute",
                left: 0,
                top: "0.13em",
                width: "0.06em",
                height: "0.72em",
                background: NAVY,
                opacity: 0,
              }}
            />
          </span>
        </div>
      </div>
    </div>
  );
}
