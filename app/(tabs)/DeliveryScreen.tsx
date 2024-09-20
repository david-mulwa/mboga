import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '@/features/resturantSlice'
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack/types'
import { XMarkIcon } from 'react-native-heroicons/outline'
import * as Progress from 'react-native-progress' 

type NavigationProp = NativeStackNavigationProp<any>;

const DeliveryScreen = () => {
    const navigation =useNavigation<NavigationProp>()
    const restaurant =useSelector(selectRestaurant)
  return (
    <View>
        <SafeAreaView>
            <View className='flex-row justify-between items-center'>
                <TouchableOpacity  onPress={()=> navigation.navigate('Index')}>
                    <XMarkIcon color='white' size={30}/>
                </TouchableOpacity>
                <Text className='font-light text-white text-lg'>Order Help</Text>
            </View>

            <View className='bg-white mx-5 my-2 rounded-md p-6 shadow-md '>
                <View className=' flex-row justify-between'>
                    <View>
                        <Text className='text-lg text-gray-400 '>            Estimated Arrival
                        </Text>
                        <Text className='text-4xl font-bold '>
                            45-55 Minutes
                        </Text>
                    </View>
                    <Image 
                        source={{
                            uri: 'http://links.papareact.com/fls',
                        }}
                        className='h-20 w-20'
                    />
                </View>  
                <Progress.Bar   color='#00ccbb' indeterminate={true}/> 
                <Text className='mt-3 text-gray-500'>
                    Your order at {restaurant?.title} is being prepared
                </Text>
            </View>

        </SafeAreaView>

    </View>
  )
}

export default DeliveryScreen