import React, { useEffect } from 'react'
import Home from './pages/home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'

import Profile from './pages/account/Profile'
import Cart from './pages/cart/Cart'
import SingleProductPage from './pages/product/SingleProductPage'
import CategoryPage from './pages/category/CategoryPage'
import { useSelector, useDispatch } from 'react-redux'
import { AppState } from './app/store'
import PrivateRoute from './components/PrivateRoute'
import Auth from './pages/account/Auth'
import {
  useGetUserQuery,
  useLoginMutation,
  useGetRefreshTokenMutation
} from './services/auth'
import { selectCurrentUser } from './components/user/userSlice'
import Nav from './components/header/Header'
import Products from './components/product/Products'

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
    <div className='container'>
      <Nav />
      <div className='mx-4 md:mx-16 py-8 md:py-12'>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/shop' element={<Navigate to={'/'} />}></Route>
          <Route path='/product' element={<Products />}></Route>
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
