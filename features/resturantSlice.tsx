import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

// Define a type for Restaurant
interface Restaurant {
  id: string;
  imgUrl: string;
  title: string;
  rating: number;
  genre: string;
  address: string;
  short_description: string;
  dishes: {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
  }[];
  long: number;
  lat: number;
}

// Define a type for the slice state
interface BasketState {
  restaurant: Restaurant | null; // Adjust to the new Restaurant type
}

// Define the initial state using that type
const initialState: BasketState = {
  restaurant: null, // Default to null initially
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setRestaurant: (state, action: PayloadAction<Restaurant>) => {
      state.restaurant = action.payload;
    },
    clearRestaurant: (state) => {
      state.restaurant = null;
    },
  },
});

export const { setRestaurant, clearRestaurant } = restaurantSlice.actions;

// Selectors
export const selectRestaurant = (state: RootState) => state.restaurant.restaurant;

export default restaurantSlice.reducer;
