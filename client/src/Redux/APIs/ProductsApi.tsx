'use client';
import { productType } from '@lib/types/product';
import { apiSlice } from '../ApiSlice';
export const ProductApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<productType[], { numpage?: 1 }>({
            query: ({ numpage }) => `/api/product?page=${numpage}`,
            providesTags: ['Products'],
        }),
        getPaginated: builder.query<productType[], void>({
            query: () => '/api/product/paginated',
            providesTags: ['Products'],
        }),
        Search: builder.query<productType[], void>({
            query: (keyword) => ({
                url: `/api/product/search?keyword=${keyword}`,
                method: 'GET',

            }),
            providesTags: ['Products'],
        }),
        ProductsByCategory: builder.query<productType[], void>({
            query: (category) => ({
                url: `/api/product/getsub?category=${category}`,
                method: 'GET',

            }),
            providesTags: ['Products'],
        }),
        Filter: builder.query({
            query: () => '/api/product/filter',
            providesTags: ['Products'],
        }),
        getProductsDetails: builder.query<productType, { productId: string }>({
            query: ({ productId }) => `/api/product/${productId}`,
            providesTags: ['Products'],
        }),
        createProducts: builder.mutation({
            query: (data) => ({
                url: '/api/product/',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProducts: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/product/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.id }],
        }),
    }),
});

export const {
    useCreateProductsMutation,
    useGetPaginatedQuery,
    useSearchQuery,
    useFilterQuery,
    useGetProductsQuery,
    useGetProductsDetailsQuery,
    useUpdateProductsMutation,
    useDeleteProductsMutation,
    useProductsByCategoryQuery,
} = ProductApi;
