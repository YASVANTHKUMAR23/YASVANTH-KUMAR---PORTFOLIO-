"use client"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

export interface NavBarProps {
  items: NavItem[]
  className?: string
  activeTab?: string
  onTabChange?: (name: string) => void
}

export function NavBar({ items, className, activeTab: externalActiveTab, onTabChange }: NavBarProps) {
  const [internalActiveTab, setInternalActiveTab] = useState(items[0]?.name || "")
  const activeTab = externalActiveTab !== undefined ? externalActiveTab : internalActiveTab
  const [isMobile, setIsMobile] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const { scrollY } = useScroll()
  // Subtle zoom out while scrolling
  const scale = useTransform(scrollY, [0, 150, 400], [1, 0.95, 0.92])
  const opacity = useTransform(scrollY, [0, 50], [0.95, 1])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleResize()
    handleScroll()
    window.addEventListener("resize", handleResize)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSelect = (name: string, url: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (onTabChange) {
      onTabChange(name)
    } else {
      setInternalActiveTab(name)
    }

    const targetId = url.replace('#', '')
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (url === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.div
      style={{ scale, opacity }}
      className={cn(
        "fixed top-3 md:top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300",
        className,
      )}
    >
      <div className="flex items-center gap-1.5 md:gap-2 bg-[#0b1222]/85 backdrop-blur-xl border border-slate-700/60 py-1.5 px-2 md:py-2 md:px-3 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab.toLowerCase() === item.name.toLowerCase()

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleSelect(item.name, item.url, e)}
              className={cn(
                "relative cursor-pointer text-xs md:text-sm font-semibold px-3.5 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-200 select-none flex items-center gap-2",
                "text-slate-400 hover:text-white",
                isActive && "text-[#38bdf8] font-bold",
              )}
            >
              <span className="flex items-center">
                <Icon size={16} strokeWidth={isActive ? 2.5 : 2} className="md:hidden" />
                <span className="hidden md:inline">{item.name}</span>
              </span>

              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-[#38bdf8]/15 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 32,
                  }}
                >
                  {/* Tubelight Lamp Beam */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-1 bg-[#38bdf8] rounded-t-full shadow-[0_0_12px_#38bdf8]">
                    <div className="absolute w-12 h-6 bg-[#38bdf8]/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-[#38bdf8]/25 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-[#38bdf8]/35 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          )
        })}
      </div>
    </motion.div>
  )
}
