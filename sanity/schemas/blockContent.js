export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Text Block',
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Heading 1', value: 'h1' },
        { title: 'Heading 2', value: 'h2' },
        { title: 'Heading 3', value: 'h3' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Code', value: 'code' },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Underline', value: 'underline' },
          { title: 'Strike', value: 'strike-through' },
        ],
        annotations: [
          {
            title: 'URL',
            name: 'link',
            type: 'object',
            fields: [
              {
                title: 'URL',
                name: 'href',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true, // Allow relative URLs
                    scheme: ['http', 'https', 'mailto', 'tel'], // Only allow these schemes
                  }),
              },
              {
                title: 'Open in new tab',
                name: 'blank',
                type: 'boolean',
              },
            ],
          },
          {
            title: 'Internal Link',
            name: 'internalLink',
            type: 'reference',
            to: [{ type: 'article' }], 
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          title: 'Caption',
          name: 'caption',
          type: 'string',
          options: { isHighlighted: true }, // Highlights the caption field in the editor
        },
        {
          title: 'Alternative Text',
          name: 'alt',
          type: 'string',
          options: { isHighlighted: true },
        },
      ],
    },
    {
      title: 'Video Embed',
      name: 'videoEmbed',
      type: 'object',
      fields: [
        {
          title: 'URL',
          name: 'url',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              allowRelative: false,
              scheme: ['http', 'https'],
            }),
        },
      ],
    },
    {
      title: 'Code Block',
      name: 'codeBlock',
      type: 'object',
      fields: [
        {
          title: 'Language',
          name: 'language',
          type: 'string',
        },
        {
          title: 'Code',
          name: 'code',
          type: 'text',
          rows: 10,
        },
      ],
    },
  ],
};
