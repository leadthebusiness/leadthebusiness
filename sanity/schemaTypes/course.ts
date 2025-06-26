import { defineField, defineType } from "sanity"

export default defineType({
  name: "course",
  title: "Course",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Course Thumbnail",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
    defineField({
      name: "price",
      title: "Price (₹)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "duration",
      title: "Duration/Start Date",
      type: "string",
      placeholder: "e.g., 12 hours, 8 weeks, Starts on 26-06-25 etc.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Difficulty Level",
      type: "string",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "categories",
    //   title: "Categories",
    //   type: "array",
    //   of: [{ type: "reference", to: { type: "category" } }],
    // }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "featured",
      title: "Featured Course",
      type: "boolean",
      description: "Mark this course as featured to highlight it",
      initialValue: false,
    }),
    defineField({
      name: "content",
      title: "Course Content",
      type: "blockContent",
    }),
    defineField({
      name: "modules",
      title: "Course Modules",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "title",
              title: "Module Title",
              type: "string",
            },
            {
              name: "duration",
              title: "Duration",
              type: "string",
            },
            {
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "duration",
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "thumbnail",
      price: "price",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { price, publishedAt } = selection
      return {
        ...selection,
        subtitle: `$${price} • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : "Draft"}`,
      }
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Price, Low to High",
      name: "priceAsc",
      by: [{ field: "price", direction: "asc" }],
    },
  ],
})
