import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, LogOut } from '../Slices/UserSlice';
const url = process.env.REACT_APP_API_KEY;

const base_Query = fetchBaseQuery({
    baseUrl: url,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
    }
})
const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await base_Query(args, api, extraOptions);
    if (result?.error?.originalStatus === 403) {
        console.log('Sending Refresh Token ...');
        const refreshToken = await base_Query('/api/auth/refresh', api, extraOptions);
        console.log(refreshToken);
        if (refreshToken?.data) {
            const user = api.getState().auth.user
            api.dipatch(setCredentials({ ...refreshToken.data, user }));
            result = await base_Query(args, api, extraOptions)
        } else {
            api.dispatch(LogOut())
        }
    }
    return result
}
export const Auth_Query = createApi({
    reducerPath:'AuthApi',
    baseQuery: baseQueryWithReauth,
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
                url: '/api/auth/sinup',
                method: 'POST',
                credentials: 'include',
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
        getAllUsers: builder.mutation({
            query: (data) => ({
                url: '/api/auth/get/all',
                method: 'POST',
                credentials: 'include',
                body: data,
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
    useGetAllUsersMutation,
    useDeleteUserMutation,
    useUpdateUserInfoMutation,
    useUpdateUserRoleMutation,
    useLogOutMutation,
    useSigninMutation,
    useSignupMutation,
    useUserInfoQuery
} = Auth_Query;