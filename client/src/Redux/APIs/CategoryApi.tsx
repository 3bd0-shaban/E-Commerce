'use client';
import { categoryType } from '@lib/types/category';
import { apiSlice } from '../ApiSlice';

export const CategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query<categoryType[], void>({
            query: () => ({
                url: '/api/category/',
                method: 'GET',
                providesTags: ['Category'],
            }),
        }),
        getCategoryDetails: builder.query<categoryType, { id: string }>({
            query: ({ id }) => `/api/category/${id}`,
            // providesTags: ['Category'],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/api/Category/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/category/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation<{ message: string }, { id: string }>({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useCreateCategoryMutation,
    useGetCategoryQuery,
    useGetCategoryDetailsQuery,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
} = CategoryApi;