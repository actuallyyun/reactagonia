import React from "react";
import "./App.css";
import Home from './pages/home/Home'
import { Routes, Route } from 'react-router-dom'
import Shop from './pages/shop/Shop'
import Profile from './pages/account/Profile'
import Cart from './pages/cart/Cart'
import SingleProductPage from './pages/product/SingleProductPage'
import CategoryPage from './pages/category/CategoryPage'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/shop' element={<Shop />}></Route>
        <Route path='/product/:productId' element={<SingleProductPage />} />
        <Route path='/category/:categoryId' element={<CategoryPage />} />

        <Route path='/account' element={<Profile />}></Route>
        <Route path='/cart' element={<Cart />}></Route>
      </Routes>
    </div>
  )
}

export default App;
