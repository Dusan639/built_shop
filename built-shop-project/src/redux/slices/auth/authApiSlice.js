import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USERS_API } from '../../../config/api';

export const authApiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: USERS_API }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
