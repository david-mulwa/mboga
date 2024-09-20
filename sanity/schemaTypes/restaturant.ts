import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'resturant',
  title: 'Resturant',
  type: 'document',
  fields: [
    {
      name: "name",
      type: 'string',
      title:'Resturant Name',
      validation: (Rule) => Rule.required(),

    },
    {
      name: 'short_description',
      type: 'string',
      title: 'short description',
      validation : (Rule) => Rule.max(200),
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Resturant',
    },
    {
      name: 'lat',
      type: 'number',
      title: 'Latitude of the Resturant',
    },
    {
      name: 'long',
      type: 'number',
      title: 'Longitude of the Resturant',
    },
    {
      name: 'address',
      type: 'string',
      title: 'Address of the Resturant',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'rating',
      type: 'number',
      title: 'Enter a Rating from (1-5 Stars)',
      validation: (Rule) => Rule.required().min(1).max(5).error('Please enter a value between 1 and 5'),
    },
    {
      name: 'type',
      type: 'reference',
      title: 'Category',
      
      to: [{type: 'category'}]
    },
    {
      name: 'dishes',
      type: 'array',
      title: 'Dishes',
      of: [{type: 'reference', to: [{type: 'dish'}]}]
    }
  ]

  
})
