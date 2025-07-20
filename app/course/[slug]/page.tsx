"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Clock,
  Users,
  Star,
  ArrowLeft,
  CheckCircle,
  Award,
  Globe,
  Loader2,
  Target,
  Play,
  Calendar,
} from "lucide-react"
import { client, urlFor } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import Navigation from "@/components/Nav"
import Footer from "@/components/Footer"

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
  content: any
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
  whatYouWillLearn: string[]
  modules: {
    title: string
    lessons: {
      title: string
      duration: string
      preview: boolean
    }[]
  }[]
  featured: boolean
  certificate: boolean
  lifetime: boolean
  language: string
  type: string
}

interface CoursePageProps {
  params: Promise<{ slug: string }>
}

// Custom components for PortableText
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-6 leading-tight">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4 mt-8 leading-tight">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3 mt-6 leading-tight">{children}</h3>
    ),
    normal: ({ children }: any) => <p className="text-gray-300 text-lg leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-yellow-500 pl-4 py-2 my-6 bg-gray-900/30 rounded-r-lg">
        <div className="text-lg text-gray-200 italic leading-relaxed">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-none space-y-2 mb-4 ml-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-none space-y-2 mb-4 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-2">
        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
        <div className="text-gray-300 leading-relaxed">{children}</div>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-yellow-400">{children}</em>,
  },
}

