import { useParams } from 'react-router-dom'

import { AppState } from '../../app/store'
import { useSelector, useDispatch } from 'react-redux'
import { getProductById } from '../../components/product/productSlice'

export default function SingleProductPage() {
  const { productId } = useParams()
  const dispath = useDispatch()
  dispath(getProductById(Number(productId)))

  const product = useSelector(
    (state: AppState) => state.products.selectedProduct
  )

  return (
    <>
      <p>single product page</p>
      {!product && <p>The product you are looking for does not exist.</p>}g{' '}
      {product && <p>{product.id}</p>}
    </>
  )
}
