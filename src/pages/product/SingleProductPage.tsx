import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useGetSingleProductQuery } from '../../services/fakeStore'
import AddToCart from '../../components/cart/AddToCart'

export default function SingleProductPage() {
  const { productId } = useParams()

  const { data, error, isLoading } = useGetSingleProductQuery(Number(productId))

  return (
    <>
      <p>single product page</p>
      {!data && <p>The product you are looking for does not exist.</p>}g{' '}
      {data && (
        <div>
          <p>
            {data.id} {data.title}
          </p>
          <AddToCart id={data.id} />
          <Link to='/'>Continue Shopping</Link>
        </div>
      )}
    </>
  )
}
