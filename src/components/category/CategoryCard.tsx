import { Card } from 'flowbite-react'
import { Link } from 'react-router-dom'

import { Category } from '../../misc/type'

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Card className='max-w-sm' imgAlt={category.name} imgSrc={category.image}>
      <h5 className='text-xl font-semibold tracking-tight text-gray-900 dark:text-white'>
        {category.name}
      </h5>
      <div className='flex items-center justify-between'>
        <a
          href='#'
          className='rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800'
        >
          <Link to={`/category/${category.id}`}>Shop Now</Link>
        </a>
      </div>
    </Card>
  )
}
