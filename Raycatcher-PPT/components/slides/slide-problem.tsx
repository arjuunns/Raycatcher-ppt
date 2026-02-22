"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AlertTriangle, Clock, TrendingDown, Maximize2, DollarSign, Wrench, Lock } from "lucide-react"

const problems = [
  {
    icon: Clock,
    text: "Sub-optimal angle for most of the day → large part of sunlight is not converted to electricity",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    icon: TrendingDown,
    text: "Low kWh output means slower payback and weak ROI for homeowners, industries and investors",
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    icon: Maximize2,
    text: "Rooftop space is limited – you can't always add more panels to meet demand",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: DollarSign,
    text: "Dual-axis trackers exist but are bulky, expensive and hard to maintain for small/medium plants",
    color: "text-yellow-600",
    bg: "bg-yellow-500/10",
  },
  {
    icon: Wrench,
    text: "Manual tilt adjustment requires time, labour and skill, so panels are rarely optimised in practice",
    color: "text-soft-orange",
    bg: "bg-soft-orange/10",
  },
  {
    icon: Lock,
    text: "Result: high capital locked in under-performing assets for 20+ years",
    color: "text-red-600",
    bg: "bg-red-600/10",
  },
]

export default function SlideProblem() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-red-50/30 to-orange-50/30 flex items-center justify-center px-8 py-16 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Problem bullets */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-4"
          >
            <AlertTriangle className="w-8 h-8 text-red-500" />
            <span className="text-red-500 font-semibold text-sm uppercase tracking-wide">The Challenge</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-navy mb-8"
          >
            Why fixed panels leave money on the table
          </motion.h2>
          <ul className="space-y-4">
            {problems.map((problem, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`flex items-start gap-4 p-4 rounded-xl ${problem.bg} border border-transparent hover:border-current/10 transition-all`}
              >
                <div className={`w-10 h-10 rounded-lg ${problem.bg} flex items-center justify-center flex-shrink-0`}>
                  <problem.icon className={`w-5 h-5 ${problem.color}`} />
                </div>
                <span className="text-charcoal leading-relaxed">{problem.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Right: Animated sun and panel illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative h-96 flex items-center justify-center"
        >
          {/* Sun arc path */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 350">
            <defs>
              <linearGradient id="arcGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M 40 280 Q 200 40 360 280"
              fill="none"
              stroke="url(#arcGradient)"
              strokeWidth="3"
              strokeDasharray="10 5"
            />
            {/* Time markers */}
            <text x="30" y="295" className="text-xs fill-charcoal/50">
              6 AM
            </text>
            <text x="190" y="30" className="text-xs fill-charcoal/50">
              12 PM
            </text>
            <text x="345" y="295" className="text-xs fill-charcoal/50">
              6 PM
            </text>
          </svg>

          {/* Static fixed panel */}
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="w-48 h-32 bg-gradient-to-br from-navy/30 to-navy/10 rounded-lg border-2 border-navy/40 flex items-center justify-center shadow-xl">
                <div className="grid grid-cols-4 gap-1">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-7 h-7 bg-navy/40 rounded-sm" />
                  ))}
                </div>
                {/* Efficiency indicator */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 bg-red-500/80 text-white text-xs px-2 py-1 rounded-full"
                >
                  ~40% efficiency
                </motion.div>
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-14 bg-gradient-to-b from-charcoal/60 to-charcoal/30 rounded-b" />
            </div>
          </div>

          {/* Animated sun */}
          <motion.div
            animate={{
              x: ["-140px", "140px", "-140px"],
              y: ["60px", "-100px", "60px"],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-20"
          >
            <motion.div
              animate={{ scale: [1, 1.15, 1], rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="w-16 h-16 rounded-full bg-gradient-to-br from-solar-yellow to-soft-orange flex items-center justify-center shadow-lg shadow-solar-yellow/50"
            >
              <span className="text-2xl">☀️</span>
            </motion.div>
          </motion.div>

          {/* Energy loss indicator */}
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center"
          >
            <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-2 rounded-full border border-red-200">
              Sun moves, panel stays fixed → Energy lost all day
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
