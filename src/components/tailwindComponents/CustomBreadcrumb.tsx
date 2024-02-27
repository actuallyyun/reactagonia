import { Breadcrumb } from 'flowbite-react'
import { HiHome } from 'react-icons/hi'
import { IoIosArrowForward } from 'react-icons/io'

export default function CustomBreadcrumb({
  page
}: {
  page: { location: string; path: string }
}) {
  return (
    <Breadcrumb aria-label='Default breadcrumb example'>
      <Breadcrumb.Item href='/' icon={HiHome}>
        Home
      </Breadcrumb.Item>

      <Breadcrumb.Item href={`/shop/${page.path}`}>
        {page.location}
      </Breadcrumb.Item>
    </Breadcrumb>
  )
}
