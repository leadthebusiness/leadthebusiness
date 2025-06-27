"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Clock, Users, Star, Filter, Search, TrendingUp, Award, ChevronRight, Loader2 } from "lucide-react"
import { client, urlFor } from "@/lib/sanity"
import Navigation from "@/components/Nav"
import Footer from "@/components/Footer"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

interface Course {
  _id: string
  title: string
  slug: { current: string }
  description: string
  thumbnail: any
  price: number
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
  type: string // Optional field for type
}

interface Category {
  _id: string
  title: string
  slug: { current: string }
  description: string
  courseCount: number
}

export default function CoursePage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCourses = async () => {
    const query = `*[_type == "course"] | order(featured desc, _createdAt desc) {
      _id,
      title,
      slug,
      description,
      thumbnail,
      price,
      duration,
      level,
      studentsEnrolled,
      rating,
      category->{
        title,
        slug
      },
      instructor,
      featured,
      type
    }`

    return await client.fetch(query)
  }

  const fetchCategories = async () => {
    const query = `*[_type == "courseCategory"] {
      _id,
      title,
      slug,
      description,
      "courseCount": count(*[_type == "course" && references(^._id)])
    } | order(title asc)`

    return await client.fetch(query)
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const [coursesData, categoriesData] = await Promise.all([fetchCourses(), fetchCategories()])

        setCourses(coursesData)
        setCategories(categoriesData)
        setFilteredCourses(coursesData)
      } catch (err) {
        setError("Failed to load courses. Please try again later.")
        console.error("Error fetching courses:", err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  useEffect(() => {
    let filtered = courses

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category?.slug.current === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (course) =>
          course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          course.description.toLowerCase().includes(searchTerm.toLowerCase()) 
         
      )
    }

    setFilteredCourses(filtered)
  }, [courses, selectedCategory, searchTerm])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-spin mb-4 mx-auto flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-black" />
          </div>
          <p className="text-gray-400">Loading courses...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Error Loading Courses</h1>
          <p className="text-gray-400 mb-8">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden ">
      {/* Background Elements */}
      <Navigation />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-yellow-500/3 rounded-full blur-3xl" />
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

      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-6 py-3 mb-8">
              <BookOpen className="w-5 h-5 text-yellow-500" />
              <span className="text-yellow-400 text-sm font-medium">PROFESSIONAL COURSES</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Master Your </span>
              <span className="text-yellow-500 relative">
                Business Skills
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" />
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Transform your entrepreneurial journey with our comprehensive courses designed by industry experts.
            </p>

            {/* Stats */}
          
          </motion.div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-2 flex-wrap">
                <Filter className="w-5 h-5 text-gray-400" />
                <Button
                  onClick={() => setSelectedCategory("all")}
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  className={
                    selectedCategory === "all"
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                      : "border-gray-700 text-gray-300 hover:border-yellow-500/50"
                  }
                >
                  All Courses
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category._id}
                    onClick={() => setSelectedCategory(category.slug.current)}
                    variant={selectedCategory === category.slug.current ? "default" : "outline"}
                    className={
                      selectedCategory === category.slug.current
                        ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black"
                        : "border-gray-700 text-gray-300 hover:border-yellow-500/50"
                    }
                  >
                    {category.title} ({category.courseCount})
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Featured Courses */}
          {courses.some((course) => course.featured) && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Star className="w-8 h-8 text-yellow-500" />
                Featured Courses
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses
                  .filter((course) => course.featured)
                  .slice(0, 3)
                  .map((course, index) => (
                    <motion.div
                      key={course._id}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.1 * index }}
                    >
                      <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-2 border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-500 overflow-hidden h-full group hover:scale-[1.02] hover:-translate-y-2">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={
                              course.thumbnail
                                ? urlFor(course.thumbnail).width(400).height(200).url()
                                : "/placeholder.svg?height=200&width=400"
                            }
                            alt={course.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-yellow-500 text-black font-semibold">Featured</Badge>
                          </div>
                          <div className="absolute top-4 right-4">
                            <Badge className="bg-black/70 text-white border-yellow-500/30">
                              {course.level || "All Levels"}
                            </Badge>
                          </div>
                        </div>

                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="outline" className="border-yellow-500/30 text-yellow-400">
                              {course.type || "Course"}
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                              <span className="text-sm text-gray-300">{course.rating || 4.8}</span>
                            </div>
                          </div>
                          <CardTitle className="text-xl font-bold text-black group-hover:text-yellow-400 transition-colors duration-300">
                            {course.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 line-clamp-2">{course.description}</CardDescription>
                        </CardHeader>

                        <CardContent>
                          <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span>{course.duration || "Self-paced"}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              <span>{course.studentsEnrolled || 0} students</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="text-2xl font-bold text-yellow-500">{course.price === 0 ? "Free" : formatPrice(course.price)}</div>
                            <Link href={`/course/${course.slug.current}`}>
                              <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold">
                                View Course
                                <ChevronRight className="w-4 h-4 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
              </div>
            </motion.section>
          )}

          {/* All Courses */}
          <motion.section variants={staggerContainer} initial="initial" animate="animate" className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8">
              {selectedCategory === "all"
                ? "All Courses"
                : `${categories.find((cat) => cat.slug.current === selectedCategory)?.title} Courses`}
              <span className="text-gray-400 text-lg ml-2">({filteredCourses.length})</span>
            </h2>

            {filteredCourses.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-400 mb-2">No courses found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <motion.div key={course._id} variants={fadeInUp}>
                    <Card className="bg-gradient-to-br from-gray-600 to-gray-900 border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-500 overflow-hidden h-full group hover:scale-[1.02] hover:-translate-y-2">
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={
                            course.thumbnail
                              ? urlFor(course.thumbnail).width(400).height(200).url()
                              : "/placeholder.svg?height=200&width=400"
                          }
                          alt={course.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-black/70 text-white border-gray-500/30">
                            {course.level || "All Levels"}
                          </Badge>
                        </div>
                      </div>

                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="border-gray-700 text-gray-400">
                            {(course.type ? course.type.charAt(0).toUpperCase() + course.type.slice(1) : "Event")}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                            <span className="text-sm text-gray-300">{course.rating || 4.8}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                          {course.title}
                        </CardTitle>
                        <CardDescription className="text-gray-400 line-clamp-2">{course.description}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between mb-4 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{course.duration || "Self-paced"}</span>
                          </div>
                          {/* <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" />
                            <span>{course.studentsEnrolled || 0} students</span>
                          </div> */}
                        </div>

                        <div className="flex items-center justify-between">
                         <div className="text-2xl font-bold text-yellow-500"> {course.price === 0 ? "Free" : formatPrice(course.price)}</div>
                          <Link href={`/course/${course.slug.current}`}>
                            <Button
                              variant="outline"
                              className="border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/10 hover:border-yellow-500/50"
                            >
                              View Course
                              <ChevronRight className="w-4 h-4 ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.section>

          {/* Newsletter CTA */}
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <div className="bg-gray-900 rounded-3xl border border-gray-800/50 p-8 lg:p-12">
              <h3 className="text-3xl font-bold text-white mb-4">Ready to Start Learning?</h3>
              <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of entrepreneurs who have transformed their businesses with our courses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                />
                <button className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap">
                  Get Updates
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
      <Footer />
    </div>
  )
}
