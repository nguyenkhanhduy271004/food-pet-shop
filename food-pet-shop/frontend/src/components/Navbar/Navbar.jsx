import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';

import './Navbar.scss';
import { assets, catCategories, dogCategories, birdCategories, turtleAndFishCategories } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

function Navbar({ setShowModalLogin }) {
    const { token, setToken, cartItems, getTotalQuantity, url } = useContext(StoreContext);
    const navigate = useNavigate();
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsHeaderVisible(false);
            } else {
                setIsHeaderVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${url}/api/user/logout`, {}, { withCredentials: true });
            if (response.data.success) {
                setToken('');
                navigate('/');
            } else {
                console.log('Log out failed');
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
    }, [cartItems, token])

    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    Tài khoản
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <Link to='/wish-list'>
                    Wish list
                </Link>
            ),
        },
        {
            key: '3',
            label: (
                <Link to='/my-orders'>
                    Đơn hàng
                </Link>
            ),
        },
        {
            key: '4',
            label: (
                <a onClick={(e) => handleLogout(e)}>
                    Logout
                </a>
            ),
        },
    ];

    return (
        <>
            {isHeaderVisible && (
                <div className="header-banner">Website chính thức của PetFoodShop</div>
            )}
            <div className={`navbar ${isHeaderVisible ? 'with-banner' : 'no-banner'}`}>
                <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-container">
                    <div className="container-fluid">
                        <Link className="navbar-brand" to="/"><img className='logo' src={assets.logo} alt="Logo" /></Link>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to="/">
                                        <div className='nav-item-span'>
                                            <span>Trang chủ</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/all-products">
                                        <div className='nav-item-span'>
                                            <span>Danh mục</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/about">
                                        <div className='nav-item-span'>
                                            <span>Giới thiệu</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/contact">
                                        <div className='nav-item-span'>
                                            <span>Liên hệ</span>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                            <div>
                                <a className="nav-link"
                                    href="tel:0903525012"
                                    style={{ marginRight: '4px', display: 'flex' }}>
                                    <img
                                        className="img-phone"
                                        src="https://w7.pngwing.com/pngs/992/122/png-transparent-ringing-telephone-computer-icons-mobile-phones-phone-ring-face-ring-text-thumbnail.png"
                                        alt="phone"
                                        width="24"
                                        height="25"
                                    />
                                    <span style={{ fontWeight: 'bold' }}>Hotline: 0903525012</span>
                                </a>
                            </div>
                            <div className="divider"></div>
                            <div className='cart-container'>
                                <ShoppingCartOutlined className='cart-icon' onClick={() => navigate('/cart')} />
                                <span className='cart-quantity'>{token ? getTotalQuantity() : 0}</span>
                            </div>
                            <div className="divider"></div>
                            {token
                                ? <Dropdown
                                    menu={{ items }}
                                    placement="bottom"
                                >
                                    <img className='profile-image' src={assets.profile_img} alt="profile-image" />
                                </Dropdown>
                                : <Button onClick={() => setShowModalLogin(true)}>Đăng nhập</Button>}
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}


export default Navbar;
