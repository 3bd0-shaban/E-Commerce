'use client';
import { userType } from '@lib/types/user';
import { apiSlice } from '../ApiSlice';
export const UserApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        Search: builder.query({
            query: ({ keyword, pagnum }) => ({
                url: `/api/auth/search?keyword=${keyword}&page=${pagnum}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        getUserById: builder.query({
            query: (username) => ({
                url: `/api/auth/get/${username}`,
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        getAllUsers: builder.query<{ status: string, results: number; users: userType[] }, void>({
            query: () => ({
                url: '/api/auth/getall',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        getAdmins: builder.query<{ status: string, results: number; users: userType[] }, { page: number }>({
            query: ({ page }) => ({
                url: `/api/auth/admins?=page${page}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        getMoreAdmins: builder.query<{ status: string, results: number; users: userType[] }, { page: number }>({
            query: ({ page }) => ({
                url: `/api/auth/admins?=page${page}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['Auth'],

            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {

                    const { data } = await queryFulfilled;

                    dispatch(
                        UserApi.util.updateQueryData("getAdmins", { page: 1 }, (draft) => {
                            return {
                                users: [
                                    ...draft.users,
                                    ...data.users,
                                ],
                                results: data.results,
                                status: data.status,
                            };
                        })
                    );
                } catch (err) {
                    console.log(err)
                }
            },

        }),
        DeleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/user/get/deleteuser/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserInfo: builder.mutation({
            query: (data) => ({
                url: '/api/user/updateuser',
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        UpdateProfilePic: builder.mutation({
            query: (data) => ({
                url: '/api/user/updatepic',
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserRole: builder.mutation({
            query: (id) => ({
                url: `/api/user/updateuserrole/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),

});

export const {
    useSearchQuery,
    useDeleteUserMutation,
    useUpdateUserInfoMutation,
    useUpdateUserRoleMutation,
    useUpdateProfilePicMutation,
    useGetUserByIdQuery,
    useGetAdminsQuery,
    useGetAllUsersQuery,
} = UserApi;
