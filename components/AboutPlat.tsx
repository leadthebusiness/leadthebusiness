"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Target, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

export default function AboutPlatformSection() {
  const features = [
    {
      icon: Target,
      title: "Clarity-First Strategy",
      description: "Clear roadmaps that eliminate confusion",
    },
    {
      icon: TrendingUp,
      title: "Execution-Focused Systems",
      description: "Proven frameworks that deliver results",
    },
    {
      icon: Users,
      title: "Long-Term Vision",
      description: "Build businesses that last and scale",
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-600/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 mb-6 px-4 py-2 text-sm">
            About The Platform
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-8">
            <span className="text-white">What is </span>
            <span className="text-yellow-500">Lead The Business?</span>
          </h2>
        </motion.div>

        {/* Main Content with Owner Image */}
        <div className="grid lg:grid-cols-3 gap-12 items-center mb-20">
          {/* Left Side - Owner Image (Smaller) */}
          <motion.div
            variants={fadeInLeft}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative lg:col-span-1"
          >
            <div className="relative max-w-sm mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-yellow-500/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-yellow-600/20 rounded-full blur-xl" />

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/10">
                <Image
                  src="/pic-2.png"
                  alt="Chandrabhan Singh Rajawat - Founder of Lead The Business"
                  width={280}
                  height={350}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-3 -right-3 bg-black/90 backdrop-blur-sm rounded-xl p-3 border border-yellow-500/30">
                <div className="text-yellow-500 font-bold text-sm">CMD</div>
                <div className="text-gray-300 text-xs">YOUTAG Infotech</div>
              </div>

              {/* Quote Bubble */}
              <div className="absolute -top-3 -right-6 bg-yellow-500 text-black p-2 rounded-xl rounded-tr-none max-w-40 hidden lg:block">
                <p className="text-xs font-medium">"Building systems that make dreams real"</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            variants={fadeInRight}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-8 lg:col-span-2"
          >
            {/* Main Description */}
            <div className="space-y-6">
              <div className="prose prose-lg max-w-none">
                <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium mb-6">
                  A{" "}
                  <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-1 rounded-lg">
                    mentorship-driven platform
                  </span>{" "}
                  designed to help founders, students, and new-age entrepreneurs build real businesses with long-term
                  vision.
                </p>

                <div className="grid md:grid-cols-1 gap-6">
                  <div className="bg-gray-900/30 rounded-xl p-6 border-l-4 border-yellow-500">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      At LTB, we teach <span className="text-white font-semibold">clarity-first strategy</span> and{" "}
                      <span className="text-white font-semibold">execution-focused systems</span> that save years of
                      trial-and-error.
                    </p>
                  </div>

                  <div className="bg-gray-900/30 rounded-xl p-6 border-l-4 border-yellow-500">
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Whether you're <span className="text-yellow-400 font-medium">starting from scratch</span> or{" "}
                      <span className="text-yellow-400 font-medium">stuck at the same level</span>, we help you move
                      forward—
                      <span className="text-yellow-400 font-semibold">confidently</span>.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3 bg-yellow-500/10 rounded-full px-4 py-2 border border-yellow-500/20">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-yellow-400 font-semibold text-sm">10+ Years Experience</span>
              </div>
              <div className="flex items-center gap-3 bg-yellow-500/10 rounded-full px-4 py-2 border border-yellow-500/20">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-yellow-400 font-semibold text-sm">500+ Success Stories</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid - Single Line on Mobile */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-3 gap-4 lg:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center relative"
            >
              <div className="relative mb-4 lg:mb-6">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl lg:rounded-2xl flex items-center justify-center mx-auto border border-yellow-500/30 group-hover:border-yellow-500/50 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <h3 className="text-sm lg:text-xl font-bold text-white mb-2 lg:mb-3 group-hover:text-yellow-400 transition-colors duration-300 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed text-xs lg:text-base hidden lg:block">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
