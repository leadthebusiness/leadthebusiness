"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PlusCircle, BookOpen, Video } from "lucide-react"

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    // Simple password check - replace with your preferred method
    if (password === "your-admin-password") {
      setIsAuthenticated(true)
    } else {
      alert("Incorrect password")
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Card className="w-full max-w-md bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-center text-white">Admin Access</CardTitle>
            <CardDescription className="text-center text-gray-300">
              Enter password to access content management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Content Management</h1>
          <Button onClick={() => setIsAuthenticated(false)} variant="outline" className="border-gray-600 text-gray-300">
            Logout
          </Button>
        </div>

        <Tabs defaultValue="blog" className="space-y-6">
          <TabsList className="bg-gray-800 border-gray-700">
            <TabsTrigger value="blog" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Blog Posts
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <Video className="w-4 h-4" />
              Courses
            </TabsTrigger>
          </TabsList>

          <TabsContent value="blog">
            <BlogPostForm />
          </TabsContent>

          <TabsContent value="courses">
            <CourseForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function BlogPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    author: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your Sanity create logic here
    console.log("Creating blog post:", formData)
    alert("Blog post created successfully!")
    setFormData({ title: "", excerpt: "", content: "", category: "", author: "" })
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <PlusCircle className="w-5 h-5" />
          Create New Blog Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="blog-title" className="text-white">
              Title
            </Label>
            <Input
              id="blog-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="blog-excerpt" className="text-white">
              Excerpt
            </Label>
            <Textarea
              id="blog-excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="blog-content" className="text-white">
              Content
            </Label>
            <Textarea
              id="blog-content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              rows={8}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="blog-category" className="text-white">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="web-development">Web Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="business">Business</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="blog-author" className="text-white">
                Author
              </Label>
              <Input
                id="blog-author"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Create Blog Post
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

function CourseForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    level: "",
    instructor: "",
    category: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Add your Sanity create logic here
    console.log("Creating course:", formData)
    alert("Course created successfully!")
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      level: "",
      instructor: "",
      category: "",
    })
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <PlusCircle className="w-5 h-5" />
          Create New Course
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="course-title" className="text-white">
              Course Title
            </Label>
            <Input
              id="course-title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              required
            />
          </div>

          <div>
            <Label htmlFor="course-description" className="text-white">
              Description
            </Label>
            <Textarea
              id="course-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="course-price" className="text-white">
                Price ($)
              </Label>
              <Input
                id="course-price"
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>

            <div>
              <Label htmlFor="course-duration" className="text-white">
                Duration
              </Label>
              <Input
                id="course-duration"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                placeholder="e.g., 12 hours"
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="course-level" className="text-white">
                Level
              </Label>
              <Select value={formData.level} onValueChange={(value) => setFormData({ ...formData, level: value })}>
                <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 border-gray-600">
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="course-instructor" className="text-white">
                Instructor
              </Label>
              <Input
                id="course-instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="course-category" className="text-white">
              Category
            </Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 border-gray-600">
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="business">Business</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Create Course
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
