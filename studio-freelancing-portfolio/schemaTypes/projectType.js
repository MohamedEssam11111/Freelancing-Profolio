export default {
  name: 'project',
  title: 'Projects',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },

    {
      name: 'hook',
      title: 'Hook',
      type: 'string',
    },

    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },

    {
      name: 'approach',
      title: 'Approach',
      type: 'text',
    },

    {
      name: 'result',
      title: 'Result',
      type: 'text',
    },

    {
      name: 'cta',
      title: 'CTA Text',
      type: 'string',
    },

    {
      name: 'link',
      title: 'Project Link',
      type: 'url',
    },

    {
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
