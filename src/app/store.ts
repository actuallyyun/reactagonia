import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import fakeStoreApi from '../services/fakeStore'
import { categoryReducer } from '../components/category/categorySlice'
import userReducer from '../components/user/userSlice'
import { authApi } from '../services/auth'
import cartReducer from '../components/cart/cartSlice'

// store all states
const store = configureStore({
  reducer: {
    // counterReducer

    category: categoryReducer,
    user: userReducer,
    cart: cartReducer,
    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
    [authApi.reducerPath]: authApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(fakeStoreApi.middleware)
      .concat(authApi.middleware)
})

export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
// async useDispatch

export default store
