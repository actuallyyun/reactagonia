import { Link } from 'react-router-dom'

import Products from '../../components/product/Products'
import CategoryList from '../../components/category/CategoryList'
export default function Home() {
  return (
    <div className='pt-4 pb-2 md:pt-12 md:pb-6'>
      <CategoryList />
      <h1>Products</h1>
      <Products />
    </div>
  )
}
