import React, { useState, useContext, useEffect } from 'react';
import { Select, Modal, Table, Image, Divider, Card, Descriptions, Button, Space, Pagination } from 'antd';
import './Orders.scss';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';

function Orders() {
    const { url, orders, fetchDataOrders } = useContext(StoreContext);
    const [modalDetails, setModalDetails] = useState(false);
    const [itemDetail, setItemDetail] = useState({ address: {}, items: [] });
    const [dataOrders, setDataOrders] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => (
                <Image
                    width={50}
                    src={text ? `${url}/images/${text}` : ''}
                    alt="Product Image"
                />
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `${text}.000 vnđ`,
        },
    ];

    const handleStatusProduct = async (value, orderId) => { // Changed here
        try {
            const response = await axios.post(`${url}/api/order/update-status`, {
                orderId,
                status: value, // Directly use value
            });
            if (response.data.success) {
                await fetchDataOrders();
            } else {
                console.error('Error updating order status');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClickViewDetails = (item) => {
        setItemDetail(item);
        setModalDetails(true);
    };

    const handleSelectChange = (value) => {
        setSortBy(value);
    };

    // Pagination settings
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const pageSize = 10; // Number of orders per page

    const paginatedOrders = dataOrders.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    useEffect(() => {
        if (sortBy) {
            setDataOrders(orders.filter((order) => order.status === sortBy));
        } else {
            setDataOrders(orders);
        }
    }, [sortBy, orders]);

    useEffect(() => {
        setDataOrders(orders);
    }, [orders]);

    useEffect(() => {
        fetchDataOrders();
    }, []);

    return (
        <>
            <div className="order-add">
                <h3 style={{ marginBottom: '8px' }}>Order Management</h3>
                <Space direction="vertical" style={{ width: '100%' }}>
                    <Select
                        onChange={handleSelectChange}
                        defaultValue=""
                        placeholder="Select Status"
                        style={{ width: 200 }}
                        allowClear
                        options={[
                            { value: 'Product Processing', label: 'Processing' },
                            { value: 'Out for delivery', label: 'Out for delivery' },
                            { value: 'Delivered', label: 'Delivered' },
                        ]}
                    />

                    <div className="order-list">
                        <Space direction="vertical" style={{ width: '100%' }}>
                            {paginatedOrders.map((order) => (
                                <Card
                                    key={order._id}
                                    title={`Order ${order._id}`}
                                    extra={
                                        <Button type="link" onClick={() => handleClickViewDetails(order)}>
                                            View Details
                                        </Button>
                                    }
                                    style={{ width: '100%' }}
                                >
                                    <Descriptions column={1}>
                                        <Descriptions.Item label="Items">
                                            {order.items.map((item, index) => (
                                                <span key={index}>
                                                    {item.name} x {item.quantity}
                                                    {index !== order.items.length - 1 && ', '}
                                                </span>
                                            ))}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Customer Name">
                                            {order.address.name}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Address">
                                            {order.address.address}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Phone Number">
                                            {order.address.phone}
                                        </Descriptions.Item>
                                        <Descriptions.Item label="Total Amount">
                                            {order.amount}.000 vnđ
                                        </Descriptions.Item>
                                    </Descriptions>
                                    <Select
                                        onChange={(value) => handleStatusProduct(value, order._id)} // Changed here
                                        defaultValue={order.status}
                                        style={{ width: 200 }}
                                    >
                                        <Select.Option value="Product Processing">Product Processing</Select.Option>
                                        <Select.Option value="Out for delivery">Out for delivery</Select.Option>
                                        <Select.Option value="Delivered">Delivered</Select.Option>
                                    </Select>
                                </Card>
                            ))}
                        </Space>
                    </div>

                    {/* Pagination */}
                    <Pagination
                        current={currentPage}
                        total={dataOrders.length}
                        pageSize={pageSize}
                        onChange={handlePageChange}
                    />
                </Space>
            </div>

            <Modal
                title="Order Details"
                open={modalDetails}
                footer={null}
                width={800}
                centered
                onCancel={() => setModalDetails(false)}
            >
                <Table
                    columns={columns}
                    dataSource={itemDetail.items.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                />
                <Divider />
                <Descriptions title="Shipping Information" bordered>
                    <Descriptions.Item label="Name">{itemDetail.address.name}</Descriptions.Item>
                    <Descriptions.Item label="Address">{itemDetail.address.address}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{itemDetail.address.phone}</Descriptions.Item>
                    <Descriptions.Item label="Total Amount">
                        {itemDetail.amount}.000 vnđ
                    </Descriptions.Item>
                </Descriptions>
            </Modal>
        </>
    );
}

export default Orders;
