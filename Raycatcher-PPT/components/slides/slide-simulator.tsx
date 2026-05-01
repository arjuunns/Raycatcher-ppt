"use client"

import type React from "react"

import { motion, useInView } from "framer-motion"
import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sky } from "@react-three/drei"
import * as THREE from "three"
import { Play, Pause, RotateCcw, Sun, Sunrise, Sunset, TrendingUp, Clock, Gauge } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import bmc from "@/data/bmc.json"

// Constants
const SUNRISE = 360 // 6:00 AM
const SUNSET = 1080 // 6:00 PM
const MAX_POWER = 200
const MAX_GAIN_PCT = 26

function getSunPosition(minutes: number) {
  const dayProgress = Math.max(0, Math.min(1, (minutes - SUNRISE) / (SUNSET - SUNRISE)))
  const angle = dayProgress * Math.PI
  const elevation = Math.sin(angle) * 70
  const azimuth = -90 + dayProgress * 180
  return { elevation, azimuth, dayProgress }
}

function calculatePower(sunElevation: number, panelAngle: number) {
  if (sunElevation <= 0) return 0
  const incidenceAngle = Math.abs(sunElevation - panelAngle)
  const sunIntensity = Math.sin((sunElevation * Math.PI) / 180)
  const cosIncidence = Math.cos((incidenceAngle * Math.PI) / 180)
  return MAX_POWER * cosIncidence * sunIntensity
}

function minutesToTime(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = Math.floor(minutes % 60)
  const period = hours >= 12 ? "PM" : "AM"
  const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
  return `${displayHours}:${mins.toString().padStart(2, "0")} ${period}`
}

// 3D Solar Panel Component
function SolarPanel({ panelAngle }: { panelAngle: number }) {
  const groupRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (-panelAngle * Math.PI) / 180,
        0.1,
      )
    }
  })

  return (
    <group position={[0, 0.5, 0]}>
      {/* Mount pole */}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 1, 16]} />
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Base */}
      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.4, 0.5, 0.1, 32]} />
        <meshStandardMaterial color="#1f2937" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Rotating panel group */}
      <group ref={groupRef}>
        {/* Panel frame */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2.4, 0.08, 1.4]} />
          <meshStandardMaterial color="#1f2937" metalness={0.7} roughness={0.3} />
        </mesh>

        {/* Solar cells grid */}
        {Array.from({ length: 6 }).map((_, col) =>
          Array.from({ length: 3 }).map((_, row) => (
            <mesh key={`${col}-${row}`} position={[-0.95 + col * 0.38, 0.05, -0.45 + row * 0.45]}>
              <boxGeometry args={[0.35, 0.02, 0.42]} />
              <meshStandardMaterial color="#1e3a8a" metalness={0.4} roughness={0.1} envMapIntensity={1.5} />
            </mesh>
          )),
        )}

        {/* Cell grid lines */}
        {Array.from({ length: 6 }).map((_, col) =>
          Array.from({ length: 3 }).map((_, row) => (
            <lineSegments key={`line-${col}-${row}`} position={[-0.95 + col * 0.38, 0.065, -0.45 + row * 0.45]}>
              <edgesGeometry args={[new THREE.BoxGeometry(0.35, 0.02, 0.42)]} />
              <lineBasicMaterial color="#60a5fa" transparent opacity={0.6} />
            </lineSegments>
          )),
        )}
      </group>
    </group>
  )
}

// Animated Sun
function AnimatedSun({ elevation, azimuth }: { elevation: number; azimuth: number }) {
  const glowRef = useRef<THREE.Mesh>(null)

  const sunX = Math.sin((azimuth * Math.PI) / 180) * 8
  const sunY = Math.max(0.5, (elevation / 70) * 6 + 1)
  const sunZ = -Math.cos((azimuth * Math.PI) / 180) * 8

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1)
    }
  })

  if (elevation < 0) return null

  return (
    <group position={[sunX, sunY, sunZ]}>
      {/* Sun glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <meshBasicMaterial color="#ffd700" transparent opacity={0.3} />
      </mesh>
      {/* Sun core */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshBasicMaterial color="#ffd700" />
      </mesh>
      {/* Point light */}
      <pointLight color="#fff7ed" intensity={2} distance={20} />
    </group>
  )
}

