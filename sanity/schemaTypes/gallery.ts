import { defineField, defineType } from "sanity"

export default defineType({
  name: "gallery",
  title: "Gallery",
  type: "document",
  fields: [
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            metadata: ['blurhash', 'lqip', 'palette']
          }
        }
      ],
      options: {
        layout: "grid"
      },
      validation: (Rule) => Rule.required().min(1).error("Gallery must have at least one image"),
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      media: "images.0",
      imageCount: "images",
      publishedAt: "publishedAt",
    },
    prepare(selection) {
      const { media, imageCount, publishedAt } = selection;
      const count = imageCount ? imageCount.length : 0;
      return {
        title: `Gallery - ${count} image${count !== 1 ? 's' : ''}`,
        subtitle: publishedAt ? new Date(publishedAt).toLocaleDateString() : "Draft",
        media
      };
    }
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedAtAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
})