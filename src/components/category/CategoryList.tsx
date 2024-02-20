import { Link } from 'react-router-dom'

import { useGetCategoriesQuery } from '../../services/fakeStore'

export default function CategoryList() {
  const { data, error, isLoading } = useGetCategoriesQuery()
  const categories = data
  return (
    <div>
      {categories &&
        categories.map((c) => <Link to={`/category/${c.id}`}>{c.name}</Link>)}
    </div>
  )
}
