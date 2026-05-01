"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Check, Sun, Smartphone, RefreshCw, Cpu, Cloud, Zap, Settings, TrendingUp } from "lucide-react"
import bmc from "@/data/bmc.json"
import { formatINR } from "@/lib/format"

const features = [
  { icon: Settings, text: "Compact motorised mount + sensor + controller that continuously tracks the sun's position" },
  { icon: Cpu, text: "Algorithms adjust panel tilt through the day to stay close to the optimal incident angle" },
  { icon: RefreshCw, text: "Retrofit-friendly: can be attached under existing panels with minimal structural change" },
  { icon: Zap, text: "Affordable: targets ₹20–25K per unit vs commercial dual-axis trackers at ₹5–10L+" },
  { icon: Cloud, text: "Integrated IoT module sends data to a secure cloud platform" },
  {
    icon: Smartphone,
    text: "Web and mobile dashboard display live generation, extra kWh vs fixed tilt and health alerts",
  },
  { icon: TrendingUp, text: "Improves ROI & reduces payback period — Indian C&I solar payback currently ~3 years" },
  { icon: Zap, text: `Serves India's ${bmc.cumulative_rooftop_gw} GW cumulative rooftop base (2025)` },
]

export default function SlideSolution() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-green-50/30 to-emerald-50/30 flex items-center justify-center px-8 py-16 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-muted-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-solar-yellow/10 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Check className="w-8 h-8 text-muted-green" />
          <span className="text-muted-green font-semibold text-sm uppercase tracking-wide">Our Solution</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-navy mb-4"
        >
          RayCatcher: the smart tracking add-on
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-solar-yellow/20 to-muted-green/20 px-6 py-3 rounded-full mb-10 border border-solar-yellow/30"
        >
          <Zap className="w-5 h-5 text-solar-yellow" />
          <span className="text-solar-yellow font-bold text-lg">≈30% more energy vs fixed-tilt (industry benchmark: 20–30%)</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Features */}
          <div>
            <ul className="space-y-4">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-muted-green/20 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-muted-green/15 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-muted-green" />
                  </div>
                  <span className="text-charcoal leading-relaxed">{feature.text}</span>
                </motion.li>
              ))}
            </ul>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-sm text-charcoal/60 mt-6 italic"
            >
              * Depending on site and shading conditions
            </motion.p>
          </div>

          {/* Right: Animated solar array */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative h-96 flex items-center justify-center"
          >
            {/* Central sun */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              className="absolute top-8 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                <Sun className="w-16 h-16 text-solar-yellow drop-shadow-lg" />
              </motion.div>
            </motion.div>

            {/* Sun rays */}
            <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32" viewBox="0 0 192 128">
              {[...Array(5)].map((_, i) => (
                <motion.line
                  key={i}
                  x1={96}
                  y1={64}
                  x2={96 + Math.cos((i - 2) * 0.5) * 80}
                  y2={128}
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: [0.2, 0.6, 0.2] } : {}}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                />
              ))}
            </svg>

            {/* Solar array with tracking */}
            <div className="absolute bottom-12 flex gap-6">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{ rotate: [-12, 12, -12] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.3 }}
                  className="relative"
                >
                  <div className="w-24 h-16 bg-gradient-to-br from-solar-yellow/40 to-solar-yellow/20 rounded-lg border-2 border-solar-yellow flex items-center justify-center shadow-lg">
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(4)].map((_, j) => (
                        <motion.div
                          key={j}
                          className="w-6 h-5 bg-solar-yellow/70 rounded-sm"
                          animate={{ opacity: [0.6, 1, 0.6] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: j * 0.15 }}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-8 bg-charcoal/50" />
                  {/* Tracking motor indicator */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, delay: i * 0.2 }}
                    className="absolute -right-2 -top-2 w-6 h-6 rounded-full bg-muted-green flex items-center justify-center shadow-md"
                  >
                    <RefreshCw className="w-3 h-3 text-white" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Base platform */}
            <div className="absolute bottom-6 w-80 h-4 bg-gradient-to-r from-charcoal/10 via-charcoal/20 to-charcoal/10 rounded-full" />

            {/* Status indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 }}
              className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md border border-muted-green/30"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                className="w-2 h-2 rounded-full bg-muted-green"
              />
              <span className="text-xs font-medium text-charcoal">Auto-tracking active</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
