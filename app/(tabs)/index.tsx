import { View, Text, SafeAreaView, Image, ScrollView, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import '../../global.css';
import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from 'react-native-heroicons/outline';
import Categories from '@/components/Categories';
import FeaturedRow from '@/components/FeaturedRow';
import client from '@/sanity';

// Define a type for the data you expect to receive from Sanity
type Restaurant = {
  _id: string;
  name: string;
  short_description: string;
  dishes: any[]; // Define this properly if needed
};

type FeaturedCategory = {
  _id: string;
  name: string;
  short_description: string;
  restaurants: Restaurant[];
};

const Index = () => {
  const [featuredCategories, setFeaturedCategories] = useState<FeaturedCategory[]>([]); // Use the defined type
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured"]{
          _id,
          name,
          short_description,
          restaurants[]->{
            _id,
            name,
            short_description,
            dishes[]->{
              name,
              price,
              image
            }
          }
        }`
      )
      .then((data) => {
        setFeaturedCategories(data);
        setLoading(false); // Set loading to false once data is fetched
      })
      .catch((error) => {
        console.error('Error fetching featured categories:', error);
        setLoading(false);
      });
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center pb-3 mx-4 space-x-2 mt-12">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 bg-gray-300 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <ChevronDownIcon size={20} color="#00CC88" />
          </Text>
        </View>
        <UserIcon size={35} color="#00CC88" />
      </View>

      {/* Search bar */}
      <View className="flex-row items-center space-x-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-3">
          <MagnifyingGlassIcon size={20} color="gray" />
          <TextInput placeholder="Restaurants and cuisines" keyboardType="default" />
        </View>
        <AdjustmentsHorizontalIcon size={30} color="#00CC88" />
      </View>

      {/* Scrollable content */}
      <ScrollView className="bg-gray-100" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Categories */}
        <Categories />

        {/* Featured rows */}
        {loading ? (
          <Text className="text-center text-lg font-bold">Loading...</Text>
        ) : (
          featuredCategories?.map((category) => (
            <FeaturedRow
              key={category._id}
              id={category._id}
              title={category.name}
              description={category.short_description}
            />
          ))
        )}

        {/* Predefined FeaturedRow examples */}
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
