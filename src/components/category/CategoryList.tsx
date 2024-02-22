import { Link } from 'react-router-dom'

import { useGetCategoriesQuery } from '../../services/fakeStore'
import CategoryCard from './CategoryCard'

export default function CategoryList() {
  const { data, error, isLoading } = useGetCategoriesQuery()
  const categories = data
  return (
    <div className='grid gap-4 grid-cols-5 grid-rows-auto'>
      {categories &&
        categories.map((c) => (
          <Link to={`/category/${c.id}`}>
            <CategoryCard category={c} />
          </Link>
        ))}
    </div>
  )
}