export default function CoursePage({ params }: CoursePageProps) {
  const [course, setCourse] = useState<Course | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState<string>("")
  const [isEnrolling, setIsEnrolling] = useState(false)

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getSlug()
  }, [params])

  const fetchCourse = async (courseSlug: string) => {
    const query = `*[_type == "course" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      content,
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
      whatYouWillLearn,
      modules,
      featured,
      certificate,
      lifetime,
      language,
      type
    }`

    return await client.fetch(query, { slug: courseSlug })
  }

  useEffect(() => {
    if (!slug) return

    const loadCourse = async () => {
      try {
        setLoading(true)
        setError(null)

        const courseData = await fetchCourse(slug)

        if (!courseData) {
          notFound()
          return
        }
        console.log("Fetched course data:", courseData)
        setCourse(courseData)

      } catch (err) {
        setError("Failed to load course. Please try again later.")
        console.error("Error fetching course:", err)
      } finally {
        setLoading(false)
      }
    }

    loadCourse()
  }, [slug])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleEnroll = async () => {
    setIsEnrolling(true)
    // Simulate enrollment process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsEnrolling(false)
    // Here you would typically redirect to payment or show success message
    alert("Enrollment successful! You will be redirected to payment.")
  }

  const calculateDiscount = () => {
    if (!course?.originalPrice || !course?.price) return 0
    return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-spin mb-4 mx-auto flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-black" />
          </div>
          <p className="text-gray-400">Loading course...</p>
        </div>
      </div>
    )
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-8">{error || "The Events you're looking for doesn't exist."}</p>
          <Link href="/course">
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">

      <Navigation />
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-600/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/course">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/10 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Events
            </Button>
          </Link>
        </div>
      </motion.div>

      <div className="relative z-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Course Header */}
            <motion.section variants={fadeInUp} initial="initial" animate="animate" className="mb-8">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                <Link href="/course" className="hover:text-yellow-500 transition-colors">
                  Events
                </Link>
                <span>/</span>
                <Link
                  href={`/course?category=${course.category?.slug.current}`}
                  className="hover:text-yellow-500 transition-colors"
                >
                  {course.category?.title}
                </Link>
                <span>/</span>
                <span className="text-white">{course.title}</span>
              </div>

              {/* Course Image */}
              <div className="relative rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl mb-6">
                <Image
                  src={
                    course.thumbnail
                      ? urlFor(course.thumbnail).width(800).height(400).url()
                      : "/placeholder.svg?height=400&width=800"
                  }
                  alt={course.title}
                  width={800}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <Button size="lg" className="bg-yellow-500/90 hover:bg-yellow-500 text-black font-semibold">
                    <Play className="w-6 h-6 mr-2" />
                    Preview {course.type || "Events"}
                  </Button>
                </div>
              </div>

              {/* Course Title and Meta */}
              <div className="mb-6">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    {course.category?.title}
                  </Badge>
                  {course.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold">
                      Featured
                    </Badge>
                  )}
                  <Badge variant="outline" className="border-gray-700 text-gray-300">
                    {course.level}
                  </Badge>
                  {course.originalPrice && course.originalPrice > course.price && (
                    <Badge className="bg-red-500/20 text-red-400 border border-red-500/30">
                      {calculateDiscount()}% OFF
                    </Badge>
                  )}
                </div>

                <h1 className="text-3xl lg:text-5xl font-bold text-white mb-4 leading-tight">{course.title}</h1>

                <p className="text-lg lg:text-xl text-gray-400 leading-relaxed mb-6">{course.description}</p>

                {/* Course Stats */}
                <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-gray-400 mb-6">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    <span className="font-semibold text-white">{course.rating || 4.8}</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{course.studentsEnrolled || 0} students</span>
                  </div> */}
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration}</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    <span>{course.language || "English"}</span>
                  </div> */}
                </div>
              </div>
            </motion.section>

            {/* Pricing and Enroll Section - Prominent on Mobile */}
            <motion.section
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
              className="mb-12"
            >
              <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border-2 border-yellow-500/30 shadow-2xl">
                <CardContent className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                    {/* Pricing */}
                    <div className="text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-4 mb-2">
                        <div className="text-3xl lg:text-4xl font-bold text-yellow-500">
                          {course.price === 0 ? "Free" : formatPrice(course.price)}
                        </div>
                        {course.originalPrice && course.originalPrice > course.price && (
                          <div className="text-lg lg:text-xl text-gray-500 line-through">
                            {formatPrice(course.originalPrice)}
                          </div>
                        )}
                      </div>
                      
                    </div>

                    {/* Enroll Button - Large and Prominent */}
                    <div className="w-full lg:w-auto">
                      <Button
                        onClick={handleEnroll}
                        disabled={isEnrolling}
                        size="lg"
                        className="w-full lg:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold px-8 lg:px-12 py-4 lg:py-6 text-lg lg:text-xl shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300"
                      >
                        {isEnrolling ? (
                          <div className="flex items-center gap-3">
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Enrolling...
                          </div>
                        ) : (
                          <div className="flex items-center gap-3">
                            <BookOpen className="w-6 h-6" />
                            Enroll Now
                          </div>
                        )}
                      </Button>
                      {/* <div className="text-center text-gray-800 text-sm mt-3">30-day money-back guarantee</div> */}
                    </div>
                  </div>

                  {/* Course Features */}
                  {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-yellow-500/20">
                    {course.lifetime && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Calendar className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Lifetime Access</span>
                      </div>
                    )}
                    {course.certificate && (
                      <div className="flex items-center gap-2 text-gray-300">
                        <Award className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm">Certificate</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-gray-800">
                      <Globe className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Mobile & Desktop</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-800">
                      <BookOpen className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Resources</span>
                    </div>
                  </div> */}
                </CardContent>
              </Card>
            </motion.section>

            {/* What You'll Learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <motion.section
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.3 }}
                className="mb-12"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6 flex items-center gap-3">
                  <Target className="w-6 h-6 text-yellow-500" />
                  What You'll Learn
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-4 bg-gray-900/30 rounded-lg border border-gray-800/50"
                    >
                      <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Course Content */}
            {course.content && (
              <motion.section
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.4 }}
                className="mb-12"
              >
                <h2 className="text-2xl mb-2"> {course.type.charAt(0).toUpperCase() + course.type.slice(1)} Overview</h2>
                <div className="prose prose-lg prose-invert max-w-none bg-gray-900/20 rounded-2xl p-6 lg:p-8 border border-gray-800/50">
                  <PortableText value={course.content} components={portableTextComponents} />
                </div>
              </motion.section>
            )}

            {/* Course Curriculum */}
            {course.modules && course.modules.length > 0 && (
              <motion.section
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.5 }}
                className="mb-12"
              >
                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-6">Events Curriculum</h2>
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <Card key={moduleIndex} className="bg-gray-900/30 border border-gray-800/50">
                      <CardContent className="p-6">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-500 text-black rounded-lg flex items-center justify-center font-bold text-sm">
                            {moduleIndex + 1}
                          </div>
                          {module.title}
                        </h3>
                        <div className="space-y-2">
                          {module.lessons?.map((lesson, lessonIndex) => (
                            <div
                              key={lessonIndex}
                              className="flex items-center justify-between p-3 bg-gray-800/30 rounded-lg"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-300">{lesson.title}</span>
                                {lesson.preview && (
                                  <Badge variant="outline" className="border-yellow-500/30 text-yellow-400 text-xs">
                                    Preview
                                  </Badge>
                                )}
                              </div>
                              <span className="text-gray-500 text-sm">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.section>
            )}

            {/* Final CTA */}

           
          </div>
        </div>
      </div>
            <Footer />
    </div>
  )
}
