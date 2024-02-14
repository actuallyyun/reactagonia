import { useAppDispatch, AppState } from '../../app/store'
import { useSelector } from 'react-redux'
import { fetchProducts, selectAllProducts } from './productSlice'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

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

  return (
    <>
      {products.map((product) => {
        return (
          <div>
            <Link to={`/product/${product.id}`}>
              <h1>{product.title}</h1>
            </Link>
          </div>
        )
      })}
    </>
  )
}
