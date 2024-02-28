import { Avatar, Dropdown, Navbar } from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'
import { FaRegUser } from 'react-icons/fa6'
import { FaCat } from 'react-icons/fa6'
import { BsBag } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import { Modal } from 'flowbite-react'
import { useState } from 'react'

import { useGetUserQuery } from '../../services/auth'
import { AppState } from '../../app/store'
import { logOut } from '../user/userSlice'
import logo from '../../images/logo.png'
import { selectAllCategories } from '../category/categorySlice'
import { ModalProps } from '../cart/AddToCart'
import ThemeToggle from './ThemeToggle'
import { useTheme, ThemeContextType } from '../../services/ThemeContext'

const CategoryModal = ({ openModal, setOpenModal }: ModalProps) => {
  const categories = useSelector(selectAllCategories)

  return (
    <Modal
      show={openModal}
      position='top-left'
      onClose={() => setOpenModal(false)}
      className='max-w-56 bg-opacity-0 pt-8'
    >
      <Modal.Header className='bg-opacity-0'>Category</Modal.Header>
      <Modal.Body>
        <div className='grid gap-2'>
          {categories &&
            categories.map((cate) => (
              <Link to={`/shop/${cate.id}`} onClick={() => setOpenModal(false)}>
                {cate.name}
              </Link>
            ))}
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default function Nav() {
  const { isLoggedIn } = useSelector((state: AppState) => state.user)
  const { data, error, isLoading } = useGetUserQuery()
  const [openModal, setOpenModal] = useState(false)

  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <Navbar fluid rounded className='z-50 pt-6  dark:bg-black'>
      <Navbar.Collapse>
        <Navbar.Link className='text-xl dark:text-white'>
          <button onClick={() => setOpenModal(true)}>Shop</button>
        </Navbar.Link>
        <Navbar.Link href='/product' className='text-xl dark:text-white'>
          All
        </Navbar.Link>
      </Navbar.Collapse>
      <Navbar.Brand href='/' className='flex gap-4'>
        <FaCat className='fill-purple-500' size={28} />
        <h2 className='text-black dark:text-white'>Catagonia</h2>
      </Navbar.Brand>

      <div className='flex md:order-2 gap-8'>
        <div className='md:hidden dark:text-white flex flex-col justify-center'>
          <button onClick={() => setOpenModal(true)}>Shop</button>
          <CategoryModal openModal={openModal} setOpenModal={setOpenModal} />
        </div>
        <a
          href='/cart'
          className='flex flex-col justify-center dark:text-white'
        >
          <BsBag size={22} />
        </a>
        {!isLoggedIn && (
          <a
            href='/account'
            className='flex flex-col justify-center dark:text-white'
          >
            <FaRegUser size={22} />
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
        <ThemeToggle />
      </div>
      <CategoryModal openModal={openModal} setOpenModal={setOpenModal} />
    </Navbar>
  )
}
