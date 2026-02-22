"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { TrendingUp, DollarSign, PiggyBank, BarChart3 } from "lucide-react"
import AnimatedBarChart from "@/components/charts/animated-bar-chart"

export default function SlideFinancials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const costData = [
    { label: "CAPEX (Y0)", value: 20, color: "#1E3A5F", max: 120 },
    { label: "Fixed Costs/yr", value: 30.7, color: "#F59E0B", max: 120 },
    { label: "Variable Costs/yr", value: 62.4, color: "#FB923C", max: 120 },
    { label: "Total OPEX/yr", value: 110.1, color: "#22C55E", max: 120 },
  ]

  const revenueData = [
    { label: "Revenue", value: 119, color: "#22C55E", max: 130 },
    { label: "OPEX", value: 110.1, color: "#FB923C", max: 130 },
    { label: "Net Profit", value: 7.35, color: "#1E3A5F", max: 130 },
  ]

  const highlights = [
    { icon: TrendingUp, text: "Business is profitable from Year 1", color: "text-muted-green" },
    { icon: DollarSign, text: "Initial CAPEX: ≈₹20 L", color: "text-navy" },
    { icon: PiggyBank, text: "CAPEX payback in ≈2.5-3 years", color: "text-solar-yellow" },
    { icon: BarChart3, text: "Revenue mix shifts to AMC & SaaS over time", color: "text-soft-orange" },
  ]

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-green-50/30 to-emerald-50/30 flex items-center justify-center px-8 py-12 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-muted-green/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <DollarSign className="w-8 h-8 text-muted-green" />
          <span className="text-muted-green font-semibold text-sm uppercase tracking-wide">Financial Snapshot</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl lg:text-5xl font-bold text-navy mb-10 text-center"
        >
          Cost, Revenue and Payback
        </motion.h2>

        {/* Financial details */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-navy/10"
          >
            <h4 className="font-semibold text-navy mb-2">Initial CAPEX (Year 0)</h4>
            <p className="text-sm text-charcoal/80">Machinery & equipment ≈ ₹20 L</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-muted-green/20"
          >
            <h4 className="font-semibold text-navy mb-2">Year 1 Projections</h4>
            <p className="text-sm text-charcoal/80">Revenue: ≈₹119 L | Net Profit: ≈₹7.35 L</p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Cost Structure */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border"
          >
            <h3 className="text-lg font-bold text-navy mb-2">Cost Structure</h3>
            <p className="text-xs text-charcoal/60 mb-4">All values in ₹ Lakhs</p>
            <AnimatedBarChart data={costData} isInView={isInView} delay={0.5} />
            <p className="text-xs text-charcoal/60 mt-4">
              Annual OPEX: Fixed ≈₹30.7L + Variable ≈₹62.4L = Total ≈₹110.1L
            </p>
          </motion.div>

          {/* Revenue vs Costs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border"
          >
            <h3 className="text-lg font-bold text-navy mb-2">Revenue vs Costs – Year 1</h3>
            <p className="text-xs text-charcoal/60 mb-4">All values in ₹ Lakhs</p>
            <AnimatedBarChart data={revenueData} isInView={isInView} delay={0.6} />
            <p className="text-xs text-charcoal/60 mt-4">
              Net profit after tax (Year 1): ≈₹7.35 L - profitable from day one
            </p>
          </motion.div>
        </div>

        {/* Key highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-r from-muted-green/10 to-emerald-500/10 rounded-2xl p-6 border border-muted-green/20"
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {highlights.map((highlight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-3 bg-white/80 px-4 py-3 rounded-xl shadow-sm"
              >
                <highlight.icon className={`w-5 h-5 ${highlight.color}`} />
                <span className="text-sm font-medium text-charcoal">{highlight.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
