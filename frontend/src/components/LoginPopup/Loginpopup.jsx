import React, { useState } from 'react'
import './Loginpopup.css'
import { assets } from '../../assets/frontend_assets/assets'
const Loginpopup = ({setShowlogin}) => {
  const [currentstate , setCurrentstate] = useState("signUp")
  return (
    <div className='login-popup'>
        <form  className="login-popup-container">
          <div className="login-popup-tile">
            <h2>{currentstate}</h2>
            <img onClick={()=>setShowlogin(false)} src={assets.cross_icon}></img>
          </div>
          <div className="login-popup-input">
            {currentstate==="Login"?<><input type="email" placeholder='enter your email' required />
              <input type="password" placeholder='enter your password' required />
              </>
              :<>
              <input type="text" placeholder='enter your name' required />
              <input type="email" placeholder='enter your email' required />
              <input type="password" placeholder='enter your password' required /></>}
            
          </div>
          <button>{currentstate==="signUp"?"Create account":"Login"}</button>
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