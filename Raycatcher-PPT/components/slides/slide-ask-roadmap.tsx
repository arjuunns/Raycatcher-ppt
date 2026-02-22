"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Target, Calendar, Check, Coins, Package, Code, Rocket, Building, Award, Globe } from "lucide-react"

const revenueStreams = [
  { icon: Package, text: "Sale of RayCatcher tracking modules (per panel / per row pricing)" },
  { icon: Coins, text: "Installation and commissioning services for new and retrofit projects" },
  { icon: Check, text: "Annual maintenance contracts (AMC) for hardware and field support" },
  { icon: Code, text: "Subscription fees for monitoring dashboard (tiered by plant size)" },
  { icon: Building, text: "Licensing of tracking algorithms to OEMs or large EPC players" },
  { icon: Globe, text: "Data & performance analytics for enterprises, utilities and research" },
]

const fundingDetails = [
  { text: "Seed funding required: ₹40 L", highlight: true },
  { text: "₹20 L – manufacturing setup and tooling", highlight: false },
  { text: "₹10 L – pilot deployments, marketing and certifications", highlight: false },
  { text: "₹10 L – refining product + software, expanding team", highlight: false },
  { text: "Operations profitable from Year 1; CAPEX payback ≈3 years", highlight: false },
  { text: "Meaningful investor returns from Year 4+", highlight: false },
]

const roadmap = [
  {
    year: "Year 1",
    milestone: "Build and deploy pilots, validate performance, convert first paying customers",
    icon: Rocket,
  },
  {
    year: "Year 2",
    milestone: "Expand through installer/EPC partnerships, focus on C&I and institutional rooftops",
    icon: Building,
  },
  { year: "Year 3", milestone: "Achieve CAPEX payback, onboard government and NGO programs", icon: Award },
  {
    year: "Year 4+",
    milestone: "Scale across multiple states, grow SaaS + AMC base, explore international pilots",
    icon: Globe,
  },
]

export default function SlideAskRoadmap() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-amber-50/30 to-yellow-50/30 flex items-center justify-center px-8 py-12 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-solar-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-navy mb-8 text-center"
        >
          Revenue Streams, Funding Ask & Roadmap
        </motion.h2>

        {/* Revenue Streams */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-solar-yellow/20 mb-8"
        >
          <h3 className="text-lg font-bold text-navy mb-4 flex items-center gap-2">
            <Coins className="w-5 h-5 text-solar-yellow" />
            How RayCatcher makes money
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {revenueStreams.map((stream, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                className="flex items-center gap-3 p-3 bg-solar-yellow/5 rounded-xl border border-solar-yellow/10"
              >
                <stream.icon className="w-5 h-5 text-solar-yellow flex-shrink-0" />
                <span className="text-sm text-charcoal">{stream.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Funding Ask */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-solar-yellow/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-solar-yellow/15 flex items-center justify-center">
                <Target className="w-6 h-6 text-solar-yellow" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">Funding Ask</h3>
                <p className="text-xs text-charcoal/60">What we are asking for</p>
              </div>
            </div>

            <div className="space-y-3">
              {fundingDetails.map((detail, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.08 }}
                  className={`flex items-start gap-3 p-3 rounded-xl ${detail.highlight ? "bg-solar-yellow/20 border border-solar-yellow/30" : "bg-charcoal/5"}`}
                >
                  <Check
                    className={`w-5 h-5 flex-shrink-0 mt-0.5 ${detail.highlight ? "text-solar-yellow" : "text-muted-green"}`}
                  />
                  <span className={`${detail.highlight ? "text-lg font-bold text-solar-yellow" : "text-charcoal"}`}>
                    {detail.text}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-muted-green/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-muted-green/15 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-muted-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">Roadmap</h3>
                <p className="text-xs text-charcoal/60">Our 4-year journey</p>
              </div>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-4 bottom-4 w-0.5 bg-gradient-to-b from-muted-green via-solar-yellow to-soft-orange" />

              <div className="space-y-6">
                {roadmap.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.15 }}
                    className="flex items-start gap-4 relative"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-muted-green to-solar-yellow flex items-center justify-center flex-shrink-0 z-10 shadow-md"
                    >
                      <item.icon className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="bg-charcoal/5 rounded-xl p-3 flex-1">
                      <p className="font-bold text-navy">{item.year}</p>
                      <p className="text-sm text-charcoal/80">{item.milestone}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
