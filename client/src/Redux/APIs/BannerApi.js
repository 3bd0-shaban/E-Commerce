import { apiSlice } from '../ApiSlice';
export const BannerApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: () => ({
                url: '/api/banner/',

            }),
            providesTags: ['Banner'],
        }),
        getBannerTop: builder.query({
            query: () => ({
                url: '/api/banner/top',
            }),
            providesTags: ['Banner'],
        }),
        getBannerSide: builder.query({
            query: () => ({
                url: '/api/banner/side',
            }),
            providesTags: ['Banner'],
        }),
        getBannerDetails: builder.query({
            query: (id) => `/api/banner/${id}`,
            providesTags: ['Banner'],
        }),
        createBanner: builder.mutation({
            query: (data) => ({
                url: '/api/banner/new',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Banner'],
        }),
        createTopBanner: builder.mutation({
            query: (data) => ({
                url: '/api/banner/top',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Banner'],
        }),
        createSideBanner: builder.mutation({
            query: (data) => ({
                url: '/api/banner/side',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Banner'],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/api/Banner/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Banner', id: arg.id }],
        }),
    }),
});

export const {
    useCreateBannerMutation,
    useCreateTopBannerMutation,
    useCreateSideBannerMutation,
    useGetBannerQuery,
    useGetBannerTopQuery,
    useGetBannerSideQuery,
    useGetBannerDetailsQuery,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
} = BannerApi;

