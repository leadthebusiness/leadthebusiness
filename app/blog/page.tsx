"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, ArrowRight, BookOpen, TrendingUp, Loader2 } from "lucide-react"
import { client, urlFor, type BlogPost } from "@/lib/sanity"
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

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchBlogPosts = async (): Promise<BlogPost[]> => {
    const query = `*[_type == "blogPost"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      categories[]->{
        title,
        slug
      }
    }`

    return await client.fetch(query)
  }

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true)
        setError(null)
        const blogPosts = await fetchBlogPosts()
        setPosts(blogPosts)
      } catch (err) {
        setError("Failed to load blog posts. Please try again later.")
        console.error("Error fetching blog posts:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPosts()
  }, [])

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">

      <Navigation />
      {/* Background Elements */}
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
              <span className="text-yellow-400 text-sm font-medium">INSIGHTS & KNOWLEDGE</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Our </span>
              <span className="text-yellow-500 relative">
                Blog
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-yellow-500 to-transparent rounded-full" />
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Stay updated with the latest insights, tutorials, and industry trends from the world of business and
              entrepreneurship.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12">
              <div className="flex items-center gap-3 bg-gray-900/50 rounded-2xl px-6 py-3 border border-gray-800">
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                <span className="text-gray-300 font-medium">Latest Insights</span>
              </div>
              <div className="flex items-center gap-3 bg-gray-900/50 rounded-2xl px-6 py-3 border border-gray-800">
                <TrendingUp className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-300 font-medium">Business Trends</span>
              </div>
            </div>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/30">
                  <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Loading Blog Posts</h3>
                <p className="text-gray-400 text-lg">Please wait while we fetch the latest content...</p>
              </div>
            </motion.div>
          )}

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-red-500/30">
                  <BookOpen className="w-12 h-12 text-red-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Error Loading Posts</h3>
                <p className="text-gray-400 text-lg mb-8">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 group"
                >
                  Try Again
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          {!loading && !error && posts.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center py-20"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-yellow-500/30">
                  <BookOpen className="w-12 h-12 text-yellow-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">No Blog Posts Yet</h3>
                <p className="text-gray-400 text-lg mb-8">
                  We're working on bringing you amazing content. Check back soon!
                </p>
                <Link
                  href="/studio-login"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-full transition-all duration-300 group"
                >
                  Go to Studio
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </motion.div>
          )}

          {!loading && !error && posts.length > 0 && (
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {posts.map((post, index) => (
                <motion.div key={post._id} variants={fadeInUp} className="group">
                  <Link href={`/blog/${post.slug.current}`}>
                    <Card className="bg-gradient-to-br from-gray-600 to-gray-900 border border-gray-800/50 hover:border-yellow-500/40 transition-all duration-700 overflow-hidden h-full group-hover:scale-[1.02] group-hover:-translate-y-3 shadow-2xl hover:shadow-yellow-500/10 backdrop-blur-sm">
                      {/* Image Container with Overlay */}
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-20" />
                        <Image
                          src={
                            post.mainImage
                              ? urlFor(post.mainImage).width(500).height(300).url()
                              : "/placeholder.svg?height=300&width=500"
                          }
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Floating Category Badge */}
                        <div className="absolute top-4 left-4 z-30">
                          {post.categories?.[0] && (
                            <Badge className="bg-yellow-500/90 text-black border-0 hover:bg-yellow-400 transition-colors duration-300 font-semibold backdrop-blur-sm">
                              {post.categories[0].title}
                            </Badge>
                          )}
                        </div>

                        {/* Reading Time & Date */}
                        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
                          <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 py-1 border border-yellow-500/30">
                            <div className="flex items-center gap-2 text-yellow-400">
                              <Calendar className="w-3 h-3" />
                              <span className="text-xs font-medium">
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <CardContent className="p-6 relative">
                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300 leading-tight">
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                          {post.excerpt ||
                            "Discover insights and strategies that will transform your business approach and accelerate your entrepreneurial journey."}
                        </p>

                        {/* Author & Meta Info */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-800/50">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                              <span className="text-black font-bold text-xs">LTB</span>
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">Lead The Business</p>
                              <p className="text-gray-500 text-xs">
                                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </p>
                            </div>
                          </div>

                          {/* Read More Indicator */}
                          <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 rounded-full flex items-center justify-center border border-yellow-500/30 group-hover:border-yellow-500/60 group-hover:bg-yellow-500/30 transition-all duration-300">
                              <ArrowRight className="w-4 h-4 text-yellow-500" />
                            </div>
                          </div>
                        </div>

                        {/* Additional Categories */}
                        {post.categories && post.categories.length > 1 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.categories.slice(1, 3).map((category) => (
                              <Badge
                                key={category.slug.current}
                                variant="outline"
                                className="bg-transparent text-gray-400 border-gray-700 hover:border-yellow-500/50 hover:text-yellow-400 transition-colors duration-300 text-xs"
                              >
                                {category.title}
                              </Badge>
                            ))}
                          </div>
                        )}

                        {/* Decorative Elements */}
                        <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-yellow-500/5 to-transparent rounded-full blur-xl" />
                        <div className="absolute bottom-2 left-2 w-16 h-16 bg-gradient-to-br from-yellow-600/5 to-transparent rounded-full blur-xl" />
                      </CardContent>

                      {/* Hover Glow Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-yellow-600/5 rounded-lg" />
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Bottom CTA Section */}
          {/* {!loading && !error && posts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-center mt-20"
            >
              <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-3xl border border-gray-800/50 p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-white mb-4">Stay Updated</h3>
                <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                  Get the latest insights and business strategies delivered straight to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 transition-colors duration-300"
                  />
                  <button className="w-full sm:w-auto bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </motion.div>
          )} */}
        </div>
      </div>

      <Footer />
    </div>
  )
}
