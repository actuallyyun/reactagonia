import { useDispatch } from 'react-redux'

import { useState } from 'react'
import { addItem } from './cartSlice'

type Props = {
  id: number
}

export default function AddToCart({ id }: Props) {
  const [quantity, setQuantity] = useState<number>(1)
  const dispath = useDispatch()

  const handleClick = (id: number) => {
    dispath(addItem({ productId: id, quantity: quantity }))
  }
  return (
    <>
      <input
        type='number'
        value={quantity}
        min={1}
        max={10}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <button onClick={() => handleClick(id)}>Add To Cart</button>
    </>
  )
}
