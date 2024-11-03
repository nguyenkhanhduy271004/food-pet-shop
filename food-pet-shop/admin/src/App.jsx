import React, { useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Routes, Route } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import MenuList from './components/MenuList/MenuList';
import ToggleThemeButton from './components/ToggleThemeButton/ToggleThemeButton';
import './App.css';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import Category from './pages/Category/Category';

const { Header, Sider, Content } = Layout;

function App() {
  const url = 'http://localhost:4000';
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const colorBgContainer = darkTheme ? '#001529' : '#FFFFFF';

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={toggleCollapsed}
        theme={darkTheme ? 'dark' : 'light'}
        className='sidebar'
      >
        <Logo />
        <MenuList darkTheme={darkTheme} />
        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: 0, background: colorBgContainer }}>
          <Button className='toggle' onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Routes>
            <Route path='/' element={<Dashboard url={url} />} />
            <Route path='/add' element={<Add url={url} />} />
            <Route path='/list' element={<List url={url} />} />
            <Route path='/orders' element={<Orders url={url} />} />
            <Route path='/categories' element={<Category url={url} />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