// Ground with grid
function Ground() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#1a1a2e" />
      </mesh>
      <gridHelper args={[30, 30, "#2d2d4a", "#1f1f3a"]} position={[0, -0.99, 0]} />
    </group>
  )
}

// 3D Scene Component
function Scene({ timeMinutes }: { timeMinutes: number }) {
  const { elevation, azimuth } = getSunPosition(timeMinutes)
  const panelAngle = Math.max(5, Math.min(85, elevation))

  const isDaytime = elevation > 0
  const sunPosition: [number, number, number] = [
    Math.sin((azimuth * Math.PI) / 180) * 100,
    Math.max(1, elevation),
    -Math.cos((azimuth * Math.PI) / 180) * 100,
  ]

  return (
    <>
      <ambientLight intensity={isDaytime ? 0.4 : 0.1} />
      <directionalLight
        position={sunPosition}
        intensity={isDaytime ? 1.5 : 0.1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      {isDaytime ? (
        <Sky sunPosition={sunPosition} turbidity={8} rayleigh={2} mieCoefficient={0.005} mieDirectionalG={0.8} />
      ) : (
        <color attach="background" args={["#0a0a1a"]} />
      )}

      <AnimatedSun elevation={elevation} azimuth={azimuth} />
      <SolarPanel panelAngle={panelAngle} />
      <Ground />

      <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={12}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.1}
      />
    </>
  )
}

// Stats Card Component
function StatCard({
  label,
  value,
  unit,
  icon: Icon,
  highlight = false,
}: {
  label: string
  value: string | number
  unit: string
  icon: React.ElementType
  highlight?: boolean
}) {
  return (
    <div className={`rounded-xl p-3 ${highlight ? "bg-primary/10 border border-primary/30" : "bg-secondary"}`}>
      <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
        <Icon className="w-3 h-3" />
        <span>{label}</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-bold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</span>
        <span className="text-muted-foreground text-xs">{unit}</span>
      </div>
    </div>
  )
}

