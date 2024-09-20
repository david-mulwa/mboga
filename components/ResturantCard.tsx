import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import '../global.css';
import { StarIcon } from 'react-native-heroicons/solid';
import { MapPinIcon } from 'react-native-heroicons/outline';
import { urlFor } from '@/sanity';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRouter } from 'expo-router';

// Define the type for RestaurantCardProps
type RestaurantCardProps = {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  short_description: string;
  dishes: any[]; // Array of dish objects (adjust the type as per your schema)
  long: number;
  lat: number;
};

// Define the type for navigation
type NavigationProps = NativeStackNavigationProp<any>; // Adjust if you have defined stack params

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
}: RestaurantCardProps) => {
  
  const navigation = useNavigation<NavigationProps>();

  return (
    <TouchableOpacity

      onPress={() => 
        navigation.navigate('Restaurant', {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,        })
      }    
    
      className="shadow-sm"
      style={{
        backgroundColor: 'white',
        marginRight: 7,
      }}
    >
      <Image
        source={{
          uri: urlFor(imgUrl).url() || 'https://links.papareact.com/wru',
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className="flex-row items-center space-x-1">
          <StarIcon color="green" opacity={0.5} size={22} />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500">{rating}</Text> • {genre}
          </Text>
        </View>
        <View className="flex-row items-center space-x-1">
          <MapPinIcon size={22} color="gray" opacity={0.4} />
          <Text className="text-xs text-gray-500">Nearby • {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default RestaurantCard;
