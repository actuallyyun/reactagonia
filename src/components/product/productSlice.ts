import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { Product } from '../../misc/type'
import axios from 'axios'
import { AppState } from '../../app/store'

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (url: string) => {
    try {
      const response = await axios.get(url)
      if (response.status === 200) {
        return response.data
      }
    } catch (err) {
      const error = err as Error
      return error
    }
  }
)

export type InitialState = {
  products: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: Error | null
}

const initialState: InitialState = {
  products: [],
  status: 'idle',
  error: null
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    findById: (state, action: PayloadAction<number>) => {},
    filterByCategory: (state, action: PayloadAction<string>) => {},
    sortByPrice: (state, action: PayloadAction<number>) => {}
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          status: 'succeeded'
        }
      }
    })
    builder.addCase(fetchProducts.pending, (state, action) => {
      return {
        ...state,
        status: 'loading'
      }
    })
    builder.addCase(fetchProducts.rejected, (state, action) => {
      if (action.payload instanceof Error) {
        return {
          ...state,
          status: 'failed',
          error: action.payload
        }
      }
    })
  }
})

export const productReducer = productSlice.reducer
export const { findById, filterByCategory, sortByPrice } = productSlice.actions
export const selectAllProducts = (state: AppState) => state.products.products
