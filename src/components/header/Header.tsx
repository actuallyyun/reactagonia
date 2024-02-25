import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegUser } from 'react-icons/fa6'
import { FaCat } from 'react-icons/fa6'
import { BsBag } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { useGetUserQuery } from '../../services/auth'
import { AppState } from '../../app/store'
import { logOut } from '../user/userSlice'
import logo from '../../images/logo.png'
import { selectAllCategories } from '../category/categorySlice'

export const CategoryDropDown = () => {
  const categories = useSelector(selectAllCategories)
  return (
    <Dropdown arrowIcon={false} inline label='Shop'>
      {categories &&
        categories.map((cat) => {
          return (
            <Dropdown.Item>
              <Link to={`/shop/${cat.id}`}>{cat.name}</Link>
            </Dropdown.Item>
          )
        })}
    </Dropdown>
  )
}

export default function Nav() {
  const { isLoggedIn, token } = useSelector((state: AppState) => state.user)
  const { data, error } = useGetUserQuery()

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <Navbar fluid rounded className='px-4 md:px-16'>
      <Navbar.Collapse>
        <Navbar.Link href='/' active>
          Home
        </Navbar.Link>

        <CategoryDropDown />

        <Navbar.Link href='/shop'>All</Navbar.Link>
      </Navbar.Collapse>
      <Navbar.Brand href='/' className='flex gap-4'>
        <FaCat className='fill-purple-500' size={28} />
        <span className='hidden'>Catagonia Home page</span>
        <figure aria-hidden='true'>
          <img src={logo} alt='Catagonia logo' width='150px' />
        </figure>
      </Navbar.Brand>

      <div className='flex md:order-2 gap-8'>
        <div className='inline-flex md:hidden'>
          <CategoryDropDown />
        </div>
        <a href='/cart'>
          <BsBag size={18} />
        </a>
        {!isLoggedIn && (
          <a href='/account'>
            <FaRegUser size={16} />
          </a>
        )}
        {isLoggedIn && (
          <Dropdown
            arrowIcon={false}
            inline
            label={<Avatar alt='User settings' img={data?.avatar} rounded />}
          >
            <Dropdown.Header>
              <span className='block text-sm'>{data?.name}</span>
              <span className='block truncate text-sm font-medium'>
                {data?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item href='/account'>Account</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
      </div>
    </Navbar>
  )
}
