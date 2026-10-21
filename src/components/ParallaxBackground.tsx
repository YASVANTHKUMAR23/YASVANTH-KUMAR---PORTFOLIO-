import React from 'react';
import { ParallaxLayer } from '../lib/smooth-scroll';

export const ParallaxBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Layer 0: Subtle Blueprint Dot Grid with Gentle Parallax Depth */}
      <ParallaxLayer speed={-0.05} className="absolute inset-0">
        <div className="w-full h-[150%] opacity-[0.38] bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:32px_32px]" />
      </ParallaxLayer>

      {/* Layer 1: Large Atmospheric Ambient Gradient Orbs (Hardware-accelerated) */}
      {/* Top Hero / About area soft blue aura */}
      <ParallaxLayer speed={-0.12} className="absolute -top-[10%] left-[15%]">
        <div className="w-[650px] h-[650px] rounded-full bg-gradient-to-br from-blue-200/35 via-sky-100/30 to-transparent blur-[110px]" />
      </ParallaxLayer>

      {/* Mid Projects area indigo glow */}
      <ParallaxLayer speed={-0.22} className="absolute top-[38%] right-[10%]">
        <div className="w-[700px] h-[700px] rounded-full bg-gradient-to-bl from-blue-100/40 via-indigo-100/30 to-transparent blur-[130px]" />
      </ParallaxLayer>

      {/* Lower Skills & Experience area cyan / violet glow */}
      <ParallaxLayer speed={-0.16} className="absolute top-[72%] left-[18%]">
        <div className="w-[800px] h-[800px] rounded-full bg-gradient-to-tr from-sky-100/40 via-blue-100/25 to-transparent blur-[140px]" />
      </ParallaxLayer>

      {/* Layer 2: Floating Technical Typographic Watermarks */}
      <ParallaxLayer speed={-0.28} className="absolute top-[30%] left-[4%]">
        <div className="text-slate-300/30 font-mono text-7xl font-extrabold tracking-tighter">
          &lt;/&gt;
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={-0.2} className="absolute top-[54%] right-[5%]">
        <div className="text-slate-300/35 font-mono text-6xl font-extrabold tracking-tighter">
          &#123; AI &#125;
        </div>
      </ParallaxLayer>

      <ParallaxLayer speed={-0.34} className="absolute top-[78%] left-[7%]">
        <div className="text-slate-300/25 font-mono text-8xl font-black tracking-widest">
          PYTHON
        </div>
      </ParallaxLayer>

      {/* Ambient Top Light Beam */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
    </div>
  );
};
export default ParallaxBackground;
