import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '@/store'

// Define a type for the items in the basket
interface BasketItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

// Define a type for the slice state
interface BasketState {
  items: BasketItem[];
}

// Define the initial state using that type
const initialState: BasketState = {
  items: [],
};

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItem>) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action: PayloadAction<{ id: string }>) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        alert(
          `Can't remove product (id: ${action.payload.id}) as it's not in the basket!`
        );
      }

      state.items = newBasket;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      // Example reducer for incrementing, if needed
      // state.items += action.payload;
    },
  },
});

export const { addToBasket, removeFromBasket, incrementByAmount } = basketSlice.actions;

// Selectors
export const selectBasketItems = (state: RootState) => state.basket.items;

export const selectBasketItemsWithId = (state: RootState, id: string) =>
  state.basket.items.filter(item => item.id === id);


export const selectBasketTotal=(state: RootState)=> state.basket.items.reduce((total, item)=> total += item.price, 0)

export default basketSlice.reducer;
