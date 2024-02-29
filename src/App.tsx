import { useEffect, useState } from 'react'
import Home from './pages/home/Home'
import { Routes, Route, Navigate } from 'react-router-dom'

import Profile from './pages/account/Profile'
import Cart from './pages/cart/Cart'
import SingleProductPage from './pages/products/SingleProductPage'
import CategoryPage from './pages/category/CategoryPage'
import { useSelector } from 'react-redux'
import { AppState } from './app/store'
import PrivateRoute from './components/PrivateRoute'
import Auth from './pages/account/Auth'
import { useGetRefreshTokenMutation } from './services/auth'
import Nav from './components/header/Header'
import Products from './pages/products/Products'
import { useTheme } from './services/ThemeContext'

function App() {
  const [refreshToken] = useGetRefreshTokenMutation()
  const { isLoggedIn, token } = useSelector((state: AppState) => state.user)

  const { theme } = useTheme()

  useEffect(() => {
    if (!isLoggedIn) {
      refreshToken({ refreshToken: token?.refresh_token ?? '' })
    }
  }, [token])

  return (
    <div className={` ${theme} `}>
      <div className=' dark:bg-black'>
        <div className='container'>
          <Nav />
          <div className='py-8 md:py-12  dark:bg-black'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/shop' element={<Navigate to={'/'} />}></Route>
              <Route path='/product' element={<Products />}></Route>
              <Route
                path='/product/:productId'
                element={<SingleProductPage />}
              />
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
      </div>
    </div>
  )
}

export default App
