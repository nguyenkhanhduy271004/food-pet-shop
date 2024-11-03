import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, ProductOutlined, SettingOutlined, AppstoreAddOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

import './MenuList.scss';
import Category from '../../pages/Category/Category';

function MenuList({ darkTheme }) {
    const location = useLocation();

    const menuItems = [
        {
            key: '/',
            icon: <HomeOutlined />,
            label: <Link to="/">Dashboard</Link>,
        },
        {
            key: '/add',
            icon: <AppstoreAddOutlined />,
            label: <Link to="/add">Add</Link>,
        },
        {
            key: '/list',
            icon: <ProductOutlined />,
            label: <Link to="/list">Products</Link>,
        },
        {
            key: '/categories',
            icon: <ProductOutlined />,
            label: <Link to="/categories">Categories</Link>,
        },
        {
            key: '/orders',
            icon: <ShoppingCartOutlined />,
            label: <Link to='/orders'>Orders</Link>
        },
    ];

    return (
        <Menu
            theme={darkTheme ? 'dark' : 'light'}
            mode='inline'
            className='menu-bar'
            selectedKeys={[location.pathname]}
            items={menuItems}
        />
    );
}

export default MenuList;
