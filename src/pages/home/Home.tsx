import { Link } from 'react-router-dom'

import Products from '../../components/product/Products'
import CategoryList from '../../components/category/CategoryList'
export default function Home() {
  return (
    <div>
      <div>
        <Link to='/account'>Account</Link>
      </div>
      <div>
        <Link to='/cart'>Shopping Cart</Link>
      </div>
      <CategoryList />
      <Products />
    </div>
  )
}
