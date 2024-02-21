import { Product } from '../../misc/type'

import AddToCart from '../cart/AddToCart'

type ProductCardProp = {
  product: Product
}
export default function ProductCard({ product }: ProductCardProp) {
  return (
    <>
      <p>{product.title}</p>
      <p>{product.category.name}</p>
      <p>{product.price}</p>
      <AddToCart id={product.id} />
    </>
  )
}
