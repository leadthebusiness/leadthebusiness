"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  Star,
  Calendar,
  Award,
  ChevronRight,
  Play,
  Quote,
  MapPin,
  Mail,
  Phone,
  Instagram,
  Linkedin,
  Youtube,
  TrendingUp,
  Target,
  Building,
  Lightbulb,
  CheckCircle,
  ArrowRight,
  Zap,
  BarChart3,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"
import UpcomingEventsCarousel from "@/components/Events"
import ParallaxCarousel from "@/components/Coro"
import InfiniteCarousel from "@/components/Coro"
import SocialConnectSection from "@/components/Social"
import Carousel3D from "@/components/Coro3d"
import MediaCoverageSection from "@/components/Media"
import ServicesSection from "@/components/Services"
import AboutPlatformSection from "@/components/AboutPlat"
import WhyLTBWorksSection from "@/components/Works"
import Navigation from "@/components/Nav"
import CoursesCarousel from "@/components/Course-coro"

// Count-up animation hook
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true)
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * end))
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, end, duration, isVisible])

  return { count, ref }
}

const fadeInUp = {
  initial: { opacity: 0, y: 80 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInRight = {
  initial: { opacity: 0, x: 80 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function BaseshGalaWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  // Navigation items
  const navItems = [
    "Home",
    "Our Programs",
    "Course",
    "Events",
    "Scale",
    "Gallery",
    "Blog",
    "Contact",
  ]

  // Stats data with count-up
  const StatsCard = ({
    label,
    value,
    icon: Icon,
    suffix = "",
  }: { label: string; value: number; icon: any; suffix?: string }) => {
    const { count, ref } = useCountUp(value)

    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50, scale: 0.8 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{ scale: 1.05, y: -10 }}
        className="group"
      >
        <Card className="bg-gradient-to-br from-gray-900 to-black border-2 border-yellow-500/20 hover:border-yellow-500/50 transition-all duration-500 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <CardContent className="p-8 text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <Icon className="w-12 h-12 mx-auto mb-6 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
            </motion.div>
            <div className="lg:text-5xl text-3xl font-bold text-yellow-500 mb-3 font-mono">
              {count.toLocaleString()}
              {suffix}
            </div>
            <div className="text-gray-300 text-lg font-medium">{label}</div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Success stories data
  const successStories = [
    {
      name: "Rajesh Sharma",
      role: "Manufacturing Business Owner",
      company: "Sharma Industries",
      story:
        "Basesh's mentorship helped me scale my manufacturing unit from 50 to 200 employees. Revenue increased by 300% in just 18 months.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      growth: "300% Revenue Growth",
    },
    {
      name: "Priya Patel",
      role: "Tech Startup Founder",
      company: "InnovateTech Solutions",
      story:
        "From struggling startup to profitable business - Basesh's strategies transformed our approach to customer acquisition and retention.",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      growth: "Break-even in 8 months",
    },
    {
      name: "Amit Kumar",
      role: "Retail Chain Owner",
      company: "Kumar Retail Group",
      story:
        "His franchise development strategies helped us expand from 3 to 25 stores across 4 states. Incredible business acumen!",
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      growth: "25 Store Expansion",
    },
  ]

  // Services data
  const services = [
    {
      title: "rise to lead",
      description: "Empower your journey with The Rise-to-Lead Course: Master strategic decisions, build high-performance teams, and communicate with impact.",
      icon: Lightbulb,
      features: ["Business Model Validation", "Market Entry Strategy", "Funding Guidance", "Team Building"],
      img: "/course-1.png",
    },
    {
      title: "Business mastery",
      description:
        "Improve the workability of the business, learn how to design a business, ways to boost sales, and effectively create a business.",
      icon: TrendingUp,
      features: ["Operational Efficiency", "Financial Planning", "Market Expansion", "Digital Transformation"],
       img: "/course-2.png",
    },
    {
      title: "Personal finance",
      description: "Secure your financial future by learning to budget, save wisely, and invest in different ways.",
      icon: Building,
      features: ["Franchise Model Design", "Partner Selection", "Training Systems", "Quality Control"],
       img: "/course-3.png",
    },
    {
      title: "Business Finance",
      description: "Learn how to be in charge of the money, understand investments, assess the financial situation, and make the right choices to guarantee the company’s sustainability and profitability.",
      icon: Target,
      features: ["Crisis Management", "Restructuring", "Cost Optimization", "Revenue Recovery"],
       img: "/course-1.png",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      {/* <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-xl border-b border-yellow-500/20"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
       
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-3"
            >
             
              <Link href="/" className="flex items-center space-x-3">
                
                  <Image
                    src="/lead_logo.png"
                    alt="Basesh Gala Logo"
                    width={120}
                    height={120}
                    className="object-contain"
                    priority
                  />
               
              
              </Link>
            </motion.div>

           
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link
                    href="#"
                    className="text-gray-300 hover:text-yellow-500 transition-all duration-300 text-sm font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

           
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden text-yellow-500">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black border-yellow-500/20">
                <div className="flex flex-col space-y-6 mt-8">
                  {navItems.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 py-1 text-lg"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.nav> */}

      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen py-10 flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <motion.div
            style={{ y }}
            className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-transparent to-yellow-600/5"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(234,179,8,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-4 relative z-10 pt-20">
          <div className="grid  lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
              <motion.div variants={fadeInUp}>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-6 px-4 py-2 text-sm">
                  🚀 Lead The Business by
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <span className="text-white">Chandrabhan Singh </span>
                  
                  <span className="text-yellow-600 ">
                    Rajawat
                  </span>
                </h1>
              </motion.div>

              <motion.div variants={fadeInUp}  className="space-y-1">
                <h2 className="text-2xl lg:text-3xl text-yellow-500 font-semibold">
                  Real Business. Real Systems. Real Results. 
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                 Helping young entrepreneurs build businesses that grow, lead, and last.
                </p>
              </motion.div>

              <motion.p variants={fadeInUp} className="text-lg text-gray-400 leading-relaxed max-w-2xl">
             🚀 Strategy | Leadership | Growth Systems
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600  hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-8 py-4 text-lg shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300"
                  asChild
                >
                  <Link href="/course">
                    Start Building Today
                    <ChevronRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg transition-all duration-300"
                >
                  <Play className="mr-2 h-6 w-6" />
                  Watch Success Stories
                </Button>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, x: 100 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Animated rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 border-2 border-yellow-500/30 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-4 border border-yellow-500/20 rounded-full"
                />

                {/* Main image */}
                <div className="relative z-10 p-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur-3xl opacity-30 animate-pulse" />
                    <Image
                      src="/pic-square.png"
                      alt="Basesh Gala - Business Coach"
                      width={500}
                      height={500}
                      className="relative z-10 rounded-full border-4 border-yellow-500/50 shadow-2xl shadow-yellow-500/25"
                    />
                  </div>
                </div>

                {/* Floating elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute top-20 -left-10 bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-xl shadow-lg"
                >
                  <TrendingUp className="w-8 h-8 text-black" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute bottom-20 -right-10 bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 rounded-xl shadow-lg"
                >
                  <Target className="w-8 h-8 text-black" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <ServicesSection />

        {/* About Section with Photo */}
      <section className="py-10 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent rounded-3xl" />
                <Image
                  src="/pic-4.png"
                  alt="Basesh Gala in Business Setting"
                  width={500}
                  height={600}
                  className="rounded-3xl border-2 border-yellow-500/30 shadow-2xl shadow-yellow-500/10"
                />

                {/* Floating achievement badges */}
                <motion.div
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  className="absolute -top-6 -right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 rounded-2xl shadow-lg"
                >
                  <div className="text-black font-bold text-center">
                    <div className="text-2xl">500+</div>
                    <div className="text-sm">Success Stories</div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 mb-4">About Chandrabhan Singh Rajawat</Badge>
                <h2 className="text-5xl font-bold mb-6">
                  <span className="text-white">Meet the Visionary Behind </span>
                  <span className="text-yellow-600">
                    LTB
                  </span>
                </h2>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed">
               I'm Chandrabhan Singh Rajawat, CMD at YOUTAG Infotech Pvt. Ltd., Business Mentor, and Leadership Coach.
                Over the past 10+ years, I’ve helped founders escape the cycle of confusion, overwork, and burnout by creating clear systems that work.
                My goal? To help you build a business that doesn’t rely on constant hustle—but scales on solid foundations.
               
              </p>

              <div className="space-y-4">
                {[
                  "CMD at YOUTAG Infotech Pvt. Ltd., Business Mentor & Leadership Coach",

                  "10+ years of experience mentoring founders and entrepreneurs",

"Helped founders escape confusion, overwork, and burnout",

"Known for creating clear, repeatable business systems that work",

"Focused on building businesses that scale without constant hustle",
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center space-x-3"
                  >
                    <CheckCircle className="lg:w-6 lg:h-6  w-10 h-10 text-yellow-500" />
                    <span className="text-gray-300 text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>

             
            </motion.div>
          </div>
        </div>
      </section>

      
      <AboutPlatformSection />

      <WhyLTBWorksSection />


      <CoursesCarousel />

       {/* <UpcomingEventsCarousel /> */}

      {/* Stats Section */}
      <section className="py-32 hidden bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Figures reveal insights beyond </span>
              <span className="text-yellow-600">
                Words
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Real impact, measurable results - see how we've transformed businesses across industries
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <StatsCard label="Businesses Transformed" value={500} icon={Building} suffix="+" />
            <StatsCard label="Success Rate" value={95} icon={Award} suffix="%" />
            <StatsCard label="Years of Experience" value={15} icon={BarChart3} suffix="+" />
            <StatsCard label="Revenue Generated" value={100} icon={TrendingUp} suffix="Cr+" />
          </div>
        </div>
      </section>

      <InfiniteCarousel />


      

              

    

      

      {/* Services Section */}
      <section className="py-32 hidden bg-gradient-to-b from-gray-950 to-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="text-white">Find details of various courses and programs that could help expand your </span>
              <span className="text-yellow-600">
                business
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              Comprehensive business solutions tailored to your unique challenges and growth objectives
            </p>
          </motion.div>

         <div className="grid md:grid-cols-2  gap-8">
  {services.map((service, index) => (
    <motion.div
      key={service.title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="group"
    >
      <Card className="bg-gradient-to-br  from-gray-900 to-black border-2 border-yellow-500/30 hover:border-yellow-500/60 transition-all duration-500 min-h-[80%] rounded-3xl overflow-hidden">
        <CardContent className="p-0">
          {/* Service Image at Top */}
          <div className="w-full bg-transparent h-[40%] pt-5 flex items-center justify-center overflow-hidden">
            {service.img && (
              <Image
                src={service.img}
                alt={service.title}
                width={300}
                height={160}
                className="w-[70%] h-auto max-h-full object-cover rounded-xl bg-white"
              />
            )}
          </div>
          
          {/* Content Section */}
          <div className="p-6">
            <h2 className="text-yellow-400 font-bold text-xl mb-4 tracking-wide uppercase">
              {service.title}
            </h2>
            
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              {service.description}
            </p>
            
            {/* CTA Button */}
            <button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-black font-bold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-yellow-500/25">
              Enroll Now
              <span className="text-lg transition-transform group-hover:translate-x-1">→→</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  ))}
</div>
        </div>
      </section>

      {/* Success Stories Carousel */}
      <section className="py-8 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
          
            <Carousel3D />
          </motion.div>

          
        </div>
      </section>

      <MediaCoverageSection />

      <SocialConnectSection />

      {/* CTA Section with Photo */}
      <section className="py-32 bg-gradient-to-r from-yellow-500/10 to-yellow-600/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <Image
                src="/pic-2.png"
                alt="Basesh Gala Consulting Session"
                width={500}
                height={500}
                className="rounded-3xl border-2 border-yellow-500/30 shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <h2 className="text-5xl lg:text-6xl font-bold">
                <span className="text-white">Ready to </span>
                <span className="text-yellow-600 bg-transparent">
                  Transform?
                </span>
              </h2>

              <p className="text-xl text-gray-300 leading-relaxed">
                Take the first step towards business success. Book a consultation and discover how we can turn your
                challenges into opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-8 py-4 text-lg shadow-lg shadow-yellow-500/25"
                >
                  Book Free Consultation
                  <Calendar className="ml-2 h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black px-8 py-4 text-lg"
                >
                  <Phone className="mr-2 h-6 w-6" />
                  Call Now
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer
        className="py-16 bg-black border-t border-yellow-500/20 relative overflow-hidden"
      >
        {/* Dimmed full background image */}
        <div
          className="absolute inset-0 w-full h-full z-0"
          style={{
        backgroundImage: "url('/')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        opacity: 0.15,
        pointerEvents: "none",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Image
                src="/lead_logo.png"
                alt="Basesh Gala Logo"
                width={120}
                height={120}
                className="object-contain mb-4"
              />
          <p className="text-gray-400 mb-6 max-w-md">
         Lead The Business by Chandrabhan Singh Rajawat
          </p>
          <div className="flex space-x-4">
            <Button
          size="icon"
          variant="outline"
          className="border-yellow-500/30 hover:bg-yellow-500 hover:text-black"
            >
          <Instagram className="w-5 h-5 text-black" />
            </Button>
            <Button
          size="icon"
          variant="outline"
          className="border-yellow-500/30 hover:bg-yellow-500 hover:text-black"
            >
          <Linkedin className="w-5 h-5 text-black" />
            </Button>
            <Button
          size="icon"
          variant="outline"
          className="border-yellow-500/30 hover:bg-yellow-500 hover:text-black"
            >
          <Youtube className="w-5 h-5 text-black" />
            </Button>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-yellow-500 mb-4">Services</h4>
          <div className="space-y-2 text-gray-400">
            <Link href="#" className="block hover:text-yellow-500 transition-colors">
          Privacy Policy
            </Link>
            <Link href="#" className="block hover:text-yellow-500 transition-colors">
          Terms 
            </Link>
            <Link href="#" className="block hover:text-yellow-500 transition-colors">
          Contact
            </Link>
            <Link href="#" className="block hover:text-yellow-500 transition-colors">
          Careers
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-yellow-500 mb-4">Contact</h4>
          <div className="space-y-3 text-gray-400">
            <div className="flex items-center space-x-2">
          <Mail className="w-4 h-4 text-yellow-500" />
          <span>info@39solutions.com</span>
            </div>
            <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-yellow-500" />
          <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-yellow-500" />
          <Link href={"https://g.co/kgs/S3me1ea"}>
            <span>Pitru Chhaya Building, 6, Naushir Bharucha Marg, Grant Road West, Grant Road (W), Tardeo, Mumbai, Maharashtra 400007</span>
          </Link>
            </div>
          </div>
        </div>
          </div>

          <div className="border-t border-yellow-500/20 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; © 2025 | YOUTAG INFOTECH PVT. LTD. | All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
