import { apiSlice } from '../ApiSlice';

export const CategoryApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategory: builder.query({
            query: () => '/api/category/',
            keepUnusedDataFor: 5,
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Category', id })), 'Category']
                    : ['Category'],
        }),
        getCategoryDetails: builder.query({
            query: (id) => `/api/category/${id}`,
            // providesTags: ['Category'],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: '/api/Category/',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        updateCategory: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/category/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Category'],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Category', id: arg.id }],
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