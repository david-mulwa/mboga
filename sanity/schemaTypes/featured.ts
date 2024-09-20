import {defineField, defineType} from 'sanity'

export default defineType ({
   name: 'featured',
   title: 'Featured Menu Categories',
   type: 'document', 
   fields: [
    {
      name: 'name',
      type: 'string',
      title:'Featured Category Name',
      validation: (Rule) => Rule.required()
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'short description',
      validation: (Rule) => Rule.max(200).required()
    },
    {
      name: 'restaurants',
      type: 'array',
      title: 'Restaurants',
      of: [{type: 'reference', to: [{type: 'resturant'}]}]
    }
   ]
})