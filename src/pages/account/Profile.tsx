import { useDispatch } from 'react-redux'

import { useGetUserQuery } from '../../services/auth'
import { logOut } from '../../components/user/userSlice'
import CreateProductForm from '../../components/product/CreateProductForm'

export default function Profile() {
  const { data, error } = useGetUserQuery()
  console.log({ data, error })
  const dispatch = useDispatch()

  const handleLogOut = () => {
    dispatch(logOut())
  }

  return (
    <>
      <h1>profile</h1>
      {data && (
        <div>
          <p>{data.name}</p>
          <p>{data.email}</p>
        </div>
      )}
      <button onClick={handleLogOut}>log out</button>
      <CreateProductForm />
    </>
  )
}
