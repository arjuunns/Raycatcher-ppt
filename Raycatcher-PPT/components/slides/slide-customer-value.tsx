"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Building2,
  Factory,
  Home,
  Landmark,
  GraduationCap,
  Leaf,
  Zap,
  RefreshCw,
  Wrench,
  TrendingUp,
  Monitor,
  Cloud,
} from "lucide-react"

const segments = [
  {
    icon: Factory,
    name: "Solar farm operators",
    need: "want every extra kWh to improve plant capacity factor and grid stability",
  },
  {
    icon: Building2,
    name: "Commercial & industrial units",
    need: "seek lower electricity bills and better utilisation of limited roof/ground area",
  },
  { icon: Home, name: "Residential homeowners", need: "want maximum output from small terraces and balconies" },
  {
    icon: Landmark,
    name: "Government & NGOs",
    need: "run budget-constrained rooftop and rural solar schemes, need high performance for every rupee",
  },
  {
    icon: GraduationCap,
    name: "Educational institutions",
    need: "use solar as both a cost-saving and a live teaching lab",
  },
  {
    icon: Leaf,
    name: "ESG / sustainability teams",
    need: "need measurable, reportable improvements in renewable energy contribution",
  },
]

const valueProps = [
  { icon: Zap, text: "≈30% higher energy vs fixed panels (example estimate for clear-sky, low-shading sites)" },
  { icon: RefreshCw, text: "Fully automatic tracking – no manual labour or re-alignment needed" },
  { icon: Wrench, text: "Retrofit solution – upgrade existing plants instead of rebuilding them" },
  { icon: TrendingUp, text: "Faster ROI and shorter payback period through higher annual kWh" },
  {
    icon: Monitor,
    text: "Dashboard (web + mobile): live power, daily/weekly/monthly gain, system health alerts, ROI tracker",
  },
  { icon: Cloud, text: "Low-maintenance hardware with over-the-air firmware updates to improve algorithms over time" },
]

export default function SlideCustomerValue() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-orange-50/30 to-amber-50/30 flex items-center justify-center px-8 py-12 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-soft-orange/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-muted-green/10 rounded-full blur-3xl" />

      <div className="max-w-7xl w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-navy mb-10 text-center"
        >
          Customer Segments & Value Proposition
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Segments */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-soft-orange/20"
          >
            <h3 className="text-xl font-bold text-navy mb-2">Who we serve</h3>
            <p className="text-xs text-charcoal/60 mb-6">
              Segmented: Residential, Industrial, Institutional, Governmental
            </p>
            <ul className="space-y-3">
              {segments.map((segment, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-soft-orange/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-soft-orange/15 flex items-center justify-center flex-shrink-0">
                    <segment.icon className="w-5 h-5 text-soft-orange" />
                  </div>
                  <div>
                    <span className="font-semibold text-navy">{segment.name}</span>
                    <p className="text-sm text-charcoal/70">{segment.need}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-muted-green/20"
          >
            <h3 className="text-xl font-bold text-navy mb-2">Why they choose RayCatcher</h3>
            <p className="text-xs text-charcoal/60 mb-6">Key differentiators and benefits</p>
            <ul className="space-y-3">
              {valueProps.map((prop, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted-green/5 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-muted-green/15 flex items-center justify-center flex-shrink-0">
                    <prop.icon className="w-5 h-5 text-muted-green" />
                  </div>
                  <span className="text-sm text-charcoal">{prop.text}</span>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-6 p-4 bg-gradient-to-r from-solar-yellow/20 to-muted-green/20 rounded-xl border border-solar-yellow/30"
            >
              <p className="text-sm text-navy font-semibold text-center">
                "Fixed panel pricing, near-tracker performance."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
