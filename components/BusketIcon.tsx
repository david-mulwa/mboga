import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '@/features/basketSlice';
import { useRouter } from 'expo-router';
import CurrencyFormat from 'react-currency-format';
import {  useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type NavigationProp = NativeStackNavigationProp<any>

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation =useNavigation<NavigationProp>()

  if (items.length === 0) return null; // Hide basket icon if no items are in the basket

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket", )} // 
        className="bg-[#00ccbb] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01A296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <CurrencyFormat
            value={basketTotal}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'KSH'}
            renderText={value => <>{value}</>}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
