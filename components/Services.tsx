"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Zap, TrendingUp, Crown } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

export default function ServicesSection() {
  const journeySteps = [
    {
      number: "01",
      title: "START",
      icon: Zap,
      highlight: "Launch",
    },
    {
      number: "02",
      title: "GROW",
      icon: TrendingUp,
      highlight: "Scale",
    },
    {
      number: "03",
      title: "LEAD",
      icon: Crown,
      highlight: "Dominate",
    },
  ]

  const benefits = [
    "Build your first business without confusion",
    "Learn proven systems, not vague motivation",
    "Avoid beginner mistakes most founders make",
    "Turn effort into real income and scale with clarity",
  ]

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-black via-gray-950 to-black relative">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 lg:mb-20"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 lg:px-6 py-2 mb-6 lg:mb-8">
            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
            <span className="text-yellow-400 text-sm font-medium">THE JOURNEY</span>
          </div>

          <h2 className="text-3xl lg:text-6xl font-bold leading-tight mb-4 lg:mb-6">
            From{" "}
            <span className="text-yellow-500 relative">
              Idea
              <div className="absolute -bottom-1 lg:-bottom-2 left-0 right-0 h-0.5 lg:h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" />
            </span>{" "}
            to{" "}
            <span className="text-yellow-500 relative">
              Impact
              <div className="absolute -bottom-1 lg:-bottom-2 left-0 right-0 h-0.5 lg:h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" />
            </span>
          </h2>

          <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
            I guide you through every stage of your entrepreneurial journey
          </p>
        </motion.div>

        {/* Journey Timeline - Horizontal for both Mobile and Desktop */}
        <div className="relative mb-12 lg:mb-20">
          {/* Timeline Line - Now visible on both mobile and desktop */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent transform -translate-y-1/2" />

          <div className="grid grid-cols-3 gap-4 lg:gap-0">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="relative group"
              >
                {/* Timeline Node - Now visible on both mobile and desktop */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 lg:w-4 lg:h-4 bg-yellow-500 rounded-full border-2 lg:border-4 border-black z-10 group-hover:scale-125 transition-transform duration-300" />

                <div className="text-center px-2 lg:px-8">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl lg:rounded-2xl mb-3 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <span className="text-black font-bold text-sm lg:text-xl">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="mb-2 lg:mb-4">
                    <step.icon className="w-5 h-5 lg:w-8 lg:h-8 text-yellow-500 mx-auto" />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg lg:text-2xl font-bold text-white mb-1 lg:mb-2">{step.title}</h3>

                  {/* Highlight */}
                  <p className="text-yellow-400 font-medium text-sm lg:text-lg">{step.highlight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Benefits Section - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-10 lg:mb-16"
        >
          <div className="grid md:grid-cols-2 gap-3 lg:gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="flex items-start gap-3 lg:gap-4 p-4 lg:p-6 rounded-xl lg:rounded-2xl bg-gradient-to-r from-gray-900/50 to-transparent border border-gray-800 hover:border-yellow-500/30 transition-all duration-300">
                  <div className="flex-shrink-0 w-6 h-6 lg:w-8 lg:h-8 bg-yellow-500 rounded-lg flex items-center justify-center mt-0.5">
                    <span className="text-black font-bold text-xs lg:text-sm">{index + 1}</span>
                  </div>
                  <p className="text-gray-300 text-sm lg:text-lg leading-relaxed group-hover:text-white transition-colors duration-300">
                    {benefit}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-500 hover:from-yellow-600 hover:via-yellow-700 hover:to-yellow-600 text-black font-bold px-8 lg:px-10 py-3 lg:py-4 text-base lg:text-lg rounded-full shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center">
              Start Your Journey
              <ArrowRight className="w-4 h-4 lg:w-5 lg:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
