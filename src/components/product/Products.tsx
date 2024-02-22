import { Link } from 'react-router-dom'

import { useGetAllProductsQuery } from '../../services/fakeStore'
import { Product } from '../../misc/type'
import ProductCard from './ProductCard'

export default function Products() {
  const { data, error, isLoading } = useGetAllProductsQuery()

  return (
    <div className='grid gap-4 grid-cols-3 grid-rows-auto'>
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
  )
}
