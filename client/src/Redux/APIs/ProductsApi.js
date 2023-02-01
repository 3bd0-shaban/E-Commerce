import { apiSlice } from '../ApiSlice';
export const ProductApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: (numpage) => `/api/product/get?page=${numpage}`,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        getPaginated: builder.query({
            query: () => '/api/product/paginated',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        Search: builder.query({
            query: (keyword) => ({
                url: `/api/product/search?keyword=${keyword}`,
                method: 'GET',

            }),
            providesTags: ['Products'],
        }),
        ProductsByCategory: builder.query({
            query: (category) => ({
                url: `/api/product/getsub?category=${category}`,
                method: 'GET',

            }),
            providesTags: ['Products'],
        }),
        Filter: builder.query({
            query: () => '/api/product/filter',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Products', id })), 'Products']
                    : ['Products'],
        }),
        getProductsDetails: builder.query({
            query: (id) => `/api/product/get/${id}`,
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
    useProductsByCategoryQuery,
} = ProductApi;
