import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative w-full py-16 px-6 sm:px-12 lg:px-24 bg-[#050505] z-50 border-t border-[#00e1ab]/30 overflow-hidden mt-auto">
      {/* Prominent glow to make it visible */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[150px] bg-gradient-to-b from-[#00e1ab]/10 to-transparent blur-[50px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00e1ab] to-transparent opacity-50" />
      
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="font-display text-3xl font-black tracking-widest text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">DEVELOPER</span>
          <p className="text-white/60 text-sm font-mono">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="flex gap-6">
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00e1ab] hover:text-[#0a0514] hover:scale-110 hover:shadow-[0_0_20px_rgba(0,225,171,0.4)] text-white transition-all duration-300">
            <Github size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00e1ab] hover:text-[#0a0514] hover:scale-110 hover:shadow-[0_0_20px_rgba(0,225,171,0.4)] text-white transition-all duration-300">
            <Linkedin size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00e1ab] hover:text-[#0a0514] hover:scale-110 hover:shadow-[0_0_20px_rgba(0,225,171,0.4)] text-white transition-all duration-300">
            <Twitter size={20} />
          </a>
          <a href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00e1ab] hover:text-[#0a0514] hover:scale-110 hover:shadow-[0_0_20px_rgba(0,225,171,0.4)] text-white transition-all duration-300">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
