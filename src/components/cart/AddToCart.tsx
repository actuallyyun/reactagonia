import { useDispatch } from 'react-redux'
import { Button } from 'flowbite-react'

import { useState } from 'react'
import { addItem } from './cartSlice'

type Props = {
  id: number
}

export default function AddToCart({ id }: Props) {
  const [quantity, setQuantity] = useState<number>(1)
  const dispath = useDispatch()

  const handleClick = (id: number) => {
    console.log('clicked')
    dispath(addItem({ productId: id, quantity: quantity }))
  }
  return (
    <div className='flex flex-row gap-2 md:gap-4'>
      <input
        type='number'
        value={quantity}
        min={1}
        max={10}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <Button
        onClick={() => handleClick(id)}
        color='light'
        pill
        className='text-nowrap'
      >
        Quick Add
      </Button>
    </div>
  )
}
