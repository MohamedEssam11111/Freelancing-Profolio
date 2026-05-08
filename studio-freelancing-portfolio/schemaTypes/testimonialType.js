export default {
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',

  fields: [
    {
      name: 'name',
      title: 'Client Name',
      type: 'string',
    },

    {
      name: 'feedback',
      title: 'Feedback',
      type: 'text',
    },

    {
      name: 'image',
      title: 'Client Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    {
      name: 'portfolioPreview',
      title: 'Portfolio Preview Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
