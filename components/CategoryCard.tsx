import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '@/sanity'

type Props = {
    imgUrl: string
    title: string
}
const CategoryCard = ({ imgUrl, title }: Props) => {
  return (
    <TouchableOpacity style={{ marginRight: 12, position: 'relative' }}>
      <Image
        source={{
          uri: urlFor(imgUrl).url() || 'https://links.papareact.com/gn7',
        }}
        style={{ height: 80, width: 80, borderRadius: 10 }}
      />
      <Text style={{
        position: 'absolute',
        bottom: 5,
        left: 5,
        color: 'white',
        fontWeight: 'bold'
      }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

export default CategoryCard
