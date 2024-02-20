import Products from '../../components/product/Products'
import CategoryList from '../../components/category/CategoryList'

export default function Home() {
  return (
    <div>
      <CategoryList />
      <Products />
    </div>
  )
}
