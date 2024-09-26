import React from 'react'
import './Header.scss'

function Header() {
    return (
        <div className="header-wrapper">
            <div className='header'>
                <div className="header-contents">
                    <h2>Welcome to PetFoodMart</h2>
                    <p>Order your food for pet easily and get it delivered to your doorstep</p>
                    <button><a href="#explore-menu">View Menu</a></button>
                </div>
            </div>
        </div>
    )
}

export default Header
