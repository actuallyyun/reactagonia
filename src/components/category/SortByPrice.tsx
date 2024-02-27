import { ChangeEvent } from 'react'
import { useDispatch } from 'react-redux'
import { setSortMethod } from './categorySlice'

export default function SortsByPrice() {
  const dispatch = useDispatch()
  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortMethod(e.target.value))
  }

  return (
    <div className='grid grid-flow-col grid-cols-3 items-center'>
      <label className='mb-2 text-sm font-medium text-gray-900 dark:text-white'>
        Select an option
      </label>
      <select
        onChange={handleSort}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 col-span-2'
      >
        <option defaultValue='default'>Default</option>
        <option value='ascending'>Price(low to high)</option>
        <option value='descending'>Price(high to low)</option>
        <option value='newest'>Newest</option>
      </select>
    </div>
  )
}
