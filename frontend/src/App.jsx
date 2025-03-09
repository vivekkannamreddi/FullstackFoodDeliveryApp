import React from 'react'
import Navbar from './components/navbar/navbar'
import {BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Home from './pages/home/home'
import Cart from './pages/cart/Cart'
import Order from './pages/placeorder/Order'
import Footer from './components/Footer/Footer'


const App = () => {
  return (
    <>
    <div className='app'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/placeorder' element={<Order/>}/>
      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App