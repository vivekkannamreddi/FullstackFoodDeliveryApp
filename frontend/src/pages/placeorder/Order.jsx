import React, { useContext, useEffect, useState } from 'react'
import './Order.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Order = () => {
  const {getTotalCartAmount,token,food_list,cartItems,url} =useContext(StoreContext)
  const [data,setData] = useState({
    firstname:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zip:"",
    country:"",
    phone:""
  })

  const onChangeHandler=(event)=>{
    const name  = event.target.name;
    const value  = event.target.value;
    setData(data=>({...data,[name]:value}));
  }
  const placeorder =async(event)=>{
    event.preventDefault();
    let orderItems =[];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo);
      }

    })
    let orderdata = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,

    }
    let response = await axios.post(url+"/api/order/place",orderdata,{headers:{token}})
    if(response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("error")
    }
  }
const navigate = useNavigate();
  useEffect(()=>{
    if(!token){
      navigate('/cart');
    }
    else if(getTotalCartAmount()===0){
      navigate('/cart');
    }
  },[token])

  return (
    <form onSubmit={placeorder} className='place-order'>
      <div className="place-order-left">
          <p className='title'>Delivery Information</p>

          <div className="multi-feilds">
            <input required name='firstname' onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First name'/>
            <input required name='lastname' onChange={onChangeHandler} value={data.lastname} type="text" placeholder='Last name'/>
          </div>

          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Enter yout email'/>
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>

          <div className="multi-feilds">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
          </div>

          <div className="multi-feilds">
            <input required name='zip' onChange={onChangeHandler} value={data.zip} type="text" placeholder='Zip code'/>
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="tel" placeholder='Phone' />

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
          <button type="submit" >PROCEED TO PAYMENT</button>
         </div>
        </div>
    </form>
  )
}

export default Order