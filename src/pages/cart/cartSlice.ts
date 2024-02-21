import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Cart, CartItem } from '../../misc/type'
import { useEffect } from 'react'
import { AppState } from '../../app/store'

type InitialState = {
  items: CartItem[]
}

const cartInStorage = localStorage.getItem('cart')

const initialState: InitialState = {
  items: cartInStorage ? JSON.parse(cartInStorage) : []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const newItem = action.payload
      console.log({ newItem })
      const itemIndex = state.items
        ? state.items.findIndex(
            (_item) => _item.productId === newItem.productId
          )
        : -1
      // if not found, add new item
      if (itemIndex === -1) {
        state.items.push(newItem)
      } else {
        //if found, update quantity
        const newCart = state.items.map((prevItem, index) => {
          if (index === itemIndex) {
            return {
              ...prevItem,
              quantity: prevItem.quantity + newItem.quantity
            }
          } else {
            return prevItem
          }
        })
        state.items = newCart
        localStorage.setItem('cart', JSON.stringify(state.items))
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const itemIndex = state.items
        ? state.items.findIndex((_item) => _item.productId === action.payload)
        : -1
      // if found, remove
      if (itemIndex !== -1) {
        const newCart = state.items.filter(
          (prevItem) => prevItem.productId !== action.payload
        )
        state.items = newCart
      }
      localStorage.setItem('cart', JSON.stringify(state.items))
    },
    clearCart: (state) => {
      state.items = []
      localStorage.removeItem('cart')
    }
  }
})

const cartReducer = cartSlice.reducer
export const { addItem, removeItem, clearCart } = cartSlice.actions

export default cartReducer

export const selectAllItems = (state: AppState) => state.cart.items
