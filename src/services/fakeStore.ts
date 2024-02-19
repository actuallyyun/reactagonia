import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Category } from '../misc/type'

const fakeStoreApi = createApi({
  reducerPath: 'fakeStoreApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.escuelajs.co/api/v1/' }),
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: '/categories', method: 'GET' })
    })
  })
})

export const { useGetCategoriesQuery } = fakeStoreApi
export default fakeStoreApi
