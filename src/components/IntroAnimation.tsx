import React from 'react';
import AnimatedLogo from './AnimatedLogo';

interface IntroAnimationProps {
  onComplete: () => void;
  targetLogoRect: DOMRect | null;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete, targetLogoRect }) => {
  return (
    <div
      className="fixed inset-0 z-[9999] select-none flex items-center justify-center bg-white pointer-events-auto"
      onClick={(e) => {
        // Prevent any screen clicks from restarting or resetting the intro animation
        e.stopPropagation();
      }}
    >
      {/* Quick Skip Option */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onComplete();
        }}
        className="absolute bottom-8 right-8 z-[10001] px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-800 bg-slate-50 hover:bg-slate-100 rounded-full transition-all border border-slate-200/80 shadow-xs cursor-pointer"
        aria-label="Skip intro animation"
      >
        Skip Intro ✕
      </button>

      {/* Modern Center Animated Logo with smooth flight into the navbar */}
      <AnimatedLogo
        width={720}
        glow={false}
        flyToNavbar={true}
        replayOnClick={false}
        targetLogoRect={targetLogoRect}
        onComplete={onComplete}
      />
    </div>
  );
};
