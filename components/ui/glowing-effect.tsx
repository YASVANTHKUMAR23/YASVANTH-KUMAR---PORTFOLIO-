"use client";

import React from "react";

export const GlowingEffect = ({
  blur = 0,
  borderWidth = 3,
  glow = true,
  className = "",
}: {
  blur?: number;
  borderWidth?: number;
  glow?: boolean;
  className?: string;
}) => {
  if (!glow) return null;
  
  return (
    <div
      className={`absolute inset-0 pointer-events-none rounded-[inherit] ${className}`}
      style={{
        boxShadow: `0 0 ${blur}px ${borderWidth}px rgba(0, 225, 171, 0.5)`,
        zIndex: -1,
      }}
    />
  );
};
