"use client"

import { motion } from "framer-motion"
import { Sun, Zap, ArrowDown, Cpu, Wifi, BarChart3 } from "lucide-react"

export default function SlideTitle() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white via-solar-yellow/5 to-soft-orange/10 flex items-center justify-center px-8 py-16 relative overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-solar-yellow/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left: Title and subtitle */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 mb-6">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sun className="w-10 h-10 text-solar-yellow" />
            </motion.div>
            <span className="text-soft-orange font-semibold text-lg">Smart Solar Innovation</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-navy mb-4 text-balance">RayCatcher</h1>
          <p className="text-2xl lg:text-3xl text-charcoal font-medium mb-6 text-balance">
            Smart Solar Tracking System
          </p>
          <p className="text-lg text-charcoal/80 mb-6 max-w-xl text-pretty leading-relaxed">
            Most solar panels waste sunlight for half the day. RayCatcher makes them follow the sun and generate up to{" "}
            <span className="text-solar-yellow font-bold bg-solar-yellow/10 px-2 py-1 rounded">30% more energy</span>{" "}
            automatically.
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {[
              { icon: Cpu, text: "Smart Tracking" },
              { icon: Wifi, text: "IoT Connected" },
              { icon: BarChart3, text: "Real-time Analytics" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-solar-yellow/20"
              >
                <feature.icon className="w-4 h-4 text-solar-yellow" />
                <span className="text-sm font-medium text-navy">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* <p className="text-sm text-charcoal/60 mb-6">Built by engineering students at Venture Lab, TIET</p>

          <motion.div
            className="flex items-center gap-2 text-soft-orange"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            <ArrowDown className="w-5 h-5" />
            <span className="text-sm font-medium">Scroll to explore our business, market and financials</span>
          </motion.div> */}
        </motion.div> 

        {/* Right: Enhanced panel comparison */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center justify-center gap-8"
        >
          {/* Sun rays animation */}
          <motion.div
            className="absolute top-20 right-20 w-40 h-40"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 left-1/2 w-1 h-20 bg-gradient-to-t from-solar-yellow/0 to-solar-yellow/30 origin-bottom"
                style={{ transform: `rotate(${i * 45}deg) translateY(-100%)` }}
              />
            ))}
          </motion.div>

          <div className="flex justify-center items-end gap-12">
            {/* Fixed panel */}
            <motion.div
              initial={{ x: -30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <div className="w-36 h-28 bg-gradient-to-br from-navy/20 to-navy/10 rounded-lg border-2 border-navy/30 flex items-center justify-center shadow-lg">
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="w-7 h-7 bg-navy/40 rounded-sm" />
                    ))}
                  </div>
                </div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-10 bg-gradient-to-b from-charcoal/60 to-charcoal/30 rounded-b" />
              </div>
              <p className="text-sm font-semibold text-charcoal">Fixed Panel</p>
              <div className="w-24 h-5 bg-charcoal/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "50%" }}
                  transition={{ duration: 1.5, delay: 1 }}
                  className="h-full bg-charcoal/40 rounded-full"
                />
              </div>
              <p className="text-xs text-charcoal/60">Base Energy</p>
            </motion.div>

            {/* VS divider */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="text-3xl font-bold text-navy/20 pb-16"
            >
              vs
            </motion.div>

            {/* Tracking panel */}
            <motion.div
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [-15, 15, -15] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  className="w-36 h-28 bg-gradient-to-br from-solar-yellow/30 to-solar-yellow/10 rounded-lg border-2 border-solar-yellow flex items-center justify-center shadow-lg shadow-solar-yellow/20"
                >
                  <div className="grid grid-cols-3 gap-1">
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-7 h-7 bg-solar-yellow/70 rounded-sm"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: i * 0.1 }}
                      />
                    ))}
                  </div>
                </motion.div>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-10 bg-gradient-to-b from-charcoal to-charcoal/50 rounded-b" />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 180, 360] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-6 -right-6"
                >
                  <Sun className="w-10 h-10 text-solar-yellow drop-shadow-lg" />
                </motion.div>
              </div>
              <p className="text-sm font-semibold text-navy">RayCatcher Panel</p>
              <div className="w-24 h-5 bg-solar-yellow/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5, delay: 1.2 }}
                  className="h-full bg-gradient-to-r from-solar-yellow to-soft-orange rounded-full flex items-center justify-end pr-1"
                >
                  <Zap className="w-3 h-3 text-navy" />
                </motion.div>
              </div>
              <motion.p
                className="text-sm font-bold text-solar-yellow"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
              >
                +30% Energy
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
