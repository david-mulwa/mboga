import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import '../global.css';
import ResturantCard from './ResturantCard';
import client from '@/sanity';

// Define a type for Restaurant
type Restaurant = {
  _id: string;
  name: string;
  image: string;
  rating: number;
  type: {
    name: string;
  };
  address: string;
  short_description: string;
  dishes: any; // Define this more strictly if needed
  long: number;
  lat: number;
};

// Define a type for props
type FeatureProps = {
  id: string;
  title: string;
  description: string;
};

const FeaturedRow = ({ id, title, description }: FeatureProps) => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true); // Loading state to handle async data

  useEffect(() => {
    client
      .fetch(
        `*[_type == "featured" && _id == $id]{
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type->{
              name
            }
          },
        }[0]`,
        { id }
      )
      .then((data) => {
        if (data?.restaurants) {
          setRestaurants(data.restaurants); // Ensure restaurants exists before setting
        } else {
          console.warn('No restaurants found for this feature.');
        }
      })
      .catch((error) => {
        console.error('Error fetching restaurants:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request completes
      });
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color={'#00CC88'} />
      </View>
      <Text className="text-sm px-4 text-gray-500">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {restaurants && restaurants.length > 0 ? (
          restaurants.map((restaurant) => (
            <ResturantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image} // Ensure the image URL is correctly handled
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={restaurant.long}
              lat={restaurant.lat}
            />
          ))
        ) : (
          <Text>No restaurants available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
