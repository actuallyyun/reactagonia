import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  useGetSingleProductQuery,
  useDeleteProductMutation
} from '../../services/fakeStore'
import AddToCart from '../../components/cart/AddToCart'
import { AppState } from '../../app/store'
import UpdateProductForm from '../../components/product/UpdateProductForm'

const RemoveProduct = ({ id }: { id: number }) => {
  const nav = useNavigate()
  const [deleteProduct, { data, error, isLoading }] = useDeleteProductMutation()
  const handleRemove = (id: number) => {
    deleteProduct(id)
  }
  if (data === true) {
    nav('/')
  }
  return <button onClick={() => handleRemove(id)}>Remove</button>
}

export default function SingleProductPage() {
  const { productId } = useParams()

  const { data, error, isLoading } = useGetSingleProductQuery(Number(productId))
  const { isLoggedIn } = useSelector((state: AppState) => state.user)

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
          {isLoggedIn && <UpdateProductForm product={data} />}
          {isLoggedIn && <RemoveProduct id={data.id} />}
          <Link to='/'>Continue Shopping</Link>
        </div>
      )}
    </>
  )
}
