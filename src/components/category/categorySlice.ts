import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  Action
} from '@reduxjs/toolkit'
import { Product, Category } from '../../misc/type'

type InitialState = {
  sortBy: string
}

const initialState: InitialState = {
  sortBy: 'default'
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSortMethod: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        sortBy: action.payload
      }
    }
  }
})

export const categoryReducer = categorySlice.reducer
export const { setSortMethod } = categorySlice.actions
