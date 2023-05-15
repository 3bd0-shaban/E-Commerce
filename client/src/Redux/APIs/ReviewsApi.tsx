'use client';
import { apiSlice } from '../ApiSlice';
import { reviewType } from '@lib/types/review';
interface ReviewArgs {
    productId: string;
    comment: string;
    rating: string;
}
export const ReviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<{ status: string; results: number; reviews: reviewType[] }, { productId: string }>({
            query: ({ productId }) => `/api/review/${productId}`,
            providesTags: ['Reviews'],
        }),
        createReview: builder.mutation<{ message: string, review: reviewType }, { productId: string; comment: string; rating: string }>({
            query: ({ comment, rating, productId }) => ({
                url: `/api/review/${productId}`,
                method: 'POST',
                body: { comment, rating },
            }),
            invalidatesTags: ['Reviews'],
        }),
        updateReview: builder.mutation({
            query: ({ data, productId }) => ({
                url: `/api/review/${productId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Reviews'],
        }),
        deleteReview: builder.mutation({
            query: ({ productId }) => ({
                url: `/api/review/${productId}`,
                method: 'DELETE',
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
