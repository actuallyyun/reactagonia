import { Link } from 'react-router-dom'
import { useState } from 'react'

import { useGetAllProductsQuery } from '../../services/fakeStore'
import { Product } from '../../misc/type'
import ProductCard from './ProductCard'
import { PaginationNav } from '../tailwindComponents/Pagination'

export default function Products() {
  const [page, setPage] = useState<number>(1)
  const { data, error, isLoading } = useGetAllProductsQuery(page)
  if (isLoading) {
    return <div>Loading</div>
  }

  if (!data) {
    return <div>No product </div>
  }
  return (
    <div className='grid justify-center gap-8'>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto justify-center'>
        {data &&
          data.map((product: Product) => {
            return (
              <div>
                <Link to={`/product/${product.id}`}>
                  <ProductCard product={product} />
                </Link>
              </div>
            )
          })}
      </div>
      <PaginationNav page={page} setPage={setPage} />
    </div>
  )
}