// Energy Bar Chart
function EnergyChart({ trackingEnergy, fixedEnergy }: { trackingEnergy: number; fixedEnergy: number }) {
  const maxEnergy = Math.max(trackingEnergy, fixedEnergy, 1)

  return (
    <div className="bg-secondary rounded-xl p-3">
      <h3 className="text-xs font-medium text-muted-foreground mb-3">Daily Energy Output</h3>
      <div className="flex items-end gap-4 h-24">
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-muted rounded-t-md relative" style={{ height: "100%" }}>
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-zinc-600 to-zinc-500 rounded-t-md transition-all duration-500"
              style={{ height: `${(fixedEnergy / maxEnergy) * 100}%` }}
            />
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-foreground">{fixedEnergy.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">kWh</div>
            <div className="text-xs text-muted-foreground mt-1">Fixed</div>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-2">
          <div className="w-full bg-muted rounded-t-md relative" style={{ height: "100%" }}>
            <div
              className="absolute bottom-0 w-full bg-gradient-to-t from-amber-600 to-orange-500 rounded-t-md transition-all duration-500"
              style={{ height: `${(trackingEnergy / maxEnergy) * 100}%` }}
            />
          </div>
          <div className="text-center">
            <div className="text-sm font-bold text-primary">{trackingEnergy.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground">kWh</div>
            <div className="text-xs text-muted-foreground mt-1">Tracking</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function SlideSimulator() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  const [timeMinutes, setTimeMinutes] = useState(720)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(10)
  const animationRef = useRef<number | null>(null)

  const { elevation } = getSunPosition(timeMinutes)
  const panelAngle = Math.max(5, Math.min(85, elevation))
  const trackingPower = calculatePower(elevation, panelAngle)
  const fixedPower = calculatePower(elevation, 30)
  const rawEfficiencyGain = fixedPower > 0 ? ((trackingPower - fixedPower) / fixedPower) * 100 : 0
  const efficiencyGain = Math.min(rawEfficiencyGain, MAX_GAIN_PCT)

  // Simulated daily totals (from BMC data)
  const trackingDailyEnergy = bmc.tracking_daily_energy_kwh ?? 5.1
  const fixedDailyEnergy = bmc.fixed_daily_energy_kwh ?? 3.2

  useEffect(() => {
    if (isPlaying) {
      const animate = () => {
        setTimeMinutes((prev) => {
          const next = prev + speed / 10
          return next > 1440 ? 0 : next
        })
        animationRef.current = requestAnimationFrame(animate)
      }
      animationRef.current = requestAnimationFrame(animate)
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, speed])

  const handleReset = () => {
    setTimeMinutes(720)
    setIsPlaying(false)
  }

  return (
    <div
      ref={ref}
      className="min-h-screen bg-gradient-to-br from-warm-white via-cyan-50/30 to-blue-50/30 flex items-center justify-center px-6 py-8 relative overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />

      <div className="max-w-7xl w-full relative z-10 space-y-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-3xl lg:text-4xl font-bold text-navy mb-2 text-center"
        >
          RayCatcher Performance Simulator
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-base text-charcoal/70 text-center mb-6 max-w-2xl mx-auto"
        >
          Interactive simulator to compare fixed panels vs RayCatcher tracking under different conditions
        </motion.p>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid lg:grid-cols-3 gap-4"
        >
          {/* 3D Canvas */}
          <div className="lg:col-span-2 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-navy/10 h-auto">
            <Canvas shadows camera={{ position: [5, 3, 5], fov: 50 }}>
              <Suspense fallback={null}>
                <Scene timeMinutes={timeMinutes} />
              </Suspense>
            </Canvas>
          </div>

          {/* Stats Panel */}
          <div className="space-y-3 bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-navy/10">
            <h3 className="text-sm font-semibold text-navy">Live Metrics</h3>

            <div className="grid grid-cols-2 gap-2">
              <StatCard label="Time" value={minutesToTime(timeMinutes)} unit="" icon={Clock} />
              <StatCard label="Sun" value={Math.max(0, elevation).toFixed(1)} unit="°" icon={Sun} />
              <StatCard label="Panel" value={panelAngle.toFixed(1)} unit="°" icon={Gauge} />
              <StatCard
                label="Gain"
                value={`+${efficiencyGain.toFixed(0)}`}
                unit="%"
                icon={TrendingUp}
                highlight={efficiencyGain > 0}
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-secondary rounded-xl p-3">
                <div className="text-xs text-muted-foreground mb-1">Tracking</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-primary">{trackingPower.toFixed(0)}</span>
                  <span className="text-muted-foreground text-xs">W</span>
                </div>
              </div>
              <div className="bg-secondary rounded-xl p-3">
                <div className="text-xs text-muted-foreground mb-1">Fixed</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-bold text-zinc-400">{fixedPower.toFixed(0)}</span>
                  <span className="text-muted-foreground text-xs">W</span>
                </div>
              </div>
            </div>

            <EnergyChart trackingEnergy={trackingDailyEnergy} fixedEnergy={fixedDailyEnergy} />
          </div>
        </motion.div>

        {/* Controls Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl border border-navy/10 p-4 space-y-4"
        >
          <h3 className="text-sm font-semibold text-navy">Controls</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Time Control */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Time of Day</span>
                <span className="font-medium">{minutesToTime(timeMinutes)}</span>
              </div>
              <Slider
                value={[timeMinutes]}
                onValueChange={([v]) => setTimeMinutes(v)}
                min={0}
                max={1440}
                step={1}
                className="w-full"
              />
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Animation Speed</span>
                <span className="font-medium">{speed}x</span>
              </div>
              <Slider
                value={[speed]}
                onValueChange={([v]) => setSpeed(v)}
                min={1}
                max={50}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setIsPlaying(!isPlaying)} size="sm" className="flex-1 min-w-[100px]">
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 mr-1" /> Pause
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1" /> Play
                </>
              )}
            </Button>
            <Button variant="secondary" size="sm" onClick={handleReset} className="flex-1 min-w-[100px]">
              <RotateCcw className="w-3 h-3 mr-1" /> Reset
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTimeMinutes(SUNRISE)} className="flex-1 min-w-[80px]">
              <Sunrise className="w-3 h-3 mr-1" /> Sunrise
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTimeMinutes(720)} className="flex-1 min-w-[80px]">
              <Sun className="w-3 h-3 mr-1" /> Noon
            </Button>
            <Button variant="outline" size="sm" onClick={() => setTimeMinutes(SUNSET)} className="flex-1 min-w-[80px]">
              <Sunset className="w-3 h-3 mr-1" /> Sunset
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
