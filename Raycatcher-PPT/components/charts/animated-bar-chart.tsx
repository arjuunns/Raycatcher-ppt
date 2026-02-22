"use client"

import { motion } from "framer-motion"

interface BarChartData {
  label: string
  value: number
  color: string
  max: number
}

interface AnimatedBarChartProps {
  data: BarChartData[]
  isInView: boolean
  delay?: number
}

export default function AnimatedBarChart({ data, isInView, delay = 0 }: AnimatedBarChartProps) {
  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <span className="text-charcoal/80">{item.label}</span>
            <motion.span
              className="font-bold text-charcoal"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: delay + 0.5 + index * 0.1 }}
            >
              ₹{item.value}L
            </motion.span>
          </div>
          <div className="h-6 rounded-full overflow-hidden bg-gray-100">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(item.value / item.max) * 100}%` } : {}}
              transition={{ duration: 0.8, delay: delay + index * 0.12, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
