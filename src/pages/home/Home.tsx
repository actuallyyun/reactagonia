import { Link } from 'react-router-dom'

import Products from '../../components/product/Products'
import CategoryList from '../../components/category/CategoryList'
export default function Home() {
  return (
    <div>
      <Link to='/account'>Account</Link>
      <CategoryList />
      <Products />
    </div>
  )
}
