import { Link } from 'react-router-dom'

import UserRegisterForm from '../../components/user/UserRegisterForm'

export default function Auth() {
  return (
    <>
      <p>Auth</p>
      <UserRegisterForm />
      <Link to='/login'>Login</Link>
    </>
  )
}
