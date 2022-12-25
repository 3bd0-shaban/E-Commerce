import { apiSlice } from '../ApiSlice';
export const BannerApi = apiSlice.injectEndpoints({

    tagTypes: ['Banner'],
    endpoints: (builder) => ({
        getBanner: builder.query({
            query: () => '/api/banner/get',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Banner', id })), 'Banner']
                    : ['Banner'],
        }),
        getBannerDetails: builder.query({
            query: (id) => `/api/banner/get/${id}`,
            // providesTags: ['Banner'],
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
        updateBanner: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/Banner/update/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['banner'],
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
    useGetBannerQuery,
    useGetBannerDetailsQuery,
    useUpdateBannerMutation,
    useDeleteBannerMutation,
} = BannerApi;

