import { Link } from 'react-router-dom'

import { useGetAllProductsQuery } from '../../services/fakeStore'
import { Product } from '../../misc/type'

export default function Products() {
  const { data, error, isLoading } = useGetAllProductsQuery()

  return (
    <>
      {data &&
        data.map((product: Product) => {
          return (
            <div>
              <Link to={`/product/${product.id}`}>
                <h1>
                  {product.title} price:${product.price}
                </h1>
              </Link>
            </div>
          )
        })}
    </>
  )
}
