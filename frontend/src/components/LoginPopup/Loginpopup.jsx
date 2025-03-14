import React, { useContext, useEffect, useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/frontend_assets/assets'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'



const Loginpopup = ({setShowlogin}) => {
  const {url,setToken} = useContext(StoreContext)
  const [currentstate , setCurrentstate] = useState("signUp")
  const [data , setData] = useState({
    name:"",
    password:"",
    email:""
  })
  const onChangeHandler = (event)=>{
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  }

  const onLogin = async (event)=>{
    event.preventDefault()
    let newUrl = url;
    if(currentstate==="Login"){
      newUrl +="/api/user/login"
    }
    else{
      newUrl +="/api/user/register"
    }
    const response = await axios.post(newUrl,data)
    if(response.data.success){
      setToken(response.data.token);
      localStorage.setItem("token",response.data.token);
      setShowlogin(false);
    }
    else{
      alert(response.data.message);
    }

  }
  
  return (
    <div className='login-popup'>
        <form  onSubmit={onLogin} className="login-popup-container">
          <div className="login-popup-title">
            <h2>{currentstate}</h2>
            <img onClick={()=>setShowlogin(false)} src={assets.cross_icon}></img>
          </div>
          <div className="login-popup-input">
            {currentstate==="Login"?<><input type="email" name='email' onChange={onChangeHandler} value = {data.email} placeholder='enter your email' required />
              <input type="password" name='password'  onChange={onChangeHandler} value = {data.password} placeholder='enter your password' required />
              </>
              :<>
              <input type="text" name='name' onChange={onChangeHandler} value = {data.name} placeholder='enter your name' required />
              <input type="email" name='email' onChange={onChangeHandler} value = {data.email} placeholder='enter your email' required />
              <input type="password" name='password' onChange={onChangeHandler} value = {data.password} placeholder='enter your password' required /></>}
            
          </div>
          <button type='submit'>{currentstate==="signUp"?"Create account":"Login"}</button>
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing , i agree to the terms of use & privacy policy</p>
          </div>
          {currentstate==="Login"
          ?<><p>create new account? <span onClick={()=>setCurrentstate("signUp")}>register here </span></p></>
          :<><p>Already have an account? <span onClick={()=>setCurrentstate("Login")}>login here </span></p></>}
          
          
        </form>
    </div>
  )
}

export default Loginpopup