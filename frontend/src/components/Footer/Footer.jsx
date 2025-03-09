import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div className='footer'>
        <div className="footer-content">
            <div className="footer-left">
                <img src={assets.hungry} alt="" />
                <p>Treat , Eat , Repeat</p>
                <div className="icons">
                    <img src={assets.facebook_icon} alt="" />
                    <img src={assets.linkedin_icon} alt="" />
                    <img src={assets.twitter_icon} alt="" />
                </div>
            </div>
            <div className="footer-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            <div className="footer-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+91 999999999</li>
                    <li>hungry@gmail.com</li>
                </ul>

            </div>
        </div>
        <hr/>
        <p className='footercopyrights'>Copyright 2022. All rights reserved.</p>
    </div>
  )
}

export default Footer