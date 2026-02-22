"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Users, TrendingUp, ThumbsUp, Target } from "lucide-react"
import AnimatedPieChart from "@/components/charts/animated-pie-chart"
import AnimatedBar from "@/components/charts/animated-bar"

export default function SlideMarket() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const adoptionData = [
    { label: "Already use solar", value: 52.3, color: "#22C55E" },
    { label: "Plan to adopt", value: 35.8, color: "#F59E0B" },
    { label: "No plans", value: 11.9, color: "#94A3B8" },
  ]

  const installationData = [
    { label: "Residential rooftops", value: 71.6, color: "#1E3A5F" },
    { label: "Commercial/Institutional", value: 28.4, color: "#64748B" },
  ]

  const interestData = [
    { label: "Yes", value: 51.4, color: "#22C55E" },
    { label: "Maybe", value: 46.8, color: "#F59E0B" },
    { label: "No", value: 1.8, color: "#EF4444" },
  ]

  const keyStats = [
    { icon: ThumbsUp, value: "74.3%", label: "rate tracking usefulness 4-5/5" },
    { icon: Target, value: "60.5%", label: "say real-time monitoring is important" },
    { icon: TrendingUp, value: "59.6%", label: "willing to pay ₹2k-₹10k extra for 25-40% more efficiency" },
    { icon: Users, value: "90.7%", label: "would recommend if it performs as promised" },
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
          We surveyed <span className="font-bold text-navy">109 potential users</span> across students, working
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
          Strong intent + willingness to pay shows real market pull for RayCatcher
        </motion.p>
      </div>
    </div>
  )
}
