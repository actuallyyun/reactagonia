import { useParams } from 'react-router-dom'

import { useGetProductsByCategoryQuery } from '../../services/fakeStore'
import ProductCard from '../../components/product/ProductCard'

export default function CategoryPage() {
  const { categoryId } = useParams()
  const { data, error, isLoading } = useGetProductsByCategoryQuery(
    Number(categoryId)
  )
  console.log({ data })

  return (
    <div>
      {data?.map((product) => (
        <ProductCard product={product} />
      ))}
    </div>
  )
}
