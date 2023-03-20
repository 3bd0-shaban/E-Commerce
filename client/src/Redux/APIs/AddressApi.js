
import { apiSlice } from '../ApiSlice';
export const AddressApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAddress: builder.query({
            query: () => '/api/Address/get',
            providesTags: (result, error, arg) =>
                result
                    ? [...result.map(({ id }) => ({ type: 'Address', id })), 'Address']
                    : ['Address'],
        }),
        getAddressDetails: builder.query({
            query: (id) => `/api/auth/get/${id}`,
            providesTags: ['Address'],
        }),
        Address: builder.mutation({
            query: (data) => ({
                url: '/api/auth/newaddress',
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Address'],
        }),
        deleteAddress: builder.mutation({
            query: (id) => ({
                url: '/api/auth/delete',
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Address', id: arg.id }],
        }),
        deleteAllAddress: builder.mutation({
            query: (id) => ({
                url: '/api/auth/delete',
                method: 'DELETE',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Address', id: arg.id }],
        }),
    }),
});

export const {
    useAddressMutation,
    useGetAddressQuery,
    useGetAddressDetailsQuery,
    useDeleteAddressMutation,
    useDeleteAllAddressMutation,
} = AddressApi;
