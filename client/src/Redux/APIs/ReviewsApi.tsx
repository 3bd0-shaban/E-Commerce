'use client';
import { apiSlice } from '../ApiSlice';
import { productType } from '@lib/types/product';
interface ReviewArgs {
    productId: string;
    comment: string;
    rating: string;
}
interface NewReview {
    Review: productType
    msg: string;
}
export const ReviewApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getReviews: builder.query<productType, { productId: string }>({
            query: ({ productId }) => `/api/review/${productId}`,
            providesTags: ['Reviews'],
        }),
        createReview: builder.mutation<NewReview, ReviewArgs>({
            query: ({ comment, productId }) => ({
                url: `/api/review/${productId}`,
                method: 'POST',
                body: comment,
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
            query: (productId) => ({
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
