import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PRODUCTS_API } from '../../../config/api';

export const productsApiSlice = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: PRODUCTS_API }),
    endpoints: (builder) => ({
        fetchProducts: builder.query({
            query: ({ page = 1 }) => `products?limit=16&skip=${(page - 1) * 16}`,
        }),
        fetchProductById: builder.query({
            query: (id) => `products/${id}`,
        }),
    }),
});

export const { useFetchProductsQuery, useFetchProductByIdQuery } = productsApiSlice;
