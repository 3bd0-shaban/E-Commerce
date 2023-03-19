import { apiSlice } from '../ApiSlice';
export const UserApi = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUserById: builder.query({
            query: (id) => ({
                url: `/api/auth/get/${id}`,
                credentials: 'include',
            }),
            providesTags: ['User'],
        }),
        getUser: builder.query({
            query: () => ({
                url: '/api/auth/info',
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['User'],
        }),
        getAllUsers: builder.query({
            query: (pagenum) => ({
                url: `/api/auth/getall?page=${pagenum}`,
                method: 'GET',
                credentials: 'include',
            }),
            providesTags: ['User'],
        }),
        DeleteUser: builder.mutation({
            query: (id) => ({
                url: `/api/auth/get/deleteuser/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
        updateUserInfo: builder.mutation({
            query: (data, id) => ({
                url: `/api/auth/updateuser/${id}`,
                method: 'POST',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['User'],
        }),
        updateUserRole: builder.mutation({
            query: (id) => ({
                url: `/api/auth/updateuserrole/${id}`,
                method: 'POST',
                credentials: 'include',
            }),
            invalidatesTags: ['User'],
        }),
    }),
});
export const {
    useGetUserByIdQuery,
    useGetAllUsersQuery,
    useGetUserQuery,
    useDeleteUserMutation,
    useUpdateUserInfoMutation,
    useUpdateUserRoleMutation,
} = UserApi;