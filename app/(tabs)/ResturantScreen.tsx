import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { ArrowLeftIcon, ChevronRightIcon, MapIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid';
import DishRow from '@/components/DishRow';
import { RootStackParamList } from '@/typeSafety'; // Adjust the path as necessary
import { urlFor } from '@/sanity';
import BusketIcon from '@/components/BusketIcon';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '@/features/resturantSlice';

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  // Use RouteProp to type the route
  const route = useRoute<RouteProp<RootStackParamList, 'resturantscreen'>>();
  const {
    id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes = [],  // Default to empty array if dishes is undefined
    long,
    lat
  } = route.params;


  useEffect(() => {
    dispatch(setRestaurant({
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
      
    }));
  }, [dispatch, id, imgUrl, title, rating, genre, address, short_description, dishes, long, lat,]); // Add all variables used in the effect as dependencies


  return (

    <>
      <BusketIcon/>
      <ScrollView>
        <View className='relative'>
          <Image
            source={{ uri: urlFor(imgUrl).url() || 'https://example.com/default-image.png' }} // Fallback image URL
            className="w-full h-60 bg-gray-300 "
          />
          <TouchableOpacity
            className="absolute  left-5 p-2 bg-gray-100 rounded-full"
            onPress={() => navigation.goBack()}
          >
            <ArrowLeftIcon size={20} color="#00CC88" />
          </TouchableOpacity>
        </View>
        <View className='bg-white'>
          <View className='px-4 pt-4'>
            <Text className='text-3xl font-bold'>{title}</Text>
            <View className='flex-row space-x-2 my-1'>
              <View className='flex-row items-center space-x-1'>
                <StarIcon color={'#00CC88'} opacity={0.5} size={22} />
                <Text className='text-xs text-gray-500'>
                  <Text className='text-green-500'>{rating}</Text> . {genre}
                </Text>
              </View>
              <View className='flex-row items-center space-x-1'>
                <MapIcon color="gray" opacity={0.5} size={22} />
                <Text className='text-xs text-gray-500'>
                  Nearby . {address}
                </Text>
              </View>
            </View>
            <Text className='text-gray-500 mt-2 pb-4'>{short_description}</Text>
          </View>
          <TouchableOpacity
            className='flex-row items-center space-x-2 p-4 border-y border-gray-300'
          >
            <QuestionMarkCircleIcon color="gray" opacity={0.6} size={25} />
            <Text className='pl-2 flex-1 text-md font-bold'> Have a food allergy</Text>
            <ChevronRightIcon color="#00CC88" />
          </TouchableOpacity>
        </View>
        <View className='pb-36'>
          <Text className='px-4 pt-6 mb-3 font-bold text-xl'>Menu</Text>
          {/* dish card */}
          {dishes.map((dish) => (
            <DishRow
              key={dish._id}
              id={dish._id}
              name={dish.name}
              description={dish.description}
              price={dish.price}
              image={dish.image}
            />
          ))}
        </View>
      </ScrollView>

    </>
  );
};

export default RestaurantScreen;
