import React from 'react';
import { YKLogo } from './YKLogo';

interface MotionLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'display';
  inverted?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const MotionLogo: React.FC<MotionLogoProps> = ({
  size = 'md',
  inverted = false,
  className = '',
  onClick,
}) => {
  return (
    <YKLogo
      size={size}
      inverted={inverted}
      onClick={onClick}
      className={className}
    />
  );
};
