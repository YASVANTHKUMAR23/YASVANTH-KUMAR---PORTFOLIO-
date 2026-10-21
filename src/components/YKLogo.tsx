import React from 'react';

interface YKLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'display';
  inverted?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const NAVY = "#08152A";
const BLUE = "#025CFF";

export const YKLogo: React.FC<YKLogoProps> = ({
  className = '',
  size = 'md',
  inverted = false,
  onClick,
}) => {
  const sizeMap = {
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9 md:h-10',
    lg: 'h-12 sm:h-14',
    display: 'h-16 sm:h-20 md:h-24',
  };

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center group cursor-pointer select-none ${
        inverted ? 'filter brightness-150 contrast-125' : ''
      } ${className}`}
    >
      <svg
        viewBox="380 250 880 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${sizeMap[size]} w-auto aspect-[880/520] transition-transform duration-300 group-hover:scale-105 drop-shadow-xs`}
        aria-label="Yasvanth Kumar Logo"
      >
        <polygon fill={NAVY} points="397,272 528,272 622,443 491,443" />
        <polygon fill={NAVY} points="491,442 622,442 660,512 529,512" />
        <rect fill={NAVY} x="688" y="272" width="128" height="478" />
        <polygon fill={NAVY} points="816,440 826,476 1097,750 953,750 816,609" />
        <path
          fill={BLUE}
          d="M909,272 L1088,272 C1000,335 910,405 828,476 C775,522 730,565 688,609 C640,660 600,702 551,750 L404,750 C490,672 575,590 656,505 L688,474 C735,428 780,386 816,353 C850,322 880,298 909,272 Z"
        />
        <circle fill={BLUE} cx="1171" cy="687" r="64" />
      </svg>
    </div>
  );
};
