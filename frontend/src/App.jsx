import { useState } from 'react'
import Home from './pages/home/Home.jsx'
import Cart from './pages/cart/Cart.jsx'
import Order from './pages/placeorder/Order.jsx'
import Verify from './pages/verify/Verify.jsx'

function App(){
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

