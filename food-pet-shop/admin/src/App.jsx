import React, { useContext, useState } from 'react';
import { Button, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, LogoutOutlined } from '@ant-design/icons';
import { Routes, Route, useNavigate } from 'react-router-dom';

import Logo from './components/Logo/Logo';
import MenuList from './components/MenuList/MenuList';
import ToggleThemeButton from './components/ToggleThemeButton/ToggleThemeButton';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx'
import { StoreContext } from './context/StoreContext.jsx'
import './App.css';
import Add from './pages/Add/Add';
import List from './pages/List/List';
import Dashboard from './pages/Dashboard/Dashboard';
import Orders from './pages/Orders/Orders';
import Category from './pages/Category/Category';
import Login from './pages/Login/Login';
import Error from './components/Error/Error';

const { Header, Sider, Content } = Layout;

function App() {
  const url = 'http://localhost:4000';
  const [darkTheme, setDarkTheme] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const { setToken, isLogin } = useContext(StoreContext);
  const navigate = useNavigate();

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  const handleLogin = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }

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
        <Header className='site-layout-background' style={{ padding: 0, background: colorBgContainer, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button className='toggle' onClick={toggleCollapsed}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <>
            {!isLogin ? <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogout} style={{ marginRight: '16px' }}>
              Logout
            </Button> :
              <Button type="primary" icon={<LogoutOutlined />} onClick={handleLogin} style={{ marginRight: '16px' }}>
                Login
              </Button>
            }
          </>
        </Header>
        <Content style={{ margin: '24px 16px 0' }}>
          <Routes>
            <Route path='/error' element={<Error />} />
            <Route path='/login' element={<Login />} />
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Dashboard url={url} />
                </PrivateRoute>
              }
            />
            <Route
              path='/list'
              element={
                <PrivateRoute>
                  <List url={url} />
                </PrivateRoute>
              }
            />
            <Route
              path='/orders'
              element={
                <PrivateRoute>
                  <Orders url={url} />
                </PrivateRoute>
              }
            />
            <Route
              path='/categories'
              element={
                <PrivateRoute>
                  <Category url={url} />
                </PrivateRoute>
              }
            />
            <Route
              path='/add'
              element={
                <PrivateRoute>
                  <Add url={url} />
                </PrivateRoute>
              }
            />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
