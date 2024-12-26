import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../utils/constants';
import { Product, UrlParams } from '../../lib/types';
import { buildUrl } from '../../utils/common';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    getProduct: builder.query<Product, { id: number }>({
      query: ({ id }) => `/products/${id}`,
      transformResponse: (response: Product) => {
        return {
          ...response,
          images: response.images.map((item: string) => item.replace(/[\[\]\"]/g, '')),
        };
      },
      providesTags: ['Product'],
    }),
    searchProducts: builder.query<Product[], { query: UrlParams }>({
      query: ({ query }) => buildUrl(`/products`, query),
      providesTags: ['Product'],
    }),
  }),
});

export const { useGetProductQuery, useSearchProductsQuery } = apiSlice;
