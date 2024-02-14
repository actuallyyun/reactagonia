import { UseSelector } from 'react-redux'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

import { useAppDispatch, AppState } from '../../app/store'
import { useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from './productSlice'
import { useEffect } from 'react'

const FAKE_STORE_URL = 'https://api.escuelajs.co/api/v1/products'

export default function Products() {
  const dispatch = useAppDispatch()
  const products = useSelector(selectAllProducts)
  const productStatus = useSelector((state: AppState) => state.products.status)

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts(FAKE_STORE_URL))
    }
  }, [productStatus, dispatch])

  console.log({ products })
  return (
    <>
      <p>products</p>
    </>
  )
}
