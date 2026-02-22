"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import {
  Shield,
  Users,
  Package,
  Repeat,
  Swords,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from "lucide-react"

type ThreatLevel = "low" | "moderate" | "high"

interface Force {
  title: string
  level: ThreatLevel
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
  factors: {
    factor: string
    impact: "positive" | "negative" | "neutral"
    description: string
  }[]
  summary: string
}

const forces: Force[] = [
  {
    title: "Threat of New Entrants",
    level: "moderate",
    icon: Shield,
    color: "#F59E0B",
    bgColor: "bg-amber-500/10",
    borderColor: "border-amber-500/30",
    factors: [
      {
        factor: "Technical Expertise Required",
        impact: "positive",
        description: "Deep knowledge in embedded systems, solar physics, and IoT creates significant barriers",
      },
      {
        factor: "Capital Requirements",
        impact: "positive",
        description: "Hardware prototyping, testing equipment, and inventory require substantial upfront investment",
      },
      {
        factor: "Patent Potential",
        impact: "positive",
        description: "Proprietary algorithms and mechanical designs can be protected through IP",
      },
      {
        factor: "Growing Market",
        impact: "negative",
        description: "Expanding solar market attracts new players and investors continuously",
      },
    ],
    summary: "Technical complexity and capital needs create barriers, but booming solar market attracts entrants. First-mover advantage and TIET ecosystem are key differentiators.",
  },
  {
    title: "Bargaining Power of Suppliers",
    level: "low",
    icon: Package,
    color: "#22C55E",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    factors: [
      {
        factor: "Standardized Components",
        impact: "positive",
        description: "Motors, sensors, and microcontrollers are commoditized with multiple suppliers",
      },
      {
        factor: "Multiple Sourcing Options",
        impact: "positive",
        description: "Components available from domestic and international vendors (China, Taiwan, India)",
      },
      {
        factor: "Low Switching Costs",
        impact: "positive",
        description: "Standard interfaces allow easy substitution between equivalent components",
      },
      {
        factor: "Bulk Purchasing Power",
        impact: "neutral",
        description: "Volume discounts available as production scales, improving margins over time",
      },
    ],
    summary: "Favorable supplier dynamics due to commoditized electronics components and multiple sourcing options. Input costs remain predictable and manageable.",
  },
  {
    title: "Bargaining Power of Buyers",
    level: "moderate",
    icon: Users,
    color: "#3B82F6",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/30",
    factors: [
      {
        factor: "Price Sensitivity",
        impact: "negative",
        description: "Residential buyers are cost-conscious; need clear ROI demonstration",
      },
      {
        factor: "B2B Negotiation",
        impact: "negative",
        description: "Large solar farms and commercial buyers demand volume discounts and SLAs",
      },
      {
        factor: "Limited Alternatives",
        impact: "positive",
        description: "Few affordable dual-axis tracking solutions exist in the Indian market",
      },
      {
        factor: "High Value Proposition",
        impact: "positive",
        description: "25-40% efficiency gains justify premium pricing when demonstrated clearly",
      },
    ],
    summary: "Buyers have leverage through price sensitivity, but unique value proposition and limited competition in affordable tracking solutions provide pricing power.",
  },
  {
    title: "Threat of Substitutes",
    level: "low",
    icon: Repeat,
    color: "#8B5CF6",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    factors: [
      {
        factor: "Fixed Panel Systems",
        impact: "positive",
        description: "Static panels lose 25-40% potential energy; tracking is clearly superior",
      },
      {
        factor: "Manual Tracking",
        impact: "positive",
        description: "Labor-intensive and impractical for most installations",
      },
      {
        factor: "Single-Axis Trackers",
        impact: "neutral",
        description: "Cheaper but capture only 15-25% extra energy vs. our 25-40%",
      },
      {
        factor: "Higher Panel Capacity",
        impact: "negative",
        description: "Some may opt to simply install more panels instead of tracking",
      },
    ],
    summary: "Substitutes exist but none match efficiency-to-cost ratio of smart dual-axis tracking. Economics favor tracking over adding panels in space-constrained installations.",
  },
  {
    title: "Industry Rivalry",
    level: "moderate",
    icon: Swords,
    color: "#EF4444",
    bgColor: "bg-red-500/10",
    borderColor: "border-red-500/30",
    factors: [
      {
        factor: "Fragmented Market",
        impact: "positive",
        description: "No dominant player in affordable smart tracking for small-to-medium installations",
      },
      {
        factor: "Price Competition",
        impact: "negative",
        description: "Chinese imports and local assemblers compete on price aggressively",
      },
      {
        factor: "Feature Differentiation",
        impact: "positive",
        description: "Cloud dashboard, AI optimization, and weather integration set us apart",
      },
      {
        factor: "Growing Market Size",
        impact: "positive",
        description: "Expanding pie reduces zero-sum competition; room for multiple winners",
      },
    ],
    summary: "Competition exists but is fragmented. Integrated solution with software intelligence, local support, and TIET credibility creates sustainable differentiation.",
  },
]

const levelConfig: Record<ThreatLevel, { label: string; color: string; bg: string }> = {
  low: { label: "LOW", color: "text-green-600", bg: "bg-green-500/20" },
  moderate: { label: "MODERATE", color: "text-amber-600", bg: "bg-amber-500/20" },
  high: { label: "HIGH", color: "text-red-600", bg: "bg-red-500/20" },
}

const impactIcons = {
  positive: { icon: TrendingUp, color: "text-green-600" },
  negative: { icon: TrendingDown, color: "text-red-500" },
  neutral: { icon: Minus, color: "text-gray-500" },
}

