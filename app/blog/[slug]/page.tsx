"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, ArrowLeft, Share2, BookOpen, Eye, ChevronRight, User, Tag } from "lucide-react"
import { client, urlFor, type BlogPost } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -40 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
}

// Custom components for PortableText
const portableTextComponents = {
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 mt-12 leading-tight">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 mt-10 leading-tight">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl lg:text-2xl font-bold text-white mb-4 mt-8 leading-tight">{children}</h4>
    ),
    normal: ({ children }: any) => <p className="text-gray-300 text-lg leading-relaxed mb-6">{children}</p>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-yellow-500 pl-6 py-4 my-8 bg-gray-900/30 rounded-r-lg">
        <div className="text-xl text-gray-200 italic leading-relaxed">{children}</div>
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => <ul className="list-none space-y-3 mb-6 ml-4">{children}</ul>,
    number: ({ children }: any) => <ol className="list-none space-y-3 mb-6 ml-4">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="flex items-start gap-3">
        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-3 flex-shrink-0" />
        <div className="text-gray-300 text-lg leading-relaxed">{children}</div>
      </li>
    ),
    number: ({ children }: any) => (
      <li className="flex items-start gap-3">
        <div className="w-6 h-6 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold mt-1 flex-shrink-0">
          •
        </div>
        <div className="text-gray-300 text-lg leading-relaxed">{children}</div>
      </li>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
    em: ({ children }: any) => <em className="italic text-yellow-400">{children}</em>,
    link: ({ children, value }: any) => (
      <a
        href={value.href}
        className="text-yellow-500 hover:text-yellow-400 underline decoration-yellow-500/50 hover:decoration-yellow-400 transition-colors duration-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  types: {
    image: ({ value }: any) => (
      <div className="my-12">
        <div className="relative rounded-2xl overflow-hidden border border-gray-800/50">
          <Image
            src={urlFor(value).width(800).height(500).url() || "/placeholder.svg"}
            alt={value.alt || "Blog image"}
            width={800}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
        {value.caption && <p className="text-center text-gray-400 text-sm mt-4 italic">{value.caption}</p>}
      </div>
    ),
  },
}

interface BlogPageProps {
  params: Promise<{ slug: string }>
}

export default function BlogPage({ params }: BlogPageProps) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [slug, setSlug] = useState<string>("")

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params
      setSlug(resolvedParams.slug)
    }
    getSlug()
  }, [params])

  const fetchBlogPost = async (postSlug: string) => {
    const query = `*[_type == "blogPost" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      content,
      categories[]->{
        title,
        slug
      }
    }`

    return await client.fetch(query, { slug: postSlug })
  }

  const fetchRelatedPosts = async (postId: string, categories: any[]) => {
    if (!categories || categories.length === 0) return []

    const categoryIds = categories.map((cat) => cat._ref || cat._id).filter(Boolean)

    const query = `*[_type == "blogPost" && _id != $postId && count(categories[@._ref in $categoryIds]) > 0] | order(publishedAt desc)[0...3] {
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

    return await client.fetch(query, { postId, categoryIds })
  }

  useEffect(() => {
    if (!slug) return

    const loadPost = async () => {
      try {
        setLoading(true)
        setError(null)

        const blogPost = await fetchBlogPost(slug)

        if (!blogPost) {
          notFound()
          return
        }

        setPost(blogPost)

        // Fetch related posts
        const related = await fetchRelatedPosts(blogPost._id, blogPost.categories || [])
        setRelatedPosts(related)
      } catch (err) {
        setError("Failed to load blog post. Please try again later.")
        console.error("Error fetching blog post:", err)
      } finally {
        setLoading(false)
      }
    }

    loadPost()
  }, [slug])

  const calculateReadingTime = (content: any) => {
    if (!content) return 5
    const text = JSON.stringify(content)
    const wordsPerMinute = 200
    const wordCount = text.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || "Check out this article from Lead The Business",
          url: window.location.href,
        })
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href)
      // You could add a toast notification here
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-spin mb-4 mx-auto flex items-center justify-center">
            <BookOpen className="w-8 h-8 text-black" />
          </div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">{error || "The article you're looking for doesn't exist."}</p>
          <Link href="/blog">
            <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-yellow-600/5 rounded-full blur-3xl" />
      </div>

      {/* Navigation */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 pt-24 pb-8">
        <div className="container mx-auto px-4">
          <Link href="/blog">
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/10 transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* Article Header */}
      <motion.section variants={fadeInUp} initial="initial" animate="animate" className="relative z-10 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.categories?.map((category) => (
                <Badge
                  key={category.slug.current}
                  className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 hover:bg-yellow-500/30 transition-colors duration-300"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {category.title}
                </Badge>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">{post.title}</h1>

            {/* Excerpt */}
            {post.excerpt && <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-3xl">{post.excerpt}</p>}

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="text-white font-semibold">Lead The Business</p>
                  <p className="text-gray-400 text-sm">Business Insights</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(post.publishedAt)}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{calculateReadingTime(post.content)} min read</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400">
                <Eye className="w-4 h-4" />
                <span className="text-sm">{Math.floor(Math.random() * 1000) + 100} views</span>
              </div>

              <Button
                onClick={handleShare}
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:text-yellow-500 hover:bg-yellow-500/10 transition-colors duration-300"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Featured Image */}
      {post.mainImage && (
        <motion.section variants={fadeInUp} initial="initial" animate="animate" className="relative z-10 mb-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden border border-gray-800/50 shadow-2xl">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(600).url() || "/placeholder.svg"}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Article Content */}
      <motion.section variants={fadeInUp} initial="initial" animate="animate" className="relative z-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              {post.content && <PortableText value={post.content} components={portableTextComponents} />}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="relative z-10 py-20 bg-gradient-to-b from-gray-950/50 to-black"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-12 text-center">Related Articles</h2>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost, index) => (
                  <motion.div
                    key={relatedPost._id}
                    variants={fadeInLeft}
                    initial="initial"
                    animate="animate"
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${relatedPost.slug.current}`}>
                      <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-800/50 hover:border-yellow-500/30 transition-all duration-500 overflow-hidden h-full group hover:scale-[1.02] hover:-translate-y-2">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={
                              relatedPost.mainImage
                                ? urlFor(relatedPost.mainImage).width(400).height(200).url()
                                : "/placeholder.svg?height=200&width=400"
                            }
                            alt={relatedPost.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>

                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-yellow-400 transition-colors duration-300">
                            {relatedPost.title}
                          </h3>
                          <p className="text-gray-400 text-sm line-clamp-2 mb-4">{relatedPost.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-xs">{formatDate(relatedPost.publishedAt)}</span>
                            <ChevronRight className="w-4 h-4 text-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Newsletter CTA */}
      <motion.section variants={fadeInUp} initial="initial" animate="animate" className="relative z-10 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
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
          </div>
        </div>
      </motion.section>
    </div>
  )
}
