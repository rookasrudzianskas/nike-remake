import { configureStore } from '@reduxjs/toolkit';
import {productsSlice} from "./productsSlide";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
  },
});
