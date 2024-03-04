import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import productApi from '../services/product'
import { categoryReducer } from '../components/category/categorySlice'
import userReducer from '../components/user/userSlice'
import authApi from '../services/auth'
import cartReducer from '../components/cart/cartSlice'

const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer,
  cart: cartReducer,
  [productApi.reducerPath]: productApi.reducer,
  [authApi.reducerPath]: authApi.reducer
})

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(productApi.middleware)
        .concat(authApi.middleware),
    preloadedState
  })
}

const store = setupStore()
// store all states
//const store = configureStore({
//  reducer: {
//    // counterReducer

//    category: categoryReducer,
//    user: userReducer,
//    cart: cartReducer,
//    [fakeStoreApi.reducerPath]: fakeStoreApi.reducer,
//    [authApi.reducerPath]: authApi.reducer
//  }
//})

export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
// async useDispatch

export default store
export type AppStore = ReturnType<typeof configureStore>
export type RootState = ReturnType<typeof rootReducer>
