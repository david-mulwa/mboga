import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import CurrencyFormat from 'react-currency-format'
import { urlFor } from '@/sanity'
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useAppDispatch } from '@/hooks/hooks'
import { useSelector } from 'react-redux'
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '@/features/basketSlice'
import { RootState } from '@/store' 

type DishRowProps = {
  id: string
  name: string
  description: string
  price: number
  image: string
}

const DishRow = ({ id, name, description, price, image }: DishRowProps) => {
  const dispatch = useAppDispatch()
  const items = useSelector((state: RootState) => selectBasketItemsWithId(state, id)) // Typed state
  const [isPressed, setIsPressed] = useState(false)

  const addItemsToBasket = () => {
    dispatch(
      addToBasket({
        id,
        name,
        description,
        price,
        image,
      })
    )
  }

  const removeItemsFromBasket = () => {
    if (!items.length) return
    dispatch(removeFromBasket({ id }))
  }

  return (
    <>
      <TouchableOpacity className={` ${isPressed ? 'border-gray-200' : 'border p-4 bg-white'}`} onPress={() => setIsPressed(!isPressed)}>
        <View className='flex-row'>
          <View className='pr-2 flex-1'>
            <Text className='text-lg mb-1'>{name}</Text>
            <Text className='text-gray-400'>{description}</Text>
            <CurrencyFormat
              value={price}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'KSH '}
              renderText={(formattedValue) => <Text>{formattedValue}</Text>}
            />
          </View>

          <View>
            <Image
              key={id}
              style={{
                borderColor: '#F3F3F4',
                borderWidth: 1,
              }}
              source={{ uri: urlFor(image).url()||'https://example.com/default-image.png' }}
              className='h-20 w-20 bg-gray-300 p-4'
            />
          </View>
        </View>
      </TouchableOpacity>

      {isPressed && (
        <View className='bg-white px-4'>
          <View className='flex-row items-center space-x-2 pb-3'>
            <TouchableOpacity
             disabled={!items.length}
            onPress={removeItemsFromBasket}>
              <MinusCircleIcon size={40} color={items.length > 0 ? '#00CC88' : 'gray'} />
            </TouchableOpacity>
            <Text>{items.length}</Text>

            <TouchableOpacity onPress={addItemsToBasket}>
              <PlusCircleIcon size={40} color='#00CC88' />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  )
}

export default DishRow
