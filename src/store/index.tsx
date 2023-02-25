import { configureStore } from '@reduxjs/toolkit';
import {productsSlice} from "./productsSlide";
import {cartSlice} from "./cartSlice";
import { apiSlice } from './apiSlice';

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
