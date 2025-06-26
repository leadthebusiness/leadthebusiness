"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Zap, Globe, Users, MessageSquare, Crown } from "lucide-react"

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function WhyLTBWorksSection() {
  const reasons = [
    {
      title: "Actionable Systems, Not Theory",
      icon: Zap,
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Real-World Indian Market Knowledge",
      icon: Globe,
      color: "from-green-500 to-green-600",
    },
    {
      title: "Time-Saving Team Building Techniques",
      icon: Users,
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Deep Mentorship + Honest Feedback",
      icon: MessageSquare,
      color: "from-orange-500 to-orange-600",
    },
  ]

  return (
    <section className="py-16 bg-black relative overflow-hidden">
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
          className="text-center mb-12"
        >
          <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20 mb-4 px-4 py-2 text-sm">
            Why Choose Us
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Why Founders </span>
            <span className="text-yellow-500">Choose Us</span>
          </h2>
        </motion.div>

        {/* 2x2 Grid Layout */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          {reasons.map((reason, index) => (
            <motion.div key={index} variants={fadeInUp} whileHover={{ y: -5, scale: 1.02 }} className="group relative">
              {/* Card Container */}
              <div className="relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 overflow-hidden">
                {/* Content */}
                <div className="relative z-10 p-6 text-center">
                  {/* Icon and Check */}
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${reason.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <reason.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="w-4 h-4 text-black" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                    {reason.title}
                  </h3>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-2 right-2 w-16 h-16 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full blur-xl" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Benefit - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-300 overflow-hidden group">
            <div className="relative z-10 p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Crown className="w-6 h-6 text-black" />
                </div>
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <CheckCircle className="w-4 h-4 text-black" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white leading-tight group-hover:text-yellow-400 transition-colors duration-300">
                For Beginners, Solopreneurs & Future CEOs
              </h3>
            </div>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full border-2 border-black"
                />
              ))}
            </div>
            <div className="text-left">
              <div className="text-yellow-400 font-bold text-sm">500+ Entrepreneurs</div>
              <div className="text-gray-400 text-xs">Already transformed</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
