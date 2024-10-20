export default {
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'description',
      title: 'Description',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'subcategory',
      title: 'Sub Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'subcategory' } }],
    },
    {
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'easy' },
          { title: 'Moderate', value: 'moderate' },
          { title: 'Challenging', value: 'challenging' },
        ],
      },
    },
    {
      name: 'duration',
      title: 'Duration',
      type: 'string',
      options: {
        list: [
          { title: 'Quick (5-10 mins)', value: 'quick' },
          { title: 'Medium (15-30 mins)', value: 'medium' },
          { title: 'Long (30+ mins)', value: 'long' },
        ],
      },
    },
    {
      name: 'spaceRequired',
      title: 'Space Required',
      type: 'string',
      options: {
        list: [
          { title: 'Small Space', value: 'small' },
          { title: 'Large Space', value: 'large' },
          { title: 'Outdoor', value: 'outdoor' },
        ],
      },
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
    {
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
};
