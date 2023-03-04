import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'http://localhost:3000/';
// const baseUrl = 'https://rookas-custom-nike-app-backend.onrender.com/';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => 'products',
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    // Orders
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: 'orders',
        method: 'POST',
        body: newOrder,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: (data) => ({
        url: 'payments/intents',
        method: 'POST',
        body: data,
      })
    }),
    getOrder: builder.query({
      query: (ref) => `orders/${ref}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery, useCreateOrderMutation, useGetOrderQuery, useCreatePaymentIntentMutation } = apiSlice;
