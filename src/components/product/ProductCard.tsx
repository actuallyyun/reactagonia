import { Product } from '../../misc/type'

type ProductCardProp = {
  product: Product
}
export default function ProductCard({ product }: ProductCardProp) {
  return (
    <>
      <p>{product.title}</p>
      <p>{product.category.name}</p>
      <p>{product.price}</p>
    </>
  )
}
