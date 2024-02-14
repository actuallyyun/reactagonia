import { useAppDispatch, AppState } from '../../app/store'
import { useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from './productSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export const FAKE_STORE_API = 'https://api.escuelajs.co/api/v1'

export default function Products() {
  const dispatch = useAppDispatch()
  const products = useSelector(selectAllProducts)
  const productStatus = useSelector((state: AppState) => state.products.status)

  useEffect(() => {
    if (productStatus === 'idle') {
      dispatch(fetchProducts(`${FAKE_STORE_API}/products`))
    }
  }, [productStatus, dispatch])

  return (
    <>
      {products.map((product) => {
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
