import { useDispatch } from 'react-redux'
import { Button } from 'flowbite-react'

import { useGetUserQuery } from '../../services/auth'
import { logOut } from '../../components/user/userSlice'
import CreateProductForm from '../../components/product/CreateProductForm'

export default function Profile() {
  const { data, error } = useGetUserQuery()
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <div className='flex flex-col justify-center gap-4 pt-4'>
      <h3 className='text-center'>Account</h3>
      <div className='grid md:grid-cols-2 gap-4 '>
        <div className='bg-gray-200 rounded-lg py-12 px-8 grid gap-4'>
          <h4>Profile</h4>
          {data && (
            <div className='grid gap-4 '>
              <p className='text-gray-400'>
                <strong>Name</strong>
              </p>
              <p>{data.name}</p>
              <p className='text-gray-400'>
                <strong>Email</strong>
              </p>
              <p>{data.email}</p>
              <p className='text-gray-400'>
                <strong>Password</strong>
              </p>
              <p>********</p>
              <Button onClick={handleLogOut} color='dark' size='lg' pill>
                Log out
              </Button>
            </div>
          )}
        </div>
        <CreateProductForm />
      </div>
    </div>
  )
}
