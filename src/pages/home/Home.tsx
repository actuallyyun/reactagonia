import Products from '../../components/product/Products'
import CategoryList from '../../components/category/CateroryList'
import SortByPrice from '../../components/SortByPrice'

export default function Home() {
  return (
    <div>
      <SortByPrice />
      <CategoryList />
      <Products />
    </div>
  )
}
