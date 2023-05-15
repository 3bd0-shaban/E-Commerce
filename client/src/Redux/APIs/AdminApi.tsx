'use client';
import { apiSlice } from '../ApiSlice';
import { productType } from '@lib/types/product';
import { reviewType } from '@lib/types/review';
interface ReviewArgs {
    productId: string;
    comment: string;
    rating: string;
}
interface NewReview {
    Review: productType
    msg: string;
}
export const AdminApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        getAllReviews: builder.query<{ status: string; results: number; reviews: reviewType[] }, void>({
            query: () => `/api/admin/reviews`,
            providesTags: ['Reviews'],
        }),
        deleteReview: builder.mutation<productType, { productId: string }>({
            query: ({ productId }) => ({
                url: `/api/admin/delete-review/${productId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useDeleteReviewMutation,
    useGetAllReviewsQuery,
} = AdminApi;
