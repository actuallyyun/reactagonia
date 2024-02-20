import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Category, Product } from '../misc/type'

const fakeStoreApi = createApi({
  reducerPath: 'fakeStoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1' }),
  tagTypes: ['Products', 'Category'],
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
    getProductsByCategory: builder.query({
      query: ({
        categoryId,
        sortBy
      }: {
        categoryId: number
        sortBy: string
      }) => ({
        url: `/categories/${categoryId}/products`,
        method: 'GET'
      }),
      providesTags: ['Category'],
      transformResponse: (response: Product[], meta, arg) => {
        console.log({ response })
        if (arg.sortBy === 'default') {
          return response
        }
        if (arg.sortBy === 'ascending') {
          return response.sort((a, b) => a.price - b.price)
        }
        if (arg.sortBy === 'descending') {
          return response.sort((a, b) => b.price - a.price)
        }
        if (arg.sortBy === 'newest') {
          return response.sort(
            (a, b) => Date.parse(a.creationAt) - Date.parse(b.creationAt)
          )
        }
      }
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
