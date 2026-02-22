"use client"

import { motion } from "framer-motion"

interface PieChartData {
  label: string
  value: number
  color: string
}

interface AnimatedPieChartProps {
  data: PieChartData[]
  isInView: boolean
  delay?: number
}

export default function AnimatedPieChart({ data, isInView, delay = 0 }: AnimatedPieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = -90

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 100 100" className="w-32 h-32">
        {data.map((item, index) => {
          const angle = (item.value / total) * 360
          const startAngle = currentAngle
          const endAngle = currentAngle + angle
          currentAngle = endAngle

          const startRad = (startAngle * Math.PI) / 180
          const endRad = (endAngle * Math.PI) / 180

          const x1 = 50 + 40 * Math.cos(startRad)
          const y1 = 50 + 40 * Math.sin(startRad)
          const x2 = 50 + 40 * Math.cos(endRad)
          const y2 = 50 + 40 * Math.sin(endRad)

          const largeArc = angle > 180 ? 1 : 0

          const pathD = `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`

          return (
            <motion.path
              key={index}
              d={pathD}
              fill={item.color}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: delay + index * 0.1 }}
            />
          )
        })}
      </svg>

      <div className="mt-4 space-y-1">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: delay + 0.3 + index * 0.1 }}
            className="flex items-center gap-2 text-xs"
          >
            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
            <span className="text-charcoal/80">
              {item.label}: {item.value}%
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
