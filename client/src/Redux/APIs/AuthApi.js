import { apiSlice } from './ApiSlice';
export const Auth_Query = apiSlice.injectEndpoints({
    tagTypes: ['Auth'],
    endpoints: builder => ({
        getUserById: builder.query({
            query: (id) => ({
                url: `/api/auth/get/${id}`,
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        userInfo: builder.query({
            query: () => ({
                url: '/api/auth/userinfo',
                credentials: 'include',
            }),
            providesTags: ['Auth'],
        }),
        signin: builder.mutation({
            query: (data) => ({
                url: '/api/auth/signin',
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        signup: builder.mutation({
            query: (data) => ({
                url: '/api/auth/signup',
                method: 'POST',
                // credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/api/auth/logout',
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        getAllUsers: builder.query({
            query: () => ({
                url: '/api/auth/getall',
                method: 'GET',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        DeleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/auth/get/deleteuser/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserInfo: builder.mutation({
            query: (data, id) => ({
                url: `/api/auth/updateuser/${id}`,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Auth'],
        }),
        updateUserRole: builder.mutation({
            query: (id) => ({
                url: `/api/auth/updateuserrole/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});
export const {
    useGetUserByIdQuery,
    useGetAllUsersQuery,
    useDeleteUserMutation,
    useUpdateUserInfoMutation,
    useUpdateUserRoleMutation,
    useLogOutMutation,
    useSigninMutation,
    useSignupMutation,
    useUserInfoQuery
} = Auth_Query;