import { apiSlice } from '../ApiSlice';
export const BannerApi = apiSlice.injectEndpoints({

    tagTypes: ['Banner'],
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: () => ({
                url: '/api/banner/get',
                credentials: 'include',
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Banner'],
        }),
        getBannerTop: builder.query({
            query: () => ({
                url: '/api/banner/get/top',
                credentials: 'include',
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Banner'],
        }),
        getBannerSide: builder.query({
            query: () => ({
                url: '/api/banner/get/side',
                credentials: 'include',
                keepUnusedDataFor: 5,
            }),
            providesTags: ['Banner'],
        }),
        getBannerDetails: builder.query({
            query: (id) => `/api/banner/get/${id}`,
            providesTags: ['Banner'],
        }),
        createBanner: builder.mutation({
            query: (data) => ({
                url: '/api/banner/new',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Banner'],
        }),
        createTopBanner: builder.mutation({
            query: (data) => ({
                url: '/api/banner/new/top',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Banner'],
        }),
        createSideBanner: builder.mutation({
            query: (data) => ({
                url: '/api/banner/new/side',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Banner'],
        }),
        deleteBanner: builder.mutation({
            query: (id) => ({
                url: `/api/Banner/delete/${id}`,
                method: 'DELETE',
                credentials: 'include',
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

