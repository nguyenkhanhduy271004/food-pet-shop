import React from 'react'
import './Footer.scss'
import { assets } from '../../assets/assets'

function Footer() {
    return (
        <div className='footer' id='footer'>
            <div className="footer-container">
                <div className="footer-content-left">
                    <img className='logo' src={assets.logo} alt="" />
                    <p>Welcome to my food pet shop web</p>
                    <div className="footer-social-icons">
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-right">
                    <h2>COMPANY</h2>
                    <ul style={{ padding: '0' }}>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className="footer-content-center">
                    <h2>GET IN TOUCH</h2>
                    <ul style={{ padding: 0 }}>
                        <li>SĐT: 0903525012</li>
                        <li>contact@cafeshop.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">Copyright 2024 © foodpetshop.com - All Righ Reserved.</p>
        </div>
    )
}

export default Footer
