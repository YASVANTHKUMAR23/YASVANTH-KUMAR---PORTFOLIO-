"use client";

import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

interface ArticleCardProps {
  tag: string;
  date: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  location?: string;
  className?: string;
  variants?: any;
  whileHover?: any;
  children?: React.ReactNode;
}

export const ArticleCard = ({
  tag,
  date,
  title,
  description,
  imageUrl,
  imageAlt,
  location,
  className,
  variants,
  whileHover,
  children,
}: ArticleCardProps) => {
  return (
    <motion.div
      variants={variants}
      whileHover={whileHover}
      className={`relative overflow-hidden bg-white dark:bg-neutral-900 flex flex-col ${className}`}
    >
      <div className="relative h-48 sm:h-64 w-full shrink-0">
        <Image
          src={imageUrl && (imageUrl.startsWith('http') || imageUrl.startsWith('/')) ? imageUrl : 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop'}
          alt={imageAlt || "Project Image"}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00e1ab]">{tag}</span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">{date}</span>
        </div>
        <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">{title}</h3>
        {location && (
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{location}</p>
        )}
        <p className="text-neutral-600 dark:text-neutral-300 mb-6 flex-1">{description}</p>
        {children}
      </div>
    </motion.div>
  );
};
