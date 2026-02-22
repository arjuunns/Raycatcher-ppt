"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Cog, Database, FlaskConical, Wrench, Cloud, Users, Lightbulb, Building, DollarSign } from "lucide-react"

const activities = [
  {
    icon: FlaskConical,
    text: "Research and refine tracking algorithms for different latitudes, seasons and weather patterns",
  },
  { icon: Wrench, text: "Design, prototype and test hardware (mounts, motors, control electronics)" },
  { icon: Cog, text: "Run field pilots and stress tests on rooftops and testbeds" },
  { icon: Cloud, text: "Maintain the cloud platform and mobile/web dashboards" },
  { icon: Users, text: "Manage sales pipeline, partner training and installation SOPs" },
  { icon: Wrench, text: "Provide AMC and on-site/remote support to customers" },
]

const resources = [
  {
    type: "Intellectual",
    items: "tracking logic, control firmware, cloud analytics, brand, potential patents",
    icon: Lightbulb,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    type: "Infrastructural",
    items: "motorised mounts, sensor and controller inventory, testing rigs, demo sites, servers",
    icon: Building,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    type: "Human",
    items: "embedded engineers, software developers, data analysts, business development and field technicians",
    icon: Users,
    color: "text-teal-500",
    bg: "bg-teal-500/10",
  },
  {
    type: "Financial",
    items: "seed funding and working capital to cover R&D, manufacturing batches and pilot deployments",
    icon: DollarSign,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
]

export default function SlideActivitiesResources() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-purple-50/30 to-blue-50/30 flex items-center justify-center px-8 py-12 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl" />

      <div className="max-w-6xl w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-navy mb-10 text-center"
        >
          Key Activities & Resources
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Key Activities */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-soft-orange/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-soft-orange/15 flex items-center justify-center">
                <Cog className="w-7 h-7 text-soft-orange" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">Key Activities</h3>
                <p className="text-xs text-charcoal/60">What we do every day</p>
              </div>
            </div>
            <ul className="space-y-4">
              {activities.map((activity, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.08 }}
                  className="flex items-start gap-3 p-3 rounded-xl hover:bg-soft-orange/5 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-soft-orange/10 flex items-center justify-center flex-shrink-0">
                    <activity.icon className="w-4 h-4 text-soft-orange" />
                  </div>
                  <span className="text-sm text-charcoal leading-relaxed">{activity.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Key Resources */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-muted-green/20"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 rounded-xl bg-muted-green/15 flex items-center justify-center">
                <Database className="w-7 h-7 text-muted-green" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy">Key Resources</h3>
                <p className="text-xs text-charcoal/60">What makes RayCatcher possible</p>
              </div>
            </div>
            <ul className="space-y-4">
              {resources.map((resource, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className={`p-4 rounded-xl ${resource.bg} border border-transparent hover:border-current/10 transition-all`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <resource.icon className={`w-5 h-5 ${resource.color}`} />
                    <span className={`font-semibold ${resource.color}`}>{resource.type}</span>
                  </div>
                  <span className="text-sm text-charcoal/80">{resource.items}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
