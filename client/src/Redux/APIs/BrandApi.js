import { apiSlice } from '../ApiSlice';

export const BrandApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBrand: builder.query({
            query: () => '/api/brand/',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Brand', id })), 'Brand']
                    : ['Brand'],
        }),
        getBrandDetails: builder.query({
            query: (id) => `/api/brand/${id}`,
            // providesTags: ['Brand'],
        }),
        createBrand: builder.mutation({
            query: (data) => ({
                url: '/api/brand/',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Brand'],
        }),
        updateBrand: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/brand/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Brand'],
        }),
        deleteBrand: builder.mutation({
            query: (id) => ({
                url: `/api/brand/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Brand', id: arg.id }],
        }),
    }),
});

export const {
    useCreateBrandMutation,
    useGetBrandQuery,
    useGetBrandDetailsQuery,
    useUpdateBrandMutation,
    useDeleteBrandMutation,
} = BrandApi;
