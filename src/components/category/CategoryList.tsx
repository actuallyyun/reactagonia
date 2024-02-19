import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchProductByCategory } from '../product/productSlice'
import { useAppDispatch, AppState } from '../../app/store'
import { FAKE_STORE_API } from '../product/Products'
import {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery
} from '../../services/fakeStore'
import { useEffect } from 'react'

export default function CategoryList() {
  const { data, error, isLoading } = useGetCategoriesQuery()
  //const categories = useSelector((state: AppState) => state.products.categories)

  const categories = data
  console.log({ data })

  const dispatch = useAppDispatch()
  const handleClick = (categoryId: number) => {
    console.log({ categoryId })
    dispatch(
      fetchProductByCategory(
        `${FAKE_STORE_API}/categories/${categoryId}/products`
      )
    )
  }

  return (
    <div>
      {categories &&
        categories.map((c) => <Link to={`/category/${c.id}`}>{c.name}</Link>)}
    </div>
  )
}
