import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import basketReducer from '@/features/basketSlice'
import restaurantReducer from './features/resturantSlice'
import restaturant from './sanity/schemaTypes/restaturant'

const rootReducer = combineReducers({
  basket: basketReducer,
  restaurant: restaurantReducer
  // Add other reducers here
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
