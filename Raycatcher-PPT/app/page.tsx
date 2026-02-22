"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import SlideTitle from "@/components/slides/slide-title"
import SlideProblem from "@/components/slides/slide-problem"
import SlideSolution from "@/components/slides/slide-solution"
import SlideMarket from "@/components/slides/slide-market"
import SlideCustomerValue from "@/components/slides/slide-customer-value"
import SlideBusinessModel from "@/components/slides/slide-business-model"
import SlideActivitiesResources from "@/components/slides/slide-activities-resources"
import SlideFinancials from "@/components/slides/slide-financials"
import SlideAskRoadmap from "@/components/slides/slide-ask-roadmap"
import SlideTeam from "@/components/slides/slide-team"
import SlideSimulator from "@/components/slides/slide-simulator"
import SlideThankYou from "@/components/slides/slide-thank-you"
import SlidePortersForces from "@/components/slides/slide-porters-forces"
import SlideNavigation from "@/components/slide-navigation"

const slides = [
  { id: 1, title: "RayCatcher" },
  { id: 2, title: "Team" },
  { id: 3, title: "Problem" },
  { id: 4, title: "Solution" },
  { id: 5, title: "Market" },
  { id: 6, title: "Porter's 5" },
  { id: 7, title: "Segments" },
  { id: 8, title: "Business" },
  { id: 9, title: "Activities" },
  { id: 10, title: "Financials" },
  { id: 11, title: "The Ask" },
  { id: 12, title: "Simulator" },
  { id: 13, title: "Thank You" },
]

export default function PresentationPage() {
  const [currentSlide, setCurrentSlide] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ container: containerRef })
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  const scrollToSlide = useCallback((slideNumber: number) => {
    const element = document.getElementById(`slide-${slideNumber}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault()
        const next = Math.min(currentSlide + 1, slides.length)
        scrollToSlide(next)
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault()
        const prev = Math.max(currentSlide - 1, 1)
        scrollToSlide(prev)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSlide, scrollToSlide])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slideId = Number.parseInt(entry.target.id.replace("slide-", ""))
            setCurrentSlide(slideId)
          }
        })
      },
      { root: container, threshold: 0.5 },
    )

    slides.forEach((slide) => {
      const element = document.getElementById(`slide-${slide.id}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="relative">
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-solar-yellow z-50 origin-left" style={{ scaleX }} />

      {/* Navigation */}
      <SlideNavigation slides={slides} currentSlide={currentSlide} onNavigate={scrollToSlide} />

      {/* Main content */}
      <div ref={containerRef} className="h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth">
        <section id="slide-1" className="snap-start">
          <SlideTitle />
        </section>
        <section id="slide-2" className="snap-start">
          <SlideTeam />
        </section>
        <section id="slide-3" className="snap-start">
          <SlideProblem />
        </section>
        <section id="slide-4" className="snap-start">
          <SlideSolution />
        </section>
        <section id="slide-5" className="snap-start">
          <SlideMarket />
        </section>
        <section id="slide-6" className="snap-start">
          <SlidePortersForces />
        </section>
        {/* <section id="slide-7" className="snap-start">
          <SlideCustomerValue />
        </section> */}
        {/* <section id="slide-8" className="snap-start">
          <SlideBusinessModel />
        </section> */}
        {/* <section id="slide-9" className="snap-start">
          <SlideActivitiesResources />
        </section> */}
        {/* <section id="slide-10" className="snap-start">
          <SlideFinancials />
        </section> */}
        {/* <section id="slide-11" className="snap-start">
          <SlideAskRoadmap />
        </section> */}
        {/* <section id="slide-12" className="snap-start">
          <SlideSimulator />
        </section> */}
        <section id="slide-13" className="snap-start">
          <SlideThankYou />
        </section>

        {/* Footer */}
        <footer className="bg-navy text-warm-white py-4 px-8 text-center text-sm">
          <p>
            RayCatcher – Smart Solar Tracking System | SubGroup: 3Q14 | Group No.: 5 | UTA025 – Innovation & Entrepreneurship | Venture
            Lab, TIET, Patiala | Session: Jan–June 2026 | All financials in INR (₹)
          </p>
        </footer>
      </div>
    </div>
  )
}
