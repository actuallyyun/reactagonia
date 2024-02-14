import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action
} from '@reduxjs/toolkit'
import { Product, Category } from '../../misc/type'
import axios from 'axios'
import { AppState } from '../../app/store'
import { getUniqueValues, getCategories } from '../../misc/utils'

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

export const fetchProductByCategory = createAsyncThunk(
  'products/fetchProductByCategory',
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
  selectedProduct: Product | null
  categories: {
    id: number
    name: string
    image: string
  }[]
}

const initialState: InitialState = {
  products: [],
  status: 'idle',
  error: null,
  selectedProduct: null,
  categories: []
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProductById: (state, action: PayloadAction<number>) => {
      const product = state.products.find(
        (product) => product.id === action.payload
      )
      if (product) {
        return {
          ...state,
          selectedProduct: product
        }
      } else {
        return state
      }
    },
    filterByCategory: (state, action: PayloadAction<string>) => {},
    sortByPrice: (state, action: PayloadAction<number>) => {}
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        const categories = getUniqueValues(
          getCategories(action.payload)
        ) as Category[]
        return {
          ...state,
          products: action.payload,
          status: 'succeeded',
          categories: categories
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
    builder.addCase(fetchProductByCategory.fulfilled, (state, action) => {
      if (!(action.payload instanceof Error)) {
        return {
          ...state,
          products: action.payload,
          status: 'succeeded'
        }
      }
    })
    builder.addCase(fetchProductByCategory.pending, (state) => {
      return {
        ...state,
        status: 'loading'
      }
    })
    builder.addCase(fetchProductByCategory.rejected, (state, action) => {
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
export const { getProductById, filterByCategory, sortByPrice } =
  productSlice.actions
export const selectAllProducts = (state: AppState) => state.products.products

  