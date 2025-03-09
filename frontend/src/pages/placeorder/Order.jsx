import React, { useContext } from 'react'
import './Order.css'
import { StoreContext } from '../../context/StoreContext'

const Order = () => {
  const {getTotalCartAmount} =useContext(StoreContext)
  return (
    <form className='place-order'>
      <div className="place-order-left">
          <p className='title'>Delivery Information</p>

          <div className="multi-feilds">
            <input type="text" placeholder='First name'/>
            <input type="text" placeholder='Last name'/>
          </div>

          <input type="email" placeholder='Enter yout email'/>
          <input type="text" placeholder='Street'/>

          <div className="multi-feilds">
            <input type="text" placeholder='City'/>
            <input type="text" placeholder='State'/>
          </div>

          <div className="multi-feilds">
            <input type="text" placeholder='Zip code'/>
            <input type="text" placeholder='Country'/>
          </div>
          <input type="tel" placeholder='Phone' />

      </div>
      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
                <p>Subtotal</p>
                <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <p>Delivery Fee</p>
                <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
                <b>Total</b>
                <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            
          </div>
          <button onClick={()=>navigate('/Order')}>PROCEED TO PAYMENT</button>
         </div>
        </div>
    </form>
  )
}

export default Order