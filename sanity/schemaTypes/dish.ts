import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'Dish',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title:'Dish Name',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'short description',
      validation: (Rule) => Rule.max(200).required()
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price of the Dish in KSH',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image of the Dish',
    }
  ]
})
