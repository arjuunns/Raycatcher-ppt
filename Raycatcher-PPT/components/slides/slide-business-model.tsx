"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Megaphone, Users, Handshake, Building, Cpu, Globe, Laptop } from "lucide-react"
import bmc from "@/data/bmc.json"
import { formatINR } from "@/lib/format"

const channelsData = [
  "Bundle RayCatcher with solar EPC and installer offerings",
  "Direct B2B sales to solar farms, factories, malls, campuses and hospitals",
  "Participate in government and NGO rooftop programs as the tracking technology partner",
  "Demo installations on campuses and tech parks as live showcases",
  "Digital marketing through LinkedIn, solar forums and targeted social media ads",
]

const relationshipsData = [
  "Dedicated after-sales support with clear response times",
  "Onboarding visit or remote walkthrough to configure tracking for each site",
  "Automated cloud reports showing extra kWh, savings and CO₂ reduction",
  "Regular firmware/software updates that customers receive without hardware change",
  "Collect case studies, testimonials and referrals to build a community of visible success stories",
]

const partnersData = [
  {
    group: "Manufacturing & supply",
    items: "panel distributors, motor and sensor vendors, electronics assemblers",
    icon: Building,
  },
  { group: "Implementation", items: "regional installer networks and renewable energy consultants", icon: Cpu },
  {
    group: "Ecosystem",
    items: "government renewable agencies, DISCOM programs, rural electrification NGOs",
    icon: Globe,
  },
  {
    group: "Technology & research",
    items: "cloud providers, TIET labs and other universities for pilots and algorithm R&D",
    icon: Laptop,
  },
]

export default function SlideBusinessModel() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const cards = [
    { title: "Channels", subtitle: "How we reach customers", icon: Megaphone, color: "#F59E0B", items: channelsData },
    {
      title: "Customer Relationships",
      subtitle: "How we keep them happy",
      icon: Users,
      color: "#FB923C",
      items: relationshipsData,
    },
  ]

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-yellow-50/30 to-orange-50/30 flex items-center justify-center px-8 py-12 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-solar-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-soft-orange/10 rounded-full blur-3xl" />

      <div className="max-w-7xl w-full relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-4xl lg:text-5xl font-bold text-navy mb-10 text-center"
        >
          Business Model: Channels, Relationships, Partners
        </motion.h2>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Channels and Relationships */}
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
              whileHover={{ y: -4 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${card.color}20` }}
              >
                <card.icon className="w-6 h-6" style={{ color: card.color }} />
              </div>
              <h3 className="text-lg font-bold text-navy mb-1">{card.title}</h3>
              <p className="text-xs text-charcoal/60 mb-4">{card.subtitle}</p>

              <ul className="space-y-3">
                {card.items?.map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
                    className="flex items-start gap-2 text-sm text-charcoal"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: card.color }}
                    />
                    <span className="leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Key Partners */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            whileHover={{ y: -4 }}
            className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border hover:shadow-xl transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-muted-green/20 flex items-center justify-center mb-4">
              <Handshake className="w-6 h-6 text-muted-green" />
            </div>
            <h3 className="text-lg font-bold text-navy mb-1">Key Partners</h3>
            <p className="text-xs text-charcoal/60 mb-4">Who helps us deliver</p>

            <ul className="space-y-4">
              {partnersData.map((partner, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.6 + i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-muted-green/10 flex items-center justify-center flex-shrink-0">
                    <partner.icon className="w-4 h-4 text-muted-green" />
                  </div>
                  <div className="text-sm">
                    <span className="font-semibold text-navy">{partner.group}</span>
                    <p className="text-charcoal/70">{partner.items}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        {/* Numeric highlights pulled from BMC data */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-border">
            <h4 className="font-semibold text-navy mb-1">Manufacturing BOM</h4>
            <p className="text-sm text-charcoal/80">{formatINR(bmc.manufacturing_bom_min)} – {formatINR(bmc.manufacturing_bom_max)}</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-border">
            <h4 className="font-semibold text-navy mb-1">Cloud</h4>
            <p className="text-sm text-charcoal/80">{formatINR(bmc.cloud_monthly)}/mo (AWS estimated)</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-border">
            <h4 className="font-semibold text-navy mb-1">Cumulative Rooftop Base</h4>
            <p className="text-sm text-charcoal/80">{bmc.cumulative_rooftop_gw} GW (India, 2025)</p>
          </div>
        </div>
      </div>
    </div>
  )
}
