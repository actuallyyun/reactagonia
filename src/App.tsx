import React, { useEffect } from 'react'
import './App.css'
import Home from './pages/home/Home'
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom'

import Shop from './pages/shop/Shop'
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
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/product/:productId' element={<SingleProductPage />} />
        <Route path='/category/:categoryId' element={<CategoryPage />} />
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
        <Route path='/login' element={<Login />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </div>
  )
}

export default App
