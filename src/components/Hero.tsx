import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Download, MapPin, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeroProps {
  onViewWork: () => void;
  onDownloadResume: () => void;
  onSelectTech?: (techName: string) => void;
  introCompleted?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onViewWork,
  onDownloadResume,
  onSelectTech,
  introCompleted = true,
}) => {
  const [avatarSrc, setAvatarSrc] = useState(
    'https://github.com/YASVANTHKUMAR23/YASVANTH-PORTFOLIO/blob/main/public/avatar.png?raw=true'
  );
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  // Responsive device state for mobile & tablet adaptation while keeping desktop 100% untouched
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w >= 1024) {
        setDeviceType('desktop');
      } else if (w >= 768) {
        setDeviceType('tablet');
      } else {
        setDeviceType('mobile');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDesktop = deviceType === 'desktop';
  const isTablet = deviceType === 'tablet';
  const isMobile = deviceType === 'mobile';

  const techStack = [
    {
      name: 'Python',
      desc: 'FastAPI, PyTorch, LangChain, Automation, Data Pipelines',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
    },
    {
      name: 'Java',
      desc: 'Object-Oriented Architecture, Spring Boot, Data Structures',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
    },
    {
      name: 'LLM',
      desc: 'Prompt Engineering, Fine-tuning, RAG, Embeddings, Function Calling',
      customIcon: (
        <svg className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-[#0a0f1c] group-hover:-translate-y-1 transition-transform" viewBox="0 0 24 24" fill="currentColor">
          <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A6.0651 6.0651 0 0 0 19.0193 19.818a5.9847 5.9847 0 0 0 3.9977-2.9 6.0462 6.0462 0 0 0-.735-7.0968zM8.7505 5.6802a4.3575 4.3575 0 0 1 7.3756-1.5543l-8.4908 4.9026a1.1444 1.1444 0 0 1-1.1294 0L4.1704 7.6749a4.3414 4.3414 0 0 1 4.5801-1.9947zm-5.719 8.219a4.3592 4.3592 0 0 1 1.7061-7.3323l8.4907 4.9025v2.2573a1.146 1.146 0 0 1-.5647.9782L4.1705 19.5982a4.3404 4.3404 0 0 1-1.139-5.699zm14.6547 5.699a4.3592 4.3592 0 0 1-7.3757 1.5542l8.4908-4.9026a1.1444 1.1444 0 0 1 1.1294 0l2.3355 1.3536a4.3414 4.3414 0 0 1-4.58 1.9948zm5.719-8.219a4.3592 4.3592 0 0 1-1.7062 7.3323l-8.4907-4.9025v-2.2573a1.146 1.146 0 0 1 .5647-.9782l8.4931-4.903a4.3404 4.3404 0 0 1 1.1391 5.6987zm-11.419-5.4627l4.2465-2.4513a4.3575 4.3575 0 0 1 2.8711 7.248l-8.4908-4.9026a1.1444 1.1444 0 0 1 .3743-1.8941zm-1.1294 9.4052l-4.2465 2.4513a4.3575 4.3575 0 0 1-2.8711-7.248l8.4908 4.9026a1.1444 1.1444 0 0 1-.3743 1.8941z"/>
        </svg>
      ),
    },
    {
      name: 'Agents',
      desc: 'Autonomous Multi-Agent Swarms, Tool Calling, Planning & Reasoning',
      customIcon: (
        <div className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center text-slate-700 group-hover:-translate-y-1 transition-transform">
          <Bot className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 text-slate-700" />
        </div>
      ),
    },
    {
      name: 'React',
      desc: 'Interactive SPAs, TypeScript, State Management, Modern UI/UX',
      iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    },
  ];

  // Base typography style
  const typographyStyle: React.CSSProperties = isMobile
    ? {
        paddingTop: '4px',
        marginLeft: '0px',
        marginTop: '30px',
      }
    : {
        paddingTop: '4px',
      };

  // Arrow button style with silky spring pop-in
  const arrowButtonStyle: React.CSSProperties = isDesktop
    ? {
        marginTop: '134px',
        marginBottom: '0px',
        marginLeft: '0px',
        marginRight: '395px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'scale(1) rotate(0deg)' : 'scale(0.2) rotate(-30deg)',
        transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
      }
    : isTablet
    ? {
        top: '-12px',
        right: '18%',
        margin: '0',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'scale(1) rotate(0deg)' : 'scale(0.2) rotate(-30deg)',
        transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
      }
    : {
        top: '-8px',
        right: '4%',
        margin: '0',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'scale(1) rotate(0deg)' : 'scale(0.2) rotate(-30deg)',
        transition: 'opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s, transform 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.45s',
      };

  // 3D Avatar container with smooth modern upward scale transition
  const avatarContainerStyle: React.CSSProperties = isDesktop
    ? {
        marginLeft: '-3px',
        marginTop: '-190px',
        width: '740px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translateY(0px) scale(1)' : 'translateY(45px) scale(0.93)',
        transition: 'opacity 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s, transform 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s',
      }
    : isTablet
    ? {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-90px',
        width: '100%',
        maxWidth: '620px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translateY(0px) scale(1)' : 'translateY(35px) scale(0.93)',
        transition: 'opacity 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s, transform 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s',
      }
    : {
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '-30px',
        width: '100%',
        maxWidth: '390px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translateY(0px) scale(1)' : 'translateY(30px) scale(0.93)',
        transition: 'opacity 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s, transform 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.28s',
      };

  // Bottom Left: Location & Bio transition
  const bottomLeftStyle: React.CSSProperties = isDesktop
    ? {
        marginLeft: '40px',
        width: '314px',
        marginTop: '129px',
        marginBottom: '122px',
        marginRight: '-4px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translate(0px, 0px)' : 'translate(-25px, 20px)',
        transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.55s',
      }
    : isTablet
    ? {
        left: '20px',
        bottom: '24px',
        marginLeft: '40px',
        width: '314px',
        marginRight: '0px',
        marginBottom: '122px',
        marginTop: '129px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translate(0px, 0px)' : 'translate(-20px, 15px)',
        transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.55s',
      }
    : {
        position: 'relative',
        left: '0',
        bottom: '0',
        paddingLeft: '16px',
        paddingTop: '0px',
        marginTop: '129px',
        marginBottom: '122px',
        marginLeft: '40px',
        width: '314px',
        textAlign: 'center',
        maxWidth: '360px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translate(0px, 0px)' : 'translate(0px, 18px)',
        transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.55s, transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.55s',
      };

  // Bottom Right: Container transition
  const bottomRightStyle: React.CSSProperties = isDesktop
    ? {
        marginRight: '223px',
        marginTop: '0px',
        marginBottom: '0px',
        marginLeft: '0px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translate(0px, 0px)' : 'translate(25px, 20px)',
        transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.62s, transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.62s',
      }
    : isTablet
    ? {
        right: '16px',
        bottom: '16px',
        marginLeft: '0px',
        marginTop: '0px',
        marginBottom: '130px',
        paddingLeft: '1px',
        marginRight: '0px',
        transform: introCompleted ? 'scale(0.85) translate(0px, 0px)' : 'scale(0.85) translate(20px, 15px)',
        transformOrigin: 'bottom right',
        opacity: introCompleted ? 1 : 0,
        transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.62s, transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.62s',
      }
    : {
        position: 'relative',
        right: '0',
        bottom: '0',
        marginLeft: '180.262px',
        marginRight: '-4.7125px',
        marginTop: '-102px',
        paddingLeft: '24px',
        alignItems: 'center',
        transform: introCompleted ? 'scale(0.88) translate(0px, 0px)' : 'scale(0.88) translate(0px, 15px)',
        transformOrigin: 'top center',
        opacity: introCompleted ? 1 : 0,
        transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.62s, transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.62s',
      };

  // Tech Row Card transition
  const techRowStyle: React.CSSProperties = isDesktop
    ? {
        marginBottom: '53px',
        marginTop: '95px',
        marginRight: '-100px',
        marginLeft: '0px',
        paddingTop: '16px',
        paddingLeft: '18px',
        paddingRight: '18px',
        paddingBottom: '16px',
        height: '97.1px',
        width: '350px',
      }
    : isTablet
    ? {
        margin: '0 auto',
      }
    : {
        marginLeft: '-170px',
        width: '300.363px',
        marginRight: '60px',
        marginTop: '15px',
        paddingTop: '7px',
        marginBottom: '-2px',
      };

  const techWrapperStyle: React.CSSProperties | undefined = isDesktop
    ? {
        marginLeft: '40px',
        width: '108px',
      }
    : undefined;

  const handwrittenContainerStyle: React.CSSProperties = {
    marginLeft: '0px',
    marginBottom: '20px',
    marginTop: '0px',
    paddingRight: '16px',
  };

  const actionButtonsStyle: React.CSSProperties = isMobile
    ? {
        marginLeft: '0px',
        marginTop: '0px',
        marginBottom: '-124px',
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translateY(0px)' : 'translateY(24px)',
        transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
      }
    : {
        opacity: introCompleted ? 1 : 0,
        transform: introCompleted ? 'translateY(0px)' : 'translateY(24px)',
        transition: 'opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.5s, transform 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
      };

  const handwrittenStyle: React.CSSProperties | undefined = isDesktop
    ? {
        marginRight: '-145px',
        paddingLeft: '1px',
        marginBottom: '-82px',
        marginTop: '-22px',
        marginLeft: '-43px',
        height: '164.5px',
        width: '150.688px',
      }
    : isMobile
    ? {
        marginLeft: '0px',
        marginRight: '0px',
        fontSize: '24px',
        marginTop: '-18px',
      }
    : undefined;

  const heroSectionStyle: React.CSSProperties | undefined = isTablet
    ? {
        height: '889.6px',
        paddingTop: '15px',
        marginTop: '-3px',
        marginLeft: '0px',
      }
    : undefined;

  return (
    <section
      style={heroSectionStyle}
      className="relative w-full flex flex-col items-center justify-start pt-2 lg:pt-6 overflow-hidden min-h-[90vh] pb-16 selection:bg-[#2563eb] selection:text-white"
    >
      {/* Container for Typography and Greeting */}
      <div
        style={typographyStyle}
        className="max-w-[1600px] w-full mx-auto relative flex flex-col items-center z-10 px-4"
      >
        {/* Greeting Banner */}
        <div
          className={cn(
            'text-sm sm:text-base md:text-xl font-medium text-slate-600 mb-3 sm:mb-6 flex items-center gap-2 select-none transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
            introCompleted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none'
          )}
          style={{ transitionDelay: '80ms' }}
        >
          <span className="text-xl sm:text-3xl animate-waving-hand">👋</span>
          <span>, Hi, I'm </span>
          <span className="text-[#2563eb] font-bold tracking-tight">Yasvanth Kumar</span>
        </div>

        {/* Massive Typography Headings */}
        <div className="relative w-full flex flex-col items-center text-center select-none z-0">
          {/* Line 1: Solid Anton Text */}
          <h1
            className={cn(
              'font-massive text-[13.5vw] sm:text-[13vw] lg:text-[11vw] leading-[0.82] tracking-[-0.035em] text-[#0a0f1c] uppercase whitespace-nowrap relative transition-all duration-1300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              introCompleted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9 pointer-events-none'
            )}
            style={{ transitionDelay: '180ms' }}
          >
            <span
              style={{
                paddingLeft: '0px',
                paddingTop: '0px',
                marginLeft: '0px',
                marginTop: '0px',
                marginBottom: '0px',
              }}
              className="inline-block"
            >
              Python Developer
            </span>

            {/* Floating Arrow Badge (Top-right of Developer) - ALWAYS IN FRONT */}
            <button
              onClick={onViewWork}
              title="Explore Featured Work"
              aria-label="Explore Featured Work"
              style={arrowButtonStyle}
              className="absolute z-50 w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white rounded-full shadow-[0_0_30px_rgba(37,99,235,0.45)] ring-2 ring-blue-500/30 border border-blue-200 flex items-center justify-center group hover:scale-110 active:scale-95 cursor-pointer"
            >
              {/* Crisp, Bold Arrow Icon visible directly in front */}
              <ArrowUpRight className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-[#0a0f1c] stroke-[2.75] group-hover:text-[#2563eb] transition-colors relative z-10" />
            </button>
          </h1>

          {/* Line 2: Outlined Anton Text with Handwritten Marker Underline */}
          <div
            className={cn(
              'relative inline-block mt-2 lg:mt-3 transition-all duration-1300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              introCompleted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-9 pointer-events-none'
            )}
            style={{ transitionDelay: '320ms' }}
          >
            <h2 className="font-massive text-[13.5vw] sm:text-[13vw] lg:text-[11vw] leading-[0.85] tracking-[-0.035em] text-outline uppercase whitespace-nowrap">
              &amp; AI Engineer
            </h2>

            {/* Blue Hand-Drawn Underline SVG Marker under "Engineer" */}
            <svg
              className="absolute -bottom-2 sm:-bottom-5 lg:-bottom-7 right-0 w-[48%] h-auto text-[#2563eb] drop-shadow-sm pointer-events-none"
              viewBox="0 0 320 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18 Q 160 -4 314 12"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 400,
                  strokeDashoffset: introCompleted ? 0 : 400,
                  transition: 'stroke-dashoffset 1.75s cubic-bezier(0.16, 1, 0.3, 1) 550ms',
                }}
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 3D Avatar Area & Foreground Overlay */}
      <div className="relative w-full flex justify-center items-end mt-2 sm:mt-4 lg:mt-2 z-10 max-w-[1600px] mx-auto px-4">
        <div
          style={avatarContainerStyle}
          className="relative flex justify-center items-end"
        >
          {/* Luminous Soft Radial Glowing Aura behind Avatar */}
          <div className="avatar-glow animate-pulse-soft"></div>

          {/* Hand-drawn blue burst strokes above avatar's left shoulder */}
          <div className="absolute top-[28%] left-[16%] sm:left-[22%] z-20 pointer-events-none">
            <svg className="w-7 h-7 sm:w-10 sm:h-10 text-[#2563eb]" viewBox="0 0 50 50" fill="none">
              <path d="M12 25 L2 23" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M18 16 L10 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path d="M26 12 L28 2" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          </div>

          {/* 3D Avatar Image - large and crisp */}
          <img
            src={avatarSrc}
            onError={() => {
              if (avatarSrc !== 'https://file.tmper.app/image_1791100177849_bca181e3.png') {
                setAvatarSrc('https://file.tmper.app/image_1791100177849_bca181e3.png');
              }
            }}
            alt="Yasvanth Kumar - Python Developer & AI Engineer 3D Avatar"
            style={{
              transform: isDesktop ? 'scale(1.12)' : 'scale(1.04)',
              transformOrigin: 'bottom center',
            }}
            className="relative z-10 w-[92%] sm:w-[98%] md:w-full h-auto drop-shadow-2xl object-bottom select-none pointer-events-none transition-all duration-700"
            loading="eager"
            referrerPolicy="no-referrer"
          />

          {/* Centered Action Buttons Over Chest/Lower area of Avatar */}
          <div
            style={actionButtonsStyle}
            className="absolute bottom-5 sm:bottom-10 lg:bottom-14 flex flex-col sm:flex-row items-center gap-2.5 sm:gap-4 z-30 w-full sm:w-auto px-4 sm:px-0"
          >
            {/* View My Work Button */}
            <button
              onClick={onViewWork}
              style={isMobile ? { height: '44.6px' } : undefined}
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-[#0a0f1c] text-white text-xs sm:text-[15px] font-semibold rounded-full hover:bg-black transition-all duration-200 shadow-[0_10px_25px_rgba(10,15,28,0.35)] hover:shadow-[0_12px_30px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 active:translate-y-0 gap-2 w-full sm:w-auto cursor-pointer border border-slate-700/60 group"
            >
              <span>View My Work</span>
              <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>

            {/* Download Resume Button */}
            <button
              onClick={onDownloadResume}
              style={isMobile ? { height: '43.6px' } : undefined}
              className="inline-flex items-center justify-center px-6 sm:px-7 py-3 sm:py-3.5 bg-white text-[#0a0f1c] text-xs sm:text-[15px] font-semibold rounded-full hover:bg-slate-50 transition-all duration-200 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 active:translate-y-0 gap-2 w-full sm:w-auto cursor-pointer border border-slate-200 group"
            >
              <Download className="w-4 h-4 text-slate-500 group-hover:text-[#2563eb] transition-colors" />
              <span>Download Resume</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Left: Location & Bio */}
      <div
        style={bottomLeftStyle}
        className={`${
          isMobile ? 'block' : 'absolute left-6 lg:left-14 bottom-8 lg:bottom-16'
        } z-20 select-none`}
      >
        <div
          style={{
            fontSize: '17px',
            ...(isMobile ? { marginLeft: '-58px' } : {}),
          }}
          className={`flex items-center gap-2 text-slate-600 font-semibold mb-1 sm:mb-2 text-xs sm:text-sm lg:text-[15px] ${isMobile ? 'justify-center' : ''}`}
        >
          <MapPin className="w-4 h-4 text-[#2563eb] shrink-0" />
          <span style={isMobile ? { fontSize: '15px' } : undefined}>Based in Tamil Nadu, India.</span>
        </div>
        <p
          style={
            isMobile
              ? {
                  fontSize: '17px',
                  width: '330px',
                  marginLeft: '-36px',
                  textAlign: 'justify',
                }
              : {
                  fontSize: '19px',
                  width: '330px',
                  marginLeft: '-24px',
                  textAlign: 'justify',
                }
          }
          className="text-slate-500 text-xs lg:text-sm leading-relaxed font-normal"
        >
          I build modern web applications and AI-powered solutions that solve real-world problems.
        </p>
      </div>

      {/* Bottom Right: Handwritten Notes & Tech Stack Row */}
      <div
        style={bottomRightStyle}
        className={`${
          isMobile ? 'flex flex-col' : 'absolute right-6 lg:right-14 bottom-8 lg:bottom-14 flex flex-col items-end'
        } z-20 select-none`}
      >
        {/* Handwritten Notes & Drawn Curved Arrow */}
        <div
          style={handwrittenContainerStyle}
          className="relative flex items-center justify-center"
        >
          {/* Blue Hand-drawn Arrow swooping from Tech Stack toward Notes */}
          <svg
            className="absolute -left-12 sm:-left-16 lg:-left-20 -top-1 sm:-top-2 w-14 h-14 sm:w-18 sm:h-18 lg:w-24 lg:h-24 text-[#2563eb] pointer-events-none"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M92 82 Q 52 92 22 22"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M17 38 L22 22 L42 26"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Handwritten Vertical Words */}
          <div
            style={handwrittenStyle}
            className="font-handwriting text-base sm:text-xl lg:text-[26px] text-slate-600 font-semibold leading-tight flex flex-col items-center -rotate-6 tracking-wide"
          >
            <span>Ideas</span>
            <span>Code</span>
            <span>Build</span>
            <span>Improve</span>
            <span>Repeat</span>
          </div>
        </div>

        {/* Tech Stack Row */}
        <div style={techWrapperStyle} className="relative w-full flex justify-center">
          <div
            style={techRowStyle}
            className={`flex items-center justify-between gap-3 sm:gap-4 lg:gap-5 bg-white/90 backdrop-blur-md ${
              isDesktop ? '' : 'p-3 sm:p-3.5'
            } rounded-2xl sm:rounded-3xl border border-slate-100 shadow-[0_6px_25px_rgba(0,0,0,0.06)]`}
          >
            {techStack.map((tech) => (
              <div
                key={tech.name}
                onMouseEnter={() => setHoveredTech(tech.name)}
                onMouseLeave={() => setHoveredTech(null)}
                onClick={() => onSelectTech && onSelectTech(tech.name)}
                className="flex flex-col items-center gap-1 sm:gap-1.5 group cursor-pointer relative"
              >
                {tech.iconUrl ? (
                  <img
                    src={tech.iconUrl}
                    alt={tech.name}
                    className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 group-hover:-translate-y-1 transition-transform drop-shadow-sm"
                    loading="lazy"
                  />
                ) : (
                  tech.customIcon
                )}
                <span className="text-[10px] sm:text-[11px] lg:text-[13px] font-semibold text-slate-700 group-hover:text-[#2563eb] transition-colors">
                  {tech.name}
                </span>

                {/* Tooltip on hover */}
                {hoveredTech === tech.name && (
                  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-44 sm:w-48 p-2 bg-[#0a0f1c] text-white text-[11px] rounded-lg shadow-xl pointer-events-none z-50 text-center animate-in fade-in duration-150">
                    <p className="font-semibold text-[#60a5fa]">{tech.name}</p>
                    <p className="text-slate-300 mt-0.5 text-[10px] leading-tight">{tech.desc}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#0a0f1c]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
