import { useDispatch } from 'react-redux'

import { removeItem } from '../../pages/cart/cartSlice'

type Props = {
  id: number
}
export default function RemoveFromCart({ id }: Props) {
  const dispath = useDispatch()

  const handleClick = (id: number) => {
    dispath(removeItem(id))
  }
  return (
    <>
      <button onClick={() => handleClick(id)}>Remove Item</button>
    </>
  )
}
