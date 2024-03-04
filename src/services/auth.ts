import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { AppState } from '../app/store'
import {
  User,
  UserInfo,
  UserAuthToken,
  UserRegister,
  UserLoginRequest
} from '../misc/type'

 const authApi = createApi({
   baseQuery: fetchBaseQuery({
     baseUrl: 'https://api.escuelajs.co/api/v1',
     prepareHeaders: (headers, { getState }) => {
       // By default, if we have a token in the store, let's use that for authenticated requests
       const token = (getState() as AppState).user.token?.access_token
       if (token) {
         headers.set('Authorization', `Bearer ${token}`)
       }
       return headers
     }
   }),
   endpoints: (builder) => ({
     register: builder.mutation<User, UserRegister>({
       query: (credentials) => ({
         url: '/users',
         method: 'POST',
         body: credentials
       })
     }),
     login: builder.mutation<UserAuthToken, UserLoginRequest>({
       query: (credentials) => ({
         url: '/auth/login',
         method: 'POST',
         body: credentials
       }),
       transformResponse: (response: UserAuthToken) => {
         return response
       }
     }),
     getUser: builder.query<UserInfo, void>({
       query: () => ({ url: '/auth/profile' }),
       transformResponse: (response: User) => {
         const { id, role, name, email, avatar } = response
         return {
           id,
           role,
           name,
           email,
           avatar
         }
       }
     }),
     getRefreshToken: builder.mutation<UserAuthToken, { refreshToken: string }>(
       {
         query: (refreshToken) => ({
           url: '/auth/refresh-token',
           method: 'POST',
           body: refreshToken
         })
       }
     )
   })
 })

 export const {
   useRegisterMutation,
   useLoginMutation,
   useGetUserQuery,
   useGetRefreshTokenMutation
 } = authApi

 export default authApi