"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Sun } from "lucide-react"

const team = [
  {
    name: "Shreyas Mahajan",
    rollNo: "102317XXX",
    initials: "SM",
    gradient: "from-amber-400 to-orange-500",
  },
  {
    name: "Kavya Aggarwal",
    rollNo: "102317XXX",
    initials: "KA",
    gradient: "from-rose-400 to-pink-500",
  },
  {
    name: "Arjun Singh",
    rollNo: "102317XXX",
    initials: "AS",
    gradient: "from-blue-400 to-indigo-500",
  },
  {
    name: "Akshit Singla",
    rollNo: "102317XXX",
    initials: "AS",
    gradient: "from-emerald-400 to-teal-500",
  },
  {
    name: "Chahat",
    rollNo: "102317XXX",
    initials: "CH",
    gradient: "from-purple-400 to-violet-500",
  },
]

export default function SlideTeam() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-8 py-12 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-solar-yellow/20 to-orange-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-purple-500/10 rounded-full blur-3xl"
        />
        {/* Sun rays pattern */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-1 h-full bg-solar-yellow origin-bottom"
              style={{ transform: `translateX(-50%) rotate(${i * 30}deg)` }}
            />
          ))}
        </div>
      </div>

      <div className="max-w-5xl w-full relative z-10">
        {/* Course Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <div className="inline-flex flex-col gap-1 bg-slate-800/60 backdrop-blur-sm py-3 px-6 rounded-2xl border border-slate-700/50">
            <p className="text-sm text-slate-300 font-medium">
              SubGroup: 3Q14 | Group No: 5 | Course: UTA025 – Innovation & Entrepreneurship
            </p>
            <p className="text-xs text-slate-400">
              Venture Lab, TIET, Patiala | Session: Jan-June 2026
            </p>
          </div>
        </motion.div>

        {/* Header with sun icon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-solar-yellow to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-solar-yellow/30"
          >
            <Sun className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            The innovators bringing smart solar tracking to India
          </p>
        </motion.div>

        {/* Team cards - centered flex layout */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ 
                duration: 0.5, 
                delay: 0.2 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-solar-yellow/20 to-orange-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative bg-slate-800/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-700/50 hover:border-solar-yellow/30 transition-all duration-300 w-44">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg`}
                >
                  <span className="text-2xl font-bold text-white">{member.initials}</span>
                </motion.div>
                
                {/* Name */}
                <h3 className="font-bold text-white text-base mb-1 text-center">
                  {member.name}
                </h3>
                
                {/* Roll number */}
                <p className="text-slate-500 text-xs font-mono text-center">
                  {member.rollNo}
                </p>
                
                {/* Decorative line */}
                <div className="mt-4 h-0.5 w-12 mx-auto bg-gradient-to-r from-transparent via-solar-yellow/50 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-slate-800/60 backdrop-blur-sm py-3 px-6 rounded-full border border-slate-700/50">
            <div className="w-2 h-2 rounded-full bg-solar-yellow animate-pulse" />
            <p className="text-sm text-slate-400">
              TIET, Patiala • Venture Lab Ecosystem
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
