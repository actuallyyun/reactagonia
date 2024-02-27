import { Product } from '../../misc/type'
import { Card } from 'flowbite-react'

import AddToCart from '../cart/AddToCart'
import { cleanImageUrl, generateRandomImage } from '../../misc/utils'

export type ProductCardProp = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProp) {
  const images = product.images.map((img) => {
    return cleanImageUrl(img) ?? generateRandomImage()
  })
  console.log({ images })
  return (
    <>
      {' '}
      <Card
        className='max-w-sm'
        imgAlt='Apple Watch Series 7 in colors pink, silver, and black'
        imgSrc={images[0]}
      >
        <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
          {product.title}
        </h5>
        <span className='text-3xl font-bold text-gray-900 dark:text-white'>
          ${product.price}
        </span>
        <AddToCart id={product.id} />
      </Card>
    </>
  )
}




