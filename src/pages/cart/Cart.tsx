import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ChangeEvent, useState } from 'react'
import { useDispatch } from 'react-redux'

import ClearCart from '../../components/cart/ClearCart'
import { selectAllItems, updateQuantity } from '../../components/cart/cartSlice'
import RemoveFromCart from '../../components/cart/RemoveFromCart'
import { CartItem } from '../../misc/type'

type CartItemProp = {
  item: CartItem
}
const CartItemCard = ({ item }: CartItemProp) => {
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuantity((prev) => (prev = parseInt(e.target.value)))
  }
  const dispatch = useDispatch()
  const handleUpdate = (id: number) => {
    dispatch(
      updateQuantity({
        productId: id,
        quantity: quantity
      })
    )
  }

  return (
    <>
      <p>id:{item.productId}</p>
      <input
        type='number'
        value={quantity}
        max={10}
        min={1}
        onChange={handleQuantityChange}
      />
      <button onClick={() => handleUpdate(item.productId)}>Update</button>
    </>
  )
}

export default function Cart() {
  const items = useSelector(selectAllItems)
  return (
    <>
      <p>Shopping carts</p>
      {!items.length && <p>Your cart is empty</p>}
      <ul>
        {items.length &&
          items.map((item) => {
            return (
              <div>
                <li>
                  <CartItemCard item={item} />
                </li>
                <RemoveFromCart id={item.productId} />
              </div>
            )
          })}
      </ul>
      <ClearCart />
      <Link to='/'>Continue Shopping</Link>
    </>
  )
}
