import { useDispatch } from 'react-redux'

import { clearCart } from '../../pages/cart/cartSlice'

export default function ClearCart() {
  const dispath = useDispatch()

  const handleClick = () => {
    dispath(clearCart())
  }
  return (
    <>
      <button onClick={handleClick}>Clear Cart</button>
    </>
  )
}
