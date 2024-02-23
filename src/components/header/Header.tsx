import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'

import { useGetUserQuery } from '../../services/auth'
import { AppState } from '../../app/store'
import { logOut } from '../user/userSlice'

export default function Nav() {
  const { isLoggedIn, token } = useSelector((state: AppState) => state.user)
  const { data, error } = useGetUserQuery()

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <Navbar fluid rounded>
      <Navbar.Brand href='/'>
        <img
          src='/favicon.svg'
          className='mr-3 h-6 sm:h-9'
          alt='Flowbite React Logo'
        />
        <span className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          Catagonia
        </span>
      </Navbar.Brand>
      {!isLoggedIn && (
        <div className='flex md:order-2'>
          <a href='/account'>Account</a>
        </div>
      )}
      {isLoggedIn && (
        <div className='flex md:order-2'>
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
          <Navbar.Toggle />
        </div>
      )}
      <Navbar.Collapse>
        <Navbar.Link href='/' active>
          Home
        </Navbar.Link>
        <Navbar.Link href='/category'>Category</Navbar.Link>
        <Navbar.Link href='#'>Services</Navbar.Link>
        <Navbar.Link href='#'>Pricing</Navbar.Link>
        <Navbar.Link href='/cart'>Shopping Cart</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  )
}
