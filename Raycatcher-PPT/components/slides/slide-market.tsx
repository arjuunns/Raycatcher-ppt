"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Users, TrendingUp, ThumbsUp, Target } from "lucide-react"
import AnimatedPieChart from "@/components/charts/animated-pie-chart"
import AnimatedBar from "@/components/charts/animated-bar"
import bmc from "@/data/bmc.json"
import { formatINR } from "@/lib/format"

export default function SlideMarket() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const adoptionData = [
    { label: "Currently using solar", value: 23, color: "#22C55E" },
    { label: "Planning to install", value: 23.4, color: "#F59E0B" },
    { label: "No / Not planning", value: 53.6, color: "#94A3B8" },
  ]

  const installationData = [
    { label: "Moderately familiar", value: 38.3, color: "#F59E0B" },
    { label: "Slightly familiar", value: 34, color: "#FB923C" },
    { label: "Very familiar", value: 19.1, color: "#22C55E" },
    { label: "Not familiar at all", value: 8.5, color: "#94A3B8" },
  ]

  const interestData = [
    { label: "Sometimes", value: 46.8, color: "#F59E0B" },
    { label: "Often", value: 27.7, color: "#22C55E" },
    { label: "Always", value: 8.5, color: "#1E3A5F" },
  ]

  const keyStats = [
    { icon: ThumbsUp, value: "44.7%", label: "say real-time angle adjustment is 'Very Important'" },
    { icon: Target, value: "80.9%", label: "see angle tracking as important overall" },
    { icon: TrendingUp, value: "46.8%", label: "say panels only 'Sometimes' run at maximum efficiency" },
    { icon: Users, value: "72.3%", label: "rate energy efficiency as important in daily life" },
  ]

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-blue-50/30 to-indigo-50/30 flex items-center justify-center px-8 py-16 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-4"
        >
          <Users className="w-8 h-8 text-navy" />
          <span className="text-navy font-semibold text-sm uppercase tracking-wide">Market Validation</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-navy mb-4"
        >
          Who needs this – and what they told us
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-charcoal/80 mb-8 max-w-4xl"
        >
          We surveyed <span className="font-bold text-navy">47 respondents</span> across students, working
          professionals, homeowners and business owners, combined with rooftop solar adoption data.
        </motion.p>

        {/* Charts grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100"
          >
            <h3 className="text-sm font-bold text-navy mb-1">Solar Status</h3>
            <p className="text-xs text-charcoal/60 mb-4">Current adoption among respondents</p>
            <AnimatedPieChart data={adoptionData} isInView={isInView} delay={0.5} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100"
          >
            <h3 className="text-sm font-bold text-navy mb-1">Installation Type</h3>
            <p className="text-xs text-charcoal/60 mb-4">Primary installation focus</p>
            <AnimatedPieChart data={installationData} isInView={isInView} delay={0.6} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-blue-100"
          >
            <h3 className="text-sm font-bold text-navy mb-1">Interest in RayCatcher</h3>
            <p className="text-xs text-charcoal/60 mb-4">Would you use tracking technology?</p>
            <AnimatedBar data={interestData} isInView={isInView} delay={0.7} />
          </motion.div>
        </div>

        {/* Key stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-muted-green/10 to-solar-yellow/10 rounded-2xl p-6 border border-muted-green/20"
        >
          <h3 className="text-sm font-bold text-navy mb-4 text-center">Key Survey Insights</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="flex flex-col items-center text-center bg-white/80 rounded-xl p-4 shadow-sm"
              >
                <stat.icon className="w-6 h-6 text-muted-green mb-2" />
                <span className="text-2xl font-bold text-navy">{stat.value}</span>
                <span className="text-xs text-charcoal/70 leading-tight">{stat.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-sm text-muted-green font-medium mt-6 text-center bg-muted-green/10 py-3 px-6 rounded-full inline-block mx-auto"
        >
          80.9% of respondents value real-time angle adjustment — validating RayCatcher's core proposition
        </motion.p>

        {/* TAM / Market size */}
        <div className="mt-6">
          <div className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-blue-100">
            <h4 className="text-sm font-semibold text-navy mb-1 text-center">Market Size & TAM</h4>
            <p className="text-xs text-charcoal/60 text-center">
              Estimated India rooftop solar market value (2024): <strong>₹{(bmc.market_2024_inr/10000000).toFixed(2)} Cr</strong> (~₹6.2B),
              growing to <strong>₹{(bmc.target_market_value_2032_inr/10000000).toFixed(2)} Cr</strong> (~₹19.8B) by 2032
              <br />India solar tracker market: ≈₹{(bmc.tracker_market_2026_inr/10000000).toFixed(2)} Cr by 2026
              <br />Rooftop additions (2025): {bmc.rooftop_additions_2025_gw} GW (+{bmc.installations_yoy_2025_pct}% YoY), {bmc.residential_pct_2025}% residential
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
