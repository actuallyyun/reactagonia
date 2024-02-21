import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import ClearCart from '../../components/cart/ClearCart'
import { selectAllItems } from './cartSlice'
import RemoveFromCart from '../../components/cart/RemoveFromCart'

export default function Cart() {
  const items = useSelector(selectAllItems)
  return (
    <>
      <p>Shopping carts</p>
      {!items.length && <p>Your cart is empty</p>}
      <ul>
        {items.length &&
          items.map((_item) => {
            return (
              <div>
                <li>
                  item:{_item.productId} quantity:{_item.quantity}
                </li>
                <RemoveFromCart id={_item.productId} />
              </div>
            )
          })}
      </ul>
      <ClearCart />
      <Link to='/'>Continue Shopping</Link>
    </>
  )
}
