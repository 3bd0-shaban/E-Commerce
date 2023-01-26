import { apiSlice } from '../ApiSlice';
export const ProductApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => '/api/product/get',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        getPaginated: builder.query({
            query: () => '/api/product/paginated',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        Search: builder.query({
            query: (keyword) => `/api/product/search?keyword=${keyword}`,
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        Filter: builder.query({
            query: () => '/api/product/filter',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        getProductsDetails: builder.query({
            query: (id) => `/api/product/get/${id}`,
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        createProducts: builder.mutation({
            query: (data) => ({
                url: '/api/product/new',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        updateProducts: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/product/update/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/api/product/delete/${id}`,
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
} = ProductApi;
