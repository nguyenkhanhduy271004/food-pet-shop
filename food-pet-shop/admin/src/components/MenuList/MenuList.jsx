import React from 'react';
import { Menu } from 'antd';
import { HomeOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom';

import './MenuList.scss';

function MenuList({ darkTheme }) {
    const location = useLocation();

    return (
        <Menu
            theme={darkTheme ? 'dark' : 'light'}
            mode="inline"
            className="menu-bar"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={['products']}
        >
            <Menu.Item key="/" icon={<HomeOutlined />}>
                <Link to="/">Dashboard</Link>
            </Menu.Item>

            <Menu.SubMenu key="products" icon={<SettingOutlined />} title="Products">
                <Menu.Item key="/add">
                    <Link to="/add">Add Product</Link>
                </Menu.Item>
                <Menu.Item key="/list">
                    <Link to="/list">Product List</Link>
                </Menu.Item>
                <Menu.Item key="/categories">
                    <Link to="/categories">Categories</Link>
                </Menu.Item>
            </Menu.SubMenu>

            <Menu.Item key="/orders" icon={<ShoppingCartOutlined />}>
                <Link to="/orders">Orders</Link>
            </Menu.Item>
        </Menu>
    );
}

export default MenuList;
