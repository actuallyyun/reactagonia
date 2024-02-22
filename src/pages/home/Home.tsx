import { Link } from 'react-router-dom'

import Products from '../../components/product/Products'
import CategoryList from '../../components/category/CategoryList'
export default function Home() {
  return (
    <div>
      <CategoryList />
      <h1>Products</h1>
      <Products />
    </div>
  )
}
