import { Navigate, Outlet } from 'react-router-dom'

import { User } from '../misc/type'

type ProtectedRouteProp = {
  user: User | null
  redirectPath: string
  children: JSX.Element
}
const ProtectedRoute = ({
  user,
  redirectPath,
  children
}: ProtectedRouteProp) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />
  }
  return children ? children : <Outlet />
}

export default ProtectedRoute
