import React, { useContext } from 'react';
import { Space, Typography, Col, Row } from 'antd';
import { ShoppingCartOutlined, ShoppingOutlined, UserOutlined, DollarOutlined } from '@ant-design/icons';


import DashboardCard from '../../components/DashboardCard/DashboardCard';
import RecentOrders from '../../components/RecentOrders/RecentOrders';
import { StoreContext } from '../../context/StoreContext';
import './Dashboard.scss';
import DashboardChart from '../../components/DashboardChart/DashboardChart';


function Dashboard() {
    const { orders, revenue, productList, users } = useContext(StoreContext)

    return (
        <div className='dashboard'>
            <Typography.Title level={2}>Dashboard</Typography.Title>
            <div className="dashboard-container">
                <Space direction='horizontal'>
                    <DashboardCard
                        className="dashboard-card"
                        icon={<ShoppingCartOutlined
                            style={{
                                color: '#fff',
                                backgroundColor: 'rgba(0,255,0,0.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8
                            }} />}
                        title={'Orders'} value={orders.length} color={'#1d62f0'}
                    />
                    <DashboardCard
                        className="dashboard-card"
                        icon={<ShoppingOutlined
                            style={{
                                color: '#fff',
                                backgroundColor: 'rgba(0,0,255,0.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8
                            }} />}
                        title={'Inventory'} value={productList.length} color={'#ff646d'}
                    />
                    <DashboardCard
                        className="dashboard-card"
                        icon={<UserOutlined
                            style={{
                                color: '#fff',
                                backgroundColor: 'rgba(0,255,255,0.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8
                            }} />}
                        title={'Customer'} value={users.length} color={'#fbad4c'}
                    />
                    <DashboardCard
                        className="dashboard-card"
                        icon={<DollarOutlined
                            style={{
                                color: '#fff',
                                backgroundColor: 'rgba(255,0,0,0.25)',
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8
                            }} />}
                        title={'Revenue'} value={revenue} color={'#59d05d'}
                    />
                </Space>
            </div>
            <div style={{ marginTop: '30px' }}>
                <Typography.Title level={4}>Recent Orders</Typography.Title>
                <Row>
                    <Col span={12}>
                        <RecentOrders />
                    </Col>
                    <Col span={12}>
                        <DashboardChart orders={orders} />
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Dashboard;
