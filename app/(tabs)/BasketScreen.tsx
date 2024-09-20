import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useMemo, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '@/features/resturantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '@/features/basketSlice'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '@/sanity'
import CurrencyFormat from 'react-currency-format'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp= NativeStackNavigationProp<any>


const BasketScreen = () => {
    const navigation = useNavigation<NavigationProp>()
    const restaurant = useSelector(selectRestaurant)
    const items = useSelector(selectBasketItems)
    const basketTotal = useSelector(selectBasketTotal)
    const [groupedItemsBasket, setGroupedItemBasket] =useState<{[key:string ]:any[]}>({})
    const dispatch = useDispatch()

    useMemo(() =>{

        const groupedItems= items.reduce((results: any, item: any)=>{
            (results[item.id] = results[item.id] || []).push(item)
            return results
        }, {})

        setGroupedItemBasket(groupedItems)
    },
   
    [items])
  return (
    
    <SafeAreaView className='flex-1 bg-white'>
      <View className='flex-1 bg-gray-100'>
        <View className='p-5 border-b border-[#00ccbb] shadow-sm'>
          <View>
            <Text className='text-lg font-bold text-center'>Basket</Text>
            <Text className='text-center text-gray-400'>{restaurant?.title}</Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className='rounded-full bg-gray-100 absolute top-3 right-5'
          >
            <XCircleIcon color ='#00ccbb' height={50} width={50}/>
          </TouchableOpacity>
        </View>
        <View className='flex-row items-center space-x-4 px-3 py-4 bg-white my-5 '>
          <Image

          source={{uri: 'https://example.com/default-image.png'}}
          className='h-7 w-7 bg-gray-300 p-4 '
          
          />
          <Text className='flex-1 '>Delivery in 8 -10 minutes</Text>
          <TouchableOpacity>
            <Text className='text-[#00ccbb]'>Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className='divide-y divide-gray-200'>
          {Object.entries(groupedItemsBasket).map(([key, items])=>(
            <View key={key}
              className='flex-row items-center space-x-3 bg-white py-2 px-5 ]'
            >
              <Text>{items.length } x</Text>
              <Image 
              source={{uri: urlFor(items[0]?.image).url()}}
              className='h-12 w-12 rounded-full'
              />
              <Text className='flex-1'>{items[0]?.name}</Text>
              <Text className='text-gray-600'>
                <CurrencyFormat 
                  value={items[0]?.price} 
                  thousandSeparator={true}
                  prefix='KSH'

                />
              </Text>
              <TouchableOpacity
              onPress={()=>dispatch(removeFromBasket({id:key}))}>
                <Text className='text-[#00ccbb] text-xs '>
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className='p-5 bg-white mt-5 space-y-4 '>
          <View className='flex-row justify-between'>
            <Text className='text-gray-500'> total</Text>
            <Text className='text-gray-500'>
              <CurrencyFormat value={basketTotal} thousandSeparator={true} prefix='KSH'/> 
            </Text>
          </View>
          <TouchableOpacity
          onPress={()=> navigation.navigate('PreOrder')}
            className='rounded-lg bg-[#00ccbb] p-4 '
          >
            <Text className='text-center'>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen