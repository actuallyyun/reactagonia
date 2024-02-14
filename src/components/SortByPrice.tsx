import { ChangeEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { sortByPrice } from './product/productSlice'

export default function SortByPrice() {
  const dispatch = useDispatch()
  const [sortMethod, setSortMethod] = useState('')
  console.log({ sortMethod })
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortMethod(e.target.value)
    dispatch(sortByPrice(e.target.value))
  }
  return (
    <div className='max-w-sm mx-auto'>
      <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        Select an option
      </label>
      <select
        value={sortMethod}
        onChange={handleSort}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        <option selected value='default'>
          Default
        </option>
        <option value='ascending'>Price(low to high)</option>
        <option value='descending'>Price(high to low)</option>
        <option value='newest'>Newest</option>
      </select>
    </div>
  )
}
