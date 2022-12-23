import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const url = process.env.REACT_APP_API_KEY;

export const ReviewApi = createApi({
    reducerPath: 'ReviewApi',
    baseQuery: fetchBaseQuery({ baseUrl: url }),
    tagTypes: ['Reviews'],
    endpoints: (builder) => ({
        getReviews: builder.query({
            query: (id) => `/api/review/get/${id}`,
            providesTags: ['Reviews'],
        }),
        createReview: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/review/new/${id}`,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Reviews'],
        }),
        updateReview: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/review/update/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Reviews'],
        }),
        deleteReview: builder.mutation({
            query: (id) => ({
                url: `/api/review/delete/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Reviews', id: arg.id }],
        }),
    }),
});

export const {
    useCreateReviewMutation,
    useGetReviewsQuery,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = ReviewApi;
