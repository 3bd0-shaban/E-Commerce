'use client';
import { productType, specificationsType } from '@lib/types/product';
import { apiSlice } from '../ApiSlice';
interface NewProductProps {
    name: string;
    des: string;
    stock: string;
    price: string;
    brand: string;
    category: string;
    subcategory: string;
    images: string[];
    specs: specificationsType[];
    fulldes: string;
    discountprice: string;
    warranty: boolean;
}
export const ProductApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<{ status: string; results: number; products: productType[] }, { page?: number }>({
            query: ({ page }) => `/api/product?page=${page}`,
            providesTags: ['Products'],
        }),
        getPaginated: builder.query<productType[], void>({
            query: () => '/api/product/paginated',
            providesTags: ['Products'],
        }),
        Search: builder.query<productType[], void>({
            query: (keyword) => ({
                url: `/api/product/search?keyword=${keyword}`,
                method: 'GET',

            }),
            providesTags: ['Products'],
        }),
        ProductsByCategory: builder.query<productType[], void>({
            query: (category) => ({
                url: `/api/product/getsub?category=${category}`,
                method: 'GET',

            }),
            providesTags: ['Products'],
        }),
        Filter: builder.query({
            query: () => '/api/product/filter',
            providesTags: ['Products'],
        }),
        getProductsDetails: builder.query<productType, { productId: string }>({
            query: ({ productId }) => `/api/product/${productId}`,
            providesTags: ['Products'],
        }),
        createProducts: builder.mutation<{ status: string; message: string; product: productType }, NewProductProps>({
            query: ({ name, des, stock, price, brand, category, subcategory, images, specs, fulldes, discountprice, warranty }) => ({
                url: '/api/product/',
                method: 'POST',
                body: { name, des, stock, price, brand, category, subcategory, images, specs, fulldes, discountprice, warranty }
            }),
            invalidatesTags: ['Products'],
        }),
        updateProducts: builder.mutation({
            query: ({ data, id }) => ({
                url: `/api/product/${id}`,
                method: 'PUT',
                credentials: 'include',
                body: data,
            }),
            invalidatesTags: ['Products'],
        }),
        deleteProducts: builder.mutation({
            query: (id) => ({
                url: `/api/product/${id}`,
                method: 'DELETE',
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Products', id: arg.id }],
        }),
    }),
});

export const {
    useCreateProductsMutation,
    useGetPaginatedQuery,
    useSearchQuery,
    useFilterQuery,
    useGetProductsQuery,
    useGetProductsDetailsQuery,
    useUpdateProductsMutation,
    useDeleteProductsMutation,
    useProductsByCategoryQuery,
} = ProductApi;
