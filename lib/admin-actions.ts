"use server"

import { client } from "@/lib/sanity"

export async function createBlogPost(formData: FormData) {
  const title = formData.get("title") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const category = formData.get("category") as string
  const author = formData.get("author") as string

  try {
    const result = await client.create({
      _type: "blogPost",
      title,
      slug: {
        current: title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      },
      excerpt,
      content: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: content,
            },
          ],
        },
      ],
      publishedAt: new Date().toISOString(),
      // You'll need to create author and category references
    })

    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: "Failed to create blog post" }
  }
}

export async function createCourse(formData: FormData) {
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const price = Number(formData.get("price"))
  const duration = formData.get("duration") as string
  const level = formData.get("level") as string
  const instructor = formData.get("instructor") as string

  try {
    const result = await client.create({
      _type: "course",
      title,
      slug: {
        current: title
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^\w-]+/g, ""),
      },
      description,
      price,
      duration,
      level,
      publishedAt: new Date().toISOString(),
      // You'll need to create instructor references
    })

    return { success: true, data: result }
  } catch (error) {
    return { success: false, error: "Failed to create course" }
  }
}
