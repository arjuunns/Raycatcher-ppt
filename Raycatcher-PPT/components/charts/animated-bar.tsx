"use client"

import { motion } from "framer-motion"

interface BarData {
  label: string
  value: number
  color: string
}

interface AnimatedBarProps {
  data: BarData[]
  isInView: boolean
  delay?: number
}

export default function AnimatedBar({ data, isInView, delay = 0 }: AnimatedBarProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <div className="space-y-4">
      {/* Stacked horizontal bar */}
      <div className="h-8 rounded-full overflow-hidden flex bg-gray-100">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="h-full"
            style={{ backgroundColor: item.color }}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${(item.value / total) * 100}%` } : {}}
            transition={{ duration: 0.8, delay: delay + index * 0.1, ease: "easeOut" }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="space-y-2">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.4 + index * 0.1 }}
            className="flex items-center justify-between text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
              <span className="text-charcoal/80">{item.label}</span>
            </div>
            <span className="font-semibold text-charcoal">{item.value}%</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
