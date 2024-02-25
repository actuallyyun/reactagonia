import React, { useEffect } from 'react'
import Home from './pages/home/Home'
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom'

import Shop from './pages/products/Shop'
import Profile from './pages/account/Profile'
import Cart from './pages/cart/Cart'
import SingleProductPage from './pages/product/SingleProductPage'
import CategoryPage from './pages/category/CategoryPage'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from './app/store'
import PrivateRoute from './components/PrivateRoute'
import Auth from './pages/account/Auth'
import Login from './pages/account/Login'
import {
  useGetUserQuery,
  useLoginMutation,
  useGetRefreshTokenMutation
} from './services/auth'
import { selectCurrentUser } from './components/user/userSlice'
import Nav from './components/header/Header'

function App() {
  const [refreshToken] = useGetRefreshTokenMutation()

  const user = useSelector(selectCurrentUser)
  console.log({ user })

  const dispatch = useDispatch()
  const { isLoggedIn, token } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (!isLoggedIn) {
      refreshToken({ refreshToken: token?.refresh_token ?? '' })
    }
  }, [token])

  return (
    <div className='container py-4 mx-auto'>
      <Nav />
      <div className='md:max-w-lg px-4 md:px-16'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/shop' element={<Navigate to={'/'} />}></Route>
          <Route path='/product' element={<Navigate to={'/'} />}></Route>
          <Route path='/product/:productId' element={<SingleProductPage />} />
          <Route path='/shop/:categoryId' element={<CategoryPage />} />
          <Route
            path='/account'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='/auth'
            element={isLoggedIn ? <Navigate to={'/account'} /> : <Auth />}
          ></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
