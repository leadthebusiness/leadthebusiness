"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users, Star, ChevronLeft, ChevronRight, Play, Award } from "lucide-react"
import { client, urlFor } from "@/lib/sanity"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

interface Course {
  _id: string
  title: string
  slug: { current: string }
  description: string
  thumbnail: any
  price: number
  originalPrice?: number
  duration: string
  level: string
  studentsEnrolled: number
  rating: number
  category: {
    title: string
    slug: { current: string }
  }
  instructor: string
  featured: boolean
}

export default function CoursesCarousel() {
  const [courses, setCourses] = useState<Course[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Responsive slides per view
  const [slidesToShow, setSlidesToShow] = useState(3)

  const fetchCourses = async () => {
    const query = `*[_type == "course"] | order(featured desc, _createdAt desc)[0...8] {
      _id,
      title,
      slug,
      description,
      thumbnail,
      price,
      originalPrice,
      duration,
      level,
      studentsEnrolled,
      rating,
      category->{
        title,
        slug
      },
      instructor,
      featured
    }`

    return await client.fetch(query)
  }

  // Handle responsive slides
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSlidesToShow(1)
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2)
      } else {
        setSlidesToShow(3)
      }
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true)
        const coursesData = await fetchCourses()
        setCourses(coursesData)
      } catch (err) {
        console.error("Error fetching courses:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCourses()
  }, [])

  // Calculate max slides based on courses length and slides to show
  const maxSlides = Math.max(0, courses.length - slidesToShow)

  // Auto-scroll functionality
  useEffect(() => {
    if (courses.length > slidesToShow) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1
          return nextIndex > maxSlides ? 0 : nextIndex
        })
      }, 4000) // Change slide every 4 seconds

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [courses.length, slidesToShow, maxSlides])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const calculateDiscount = (originalPrice?: number, price?: number) => {
    if (!originalPrice || !price || originalPrice <= price) return 0
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  const nextSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1
      return nextIndex > maxSlides ? 0 : nextIndex
    })
  }

  const prevSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1
      return nextIndex < 0 ? maxSlides : nextIndex
    })
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-black to-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-spin mb-4 mx-auto flex items-center justify-center">
              <BookOpen className="w-8 h-8 text-black" />
            </div>
            <p className="text-gray-400">Loading courses...</p>
          </div>
        </div>
      </section>
    )
  }

  if (courses.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-600/5 rounded-full blur-3xl" />
      </div>

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

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-8">
            <BookOpen className="w-5 h-5 text-yellow-500" />
            <span className="text-yellow-400 text-sm font-medium">FEATURED COURSES</span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="text-white">Transform Your Skills with </span>
            <span className="text-yellow-500 relative">
              Expert Courses
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" />
            </span>
          </h2>

          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Master business fundamentals with our comprehensive courses designed by industry experts
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-8">
            <div className="flex items-center gap-3 bg-gray-900/50 rounded-2xl px-6 py-3 border border-gray-800">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-300 font-medium">{courses.length}+ Courses</span>
            </div>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Navigation Buttons - Only show if we have more courses than slides to show */}
          {courses.length > slidesToShow && (
            <>
              <div className="absolute top-1/2 -translate-y-1/2 -left-4 lg:-left-16 z-20">
                <Button
                  onClick={prevSlide}
                  size="icon"
                  className="w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all duration-300 shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 -right-4 lg:-right-16 z-20">
                <Button
                  onClick={nextSlide}
                  size="icon"
                  className="w-12 h-12 bg-gray-900/80 backdrop-blur-sm border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500/50 transition-all duration-300 shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>
            </>
          )}

          {/* Carousel */}
          <div className="overflow-hidden rounded-2xl">
            <motion.div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)`,
              }}
            >
              {courses.map((course, index) => (
                <div 
                  key={course._id} 
                  className={`flex-shrink-0 px-3 ${
                    slidesToShow === 1 ? 'w-full' : 
                    slidesToShow === 2 ? 'w-1/2' : 
                    'w-1/3'
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group h-full"
                  >
                    <Card className="bg-gray-900 border border-gray-800/50 hover:border-yellow-500/40 transition-all duration-700 overflow-hidden h-full shadow-2xl hover:shadow-yellow-500/10 backdrop-blur-sm">
                      {/* Course Image */}
                      <div className="relative h-48 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10" />
                        <Image
                          src={
                            course.thumbnail
                              ? urlFor(course.thumbnail).width(400).height(200).url()
                              : "/placeholder.svg?height=200&width=400"
                          }
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Badges */}
                        <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                          {course.featured && (
                            <Badge className="bg-yellow-500 text-black font-semibold shadow-lg">Featured</Badge>
                          )}
                          {course.originalPrice && course.originalPrice > course.price && (
                            <Badge className="bg-red-500/90 text-white font-semibold shadow-lg">
                              {calculateDiscount(course.originalPrice, course.price)}% OFF
                            </Badge>
                          )}
                        </div>

                        <div className="absolute top-4 right-4 z-20">
                          <Badge className="bg-black/70 text-white border-yellow-500/30 backdrop-blur-sm">
                            {course.level || "All Levels"}
                          </Badge>
                        </div>

                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="w-16 h-16 bg-yellow-500/90 rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-8 h-8 text-black ml-1" />
                          </div>
                        </div>

                        {/* Course Stats Overlay */}
                        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2">
                          <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 border border-yellow-500/30">
                            <div className="flex items-center gap-2 text-yellow-400">
                              <Star className="w-3 h-3 fill-yellow-500" />
                              <span className="text-xs font-medium">{course.rating || 4.8}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardHeader className="pb-3">
                        {/* Category and Rating */}
                        <div className="flex items-center justify-between mb-3">
                          <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                            {course.category?.title || "General"}
                          </Badge>
                          <div className="flex items-center gap-1 text-gray-400">
                            <Users className="w-3 h-3" />
                            <span className="text-xs">{course.studentsEnrolled || 0}</span>
                          </div>
                        </div>

                        {/* Title */}
                        <CardTitle className="text-lg font-bold text-white group-hover:text-yellow-400 transition-colors duration-300 line-clamp-2 leading-tight">
                          {course.title}
                        </CardTitle>

                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{course.description}</p>
                      </CardHeader>

                      <CardContent className="pt-0">
                        {/* Course Meta */}
                        <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            <span>{course.duration || "Self-paced"}</span>
                          </div>
                        </div>

                        {/* Pricing and CTA */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="text-xl font-bold text-yellow-500">{formatPrice(course.price || 0)}</div>
                            {course.originalPrice && course.originalPrice > course.price && (
                              <div className="text-sm text-gray-500 line-through">
                                {formatPrice(course.originalPrice)}
                              </div>
                            )}
                          </div>
                          <Link href={`/course/${course.slug.current}`}>
                            <Button
                              size="sm"
                              className="bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 hover:from-yellow-500 hover:to-yellow-600 text-yellow-400 hover:text-black border border-yellow-500/30 hover:border-yellow-500 transition-all duration-300 text-xs font-semibold"
                            >
                              View Course
                            </Button>
                          </Link>
                        </div>
                      </CardContent>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-600/5 rounded-lg" />
                      </div>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Carousel Indicators - Only show if we have more courses than slides to show */}
          {courses.length > slidesToShow && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: maxSlides + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-yellow-500 scale-125" : "bg-gray-600 hover:bg-gray-500 hover:scale-110"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-16"
        >
          <Link href="/course">
            <Button
              size="lg"
              className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-8 py-4 text-lg shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 group"
            >
              <BookOpen className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Explore All Courses
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}