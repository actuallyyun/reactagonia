import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import { AppState } from '../../app/store'

type Prop = {
  children: JSX.Element
}

const PrivateRoute = ({ children }: Prop) => {
  const { isLoading, isLoggedIn } = useSelector((state: AppState) => state.user)

  if (isLoading) return null

  return isLoggedIn ? children : <Navigate to='/auth' replace />
}

export default PrivateRoute
