"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface SlideNavigationProps {
  slides: { id: number; title: string }[]
  currentSlide: number
  onNavigate: (slideNumber: number) => void
}

export default function SlideNavigation({ slides, currentSlide, onNavigate }: SlideNavigationProps) {
  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3">
      {slides.map((slide) => (
        <button
          key={slide.id}
          onClick={() => onNavigate(slide.id)}
          className="group flex items-center gap-3 justify-end"
          aria-label={`Go to slide ${slide.id}: ${slide.title}`}
        >
          <span
            className={cn(
              "text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-navy",
              currentSlide === slide.id && "opacity-100",
            )}
          >
            {slide.title}
          </span>
          <motion.div
            className={cn(
              "w-3 h-3 rounded-full border-2 border-navy/50 transition-colors duration-200",
              currentSlide === slide.id && "bg-solar-yellow border-solar-yellow",
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </button>
      ))}
    </nav>
  )
}