// Individual Force Slide Component
function ForceSlide({ force, index }: { force: Force; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-16 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${force.color}08 0%, ${force.color}03 50%, transparent 100%)`,
      }}
    >
      {/* Background decorative elements */}
      <div
        className="absolute top-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20"
        style={{ backgroundColor: force.color }}
      />
      <div
        className="absolute bottom-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-10"
        style={{ backgroundColor: force.color }}
      />

      <div className="max-w-6xl w-full relative z-10">
        {/* Force Number */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <span
            className="text-8xl font-black opacity-10"
            style={{ color: force.color }}
          >
            0{index + 1}
          </span>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-6 mb-8"
        >
          <div
            className="w-24 h-24 rounded-3xl flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: `${force.color}20` }}
          >
            <force.icon className="w-12 h-12" style={{ color: force.color }} />
          </div>
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-2">{force.title}</h2>
            <span
              className={`${levelConfig[force.level].bg} ${levelConfig[force.level].color} text-lg font-bold px-6 py-2 rounded-full`}
            >
              {levelConfig[force.level].label} THREAT
            </span>
          </div>
        </motion.div>

        {/* Summary */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-charcoal/80 mb-10 max-w-4xl bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          {force.summary}
        </motion.p>

        {/* Factors Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {force.factors.map((factor, factorIndex) => {
            const ImpactIcon = impactIcons[factor.impact].icon
            return (
              <motion.div
                key={factor.factor}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + factorIndex * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h4 className="font-bold text-navy text-xl">{factor.factor}</h4>
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      factor.impact === "positive"
                        ? "bg-green-100"
                        : factor.impact === "negative"
                        ? "bg-red-100"
                        : "bg-gray-100"
                    }`}
                  >
                    <ImpactIcon className={`w-5 h-5 ${impactIcons[factor.impact].color}`} />
                  </div>
                </div>
                <p className="text-base text-charcoal/70 leading-relaxed">{factor.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

// Strategic Implications Slide
function StrategicSlide() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="min-h-screen flex items-center justify-center px-8 py-16 bg-gradient-to-br from-navy via-slate-800 to-navy relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-solar-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-5xl w-full relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">Strategic Implications</h2>
          <p className="text-xl text-white/70">Key actions for RayCatcher based on competitive analysis</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-solar-yellow/20 flex items-center justify-center mb-6">
              <Shield className="w-8 h-8 text-solar-yellow" />
            </div>
            <h3 className="font-bold text-2xl mb-3">Build Barriers</h3>
            <p className="text-base text-white/80 leading-relaxed">
              Patent core algorithms, secure exclusive installer partnerships, and build brand recognition through campus demos and pilot projects.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-muted-green/20 flex items-center justify-center mb-6">
              <TrendingUp className="w-8 h-8 text-muted-green" />
            </div>
            <h3 className="font-bold text-2xl mb-3">Differentiate on Value</h3>
            <p className="text-base text-white/80 leading-relaxed">
              Focus on integrated software intelligence, cloud analytics, and local support that Chinese imports cannot easily replicate.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 hover:bg-white/15 transition-all"
          >
            <div className="w-16 h-16 rounded-2xl bg-soft-orange/20 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-soft-orange" />
            </div>
            <h3 className="font-bold text-2xl mb-3">Lock-in Customers</h3>
            <p className="text-base text-white/80 leading-relaxed">
              Create switching costs through subscription analytics, firmware updates, and long-term maintenance contracts with guaranteed performance.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-sm text-white/50 mt-12"
        >
          Analysis based on market research conducted by the RayCatcher team at TIET, Patiala
        </motion.p>
      </div>
    </div>
  )
}

export default function SlidePortersForces() {
  const overviewRef = useRef(null)
  const isOverviewInView = useInView(overviewRef, { once: true, amount: 0.3 })

  return (
    <div>
      {/* Overview Slide */}
      <div
        ref={overviewRef}
        className="min-h-screen flex items-center justify-center px-8 py-16 bg-gradient-to-br from-warm-white via-blue-50/30 to-indigo-50/30 relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-5xl w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-5xl lg:text-6xl font-bold text-navy mb-4">
              Porter&apos;s Five Forces
            </h2>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
              Industry competitive analysis for RayCatcher in the Indian renewable energy market
            </p>
          </motion.div>

          {/* Overview Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            {forces.map((force, index) => (
              <motion.div
                key={force.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isOverviewInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className={`${force.bgColor} ${force.borderColor} border-2 rounded-2xl p-5 text-center hover:scale-105 transition-transform`}
              >
                <div
                  className="w-14 h-14 rounded-xl mx-auto mb-3 flex items-center justify-center"
                  style={{ backgroundColor: `${force.color}20` }}
                >
                  <force.icon className="w-7 h-7" style={{ color: force.color }} />
                </div>
                <h4 className="font-bold text-navy text-sm mb-2">{force.title}</h4>
                <span
                  className={`${levelConfig[force.level].bg} ${levelConfig[force.level].color} text-xs font-bold px-3 py-1 rounded-full`}
                >
                  {levelConfig[force.level].label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isOverviewInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center text-charcoal/50 mt-10 text-sm"
          >
            Scroll down for detailed analysis of each force
          </motion.p>
        </div>
      </div>

      {/* Individual Force Slides */}
      {forces.map((force, index) => (
        <ForceSlide key={force.title} force={force} index={index} />
      ))}

      {/* Strategic Implications Slide */}
      <StrategicSlide />
    </div>
  )
}
