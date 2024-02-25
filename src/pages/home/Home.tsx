import { Link } from 'react-router-dom'

import Products from '../../components/product/Products'
import CategoryList from '../../components/category/CategoryList'
import HeroWithImage from '../../components/tailwindComponents/HeroWithImage'

export default function Home() {
  return (
    <div className=''>
      <HeroWithImage />
      <CategoryList />
      <h1>Products</h1>
      <Products />
    </div>
  )
}
