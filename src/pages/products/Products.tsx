import { Link } from 'react-router-dom'
import { useState } from 'react'

import { useGetAllProductsQuery } from '../../services/fakeStore'
import { Product } from '../../misc/type'
import ProductCard from '../../components/product/ProductCard'
import { PaginationNav } from '../../components/tailwindComponents/Pagination'
import SearchProduct from '../../components/product/SearchProduct'
import { QueryParams } from '../../misc/type'

export default function Products() {
  const [query, setQuery] = useState<QueryParams>([
    {
      type: 'offset',
      value: '0'
    },
    {
      type: 'limit',
      value: '12'
    }
  ])

  const { data, error, isLoading } = useGetAllProductsQuery(query)

  return (
    <div className='grid justify-center gap-8'>
      <SearchProduct setQuery={setQuery} />
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 grid-rows-auto justify-center'>
        {data &&
          data.map((product: Product) => {
            return (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            )
          })}
      </div>
      <PaginationNav setQuery={setQuery} />
    </div>
  )
}
