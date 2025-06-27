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
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Course", value: "course" },
          { title: "Event", value: "event" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
      initialValue: "course",
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
      description: "Mark this course as featured to highlight it and show it prominently on the homepage.",
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
      type: "type",
    },
    prepare(selection) {
      const { price, publishedAt, type } = selection
      const typeLabel = type === "event" ? "Event" : "Course"
      return {
        ...selection,
        subtitle: `${typeLabel} • ₹${price} • ${publishedAt ? new Date(publishedAt).toLocaleDateString() : "Draft"}`,
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
    {
      title: "Type",
      name: "typeAsc",
      by: [{ field: "type", direction: "asc" }],
    },
  ],
})