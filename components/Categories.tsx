import { View, Text,ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import CategoryCard from './CategoryCard'
import client from '@/sanity'

type categories ={
  _id: string
  name: string
  image: string
}

const Categories = () => {
  const [categories, setCategories] = useState<categories[]>([])
  useEffect(() => {
    client.fetch('*[_type == "category"]').then((data) => setCategories(data)).catch((err) => console.log(err))
  
  }, [])
  return (
    <ScrollView
    contentContainerStyle={{ 
        paddingHorizontal: 15, 
        paddingTop:10
         }}
    horizontal
    showsHorizontalScrollIndicator={false}
    className=''

    >

      {categories.map((category) => (
        <CategoryCard key={category._id} imgUrl={category.image} title={category.name} />
      ))}
        

    </ScrollView>
  )
}

export default Categories