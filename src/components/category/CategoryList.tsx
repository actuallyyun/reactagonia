import { useSelector } from 'react-redux'

import { fetchProductByCategory } from '../product/productSlice'
import { useAppDispatch, AppState } from '../../app/store'
import { FAKE_STORE_API } from '../product/Products'
import { useGetCategoriesQuery } from '../../services/fakeStore'

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
        categories.map((c) => (
          <button onClick={() => handleClick(c.id)}>{c.name}</button>
        ))}
    </div>
  )
}
