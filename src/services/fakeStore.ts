import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Category, Product } from '../misc/type'

const fakeStoreApi = createApi({
  reducerPath: 'fakeStoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1' }),
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<Product[], void>({
      query: () => ({ url: '/products', method: 'GET' }),
      providesTags: [{ type: 'Products' }]
    }),
    getSingleProduct: builder.query<Product, number>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'GET'
      })
    }),
    updateProduct: builder.mutation<Product, number>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'PUT'
      }),
      invalidatesTags: [{ type: 'Products' }]
    }),
    deleteProduct: builder.mutation<Boolean, number>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Products' }]
    }),
    createProduct: builder.mutation<Product, Partial<Product>>({
      query: (product) => ({
        url: '/products',
        method: 'POST',
        product
      }),
      invalidatesTags: [{ type: 'Products' }]
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: '/categories', method: 'GET' })
    }),
    getProductsByCategory: builder.query<Product[], number>({
      query: (categoryId) => ({
        url: `/categories/${categoryId}/products`,
        method: 'GET'
      })
    })
  })
})

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery
} = fakeStoreApi
export default fakeStoreApi
