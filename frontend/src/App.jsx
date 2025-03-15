import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Home from './pages/home/Home'
import Cart from './pages/cart/Cart'
import Order from './pages/placeorder/Order'
import Footer from './components/Footer/Footer'
import Loginpopup from './components/LoginPopup/Loginpopup'
import Verify from './pages/verify/Verify'
import Myorders from './pages/myorders/Myorders'


const App = () => {
  const [showlogin , setShowlogin] = useState(false);
  return (
    <>
    {showlogin?<Loginpopup setShowlogin={setShowlogin}/>:<></>}
    <div className='app'>
      <Navbar setShowlogin={setShowlogin}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/Order' element={<Order/>}/>
        <Route path='/verify' element={<Verify/>}/>
        <Route path='/myorders' element={<Myorders/>}/>

      </Routes>
    </div>
    <Footer/>
    </>
    
  )
}

export default App

