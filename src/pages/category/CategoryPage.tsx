import { useParams } from 'react-router-dom'
import { UseSelector } from 'react-redux'

import { useGetProductsByCategoryQuery } from '../../services/fakeStore'
import ProductCard from '../../components/product/ProductCard'
import SortByPrice from '../../components/category/SortByPrice'
import { useSelector } from 'react-redux'
import { AppState } from '../../app/store'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const sortBy = useSelector((state: AppState) => state.category.sortBy)

  const { data, error, isLoading } = useGetProductsByCategoryQuery({
    categoryId: Number(categoryId),
    sortBy
  })
  console.log({ data })

  return (
    <div className='container'>
      <div className='grid'>
        <div className='grid-cols-12 py-4'>
          <SortByPrice />
        </div>
        <div className='grid gap-4 grid-cols-3 grid-rows-auto'>
          {data?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
    </div>
  )
}
