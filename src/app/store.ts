import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { productReducer } from '../components/product/productSlice'

// store all states
const store = configureStore({
  reducer: {
    // counterReducer
    products: productReducer
  }
})

export type AppState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
// async useDispatch

export default store
