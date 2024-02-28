'use client'

import { Pagination } from 'flowbite-react'
import { useState } from 'react'
type Props = {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}
export function PaginationNav({ page, setPage }: Props) {
  const onPageChange = (page: number) => setPage(page)

  return (
    <div className='flex overflow-x-auto sm:justify-center'>
      <Pagination
        layout='navigation'
        currentPage={page}
        totalPages={100}
        onPageChange={onPageChange}
        showIcons
      />
    </div>
  )
}
