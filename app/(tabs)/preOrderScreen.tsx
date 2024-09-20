import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable'
import * as Progress from 'react-native-progress' 
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp= NativeStackNavigationProp<any>

const preOrderScreen = () => {
    const navigation = useNavigation<NavigationProp>()
    useEffect(() => {
        setTimeout(()=>{
            navigation.navigate('Delivery')
    }, 4000)
    }, [])
  return (
    <SafeAreaView className='bg-[#00ccbb] flex-1 justify-center items-center'>
        <Animatable.Image
            source={require('../../assets/gif/deliver_files/pharmacy128-128.gif')}
            animation='slideInUp'
            iterationCount={1}
            className='h-96 w-96'
        />
        <Animatable.Text
            animation='slideInUp'
            iterationCount={1}
            className='text-lg text-white font-bold text-center'
        > Waiting for Restaurant to accept your order</Animatable.Text>

        <Progress.Circle size={60} indeterminate={true} color='white'/>

    </SafeAreaView>
  )
}

export default preOrderScreen