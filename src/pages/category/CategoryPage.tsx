import { useParams, Link } from 'react-router-dom'
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

  return (
    <div className='container'>
      {data && (
        <div className='grid'>
          {
            <div>
              <h2>{data[0].category.name}</h2>
              <p>{data.length} Items</p>
            </div>
          }
          <div className='py-4 justify-start'>
            <SortByPrice />
          </div>
          <div className='grid gap-4 grid-cols-3 grid-rows-auto'>
            {data?.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
