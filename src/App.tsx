import React from "react";
import "./App.css";
import Home from './pages/home/Home'
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom'

import Shop from './pages/shop/Shop'
import Profile from './pages/account/Profile'
import Cart from './pages/cart/Cart'
import SingleProductPage from './pages/product/SingleProductPage'
import CategoryPage from './pages/category/CategoryPage'
import { useSelector } from 'react-redux'
import { AppState } from './app/store'
import ProtectedRoute from './components/ProtectedRoute'
import Auth from './pages/account/Auth'
import Login from './pages/account/Login'

function App() {
  const user = useSelector((state: AppState) => state.user.user)
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
            <ProtectedRoute user={user} redirectPath='/auth'>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path='/auth' element={<Auth />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </div>
  )
}

export default App;
