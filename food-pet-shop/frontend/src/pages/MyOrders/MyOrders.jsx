import React, { useContext, useEffect, useState } from 'react';
import { Select, Modal, Table, Image, Divider, Pagination, Card, Row, Col, Button } from 'antd';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './MyOrders.scss';
import axios from 'axios';

function MyOrders() {
    const { url, token } = useContext(StoreContext);

    const [itemDetail, setItemDetail] = useState({ address: {}, items: [] });
    const [modalDetails, setModalDetails] = useState(false);
    const [dataOrders, setDataOrders] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (images) =>
                <Image
                    width={50}
                    src={images && images.length > 0 ? `${url}/images/${images[0]}` : ''}
                />,
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
            render: (text) => <span>{text}.000vnđ</span>,
        },
    ];

    const fetchOrders = async () => {
        try {
            const response = await axios.post(
                url + '/api/order/userorders',
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    withCredentials: true
                }
            );
            if (response.data.success) {
                setDataOrders(response.data.data);
                setData(response.data.data);
            } else {
                console.log('No order found');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickViewDetails = (item) => {
        setItemDetail(item);
        setModalDetails(true);
    };

    const handleSelectChange = (value) => {
        setSortBy(value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (token) {
            fetchOrders();
        }
    }, [token]);

    useEffect(() => {
        if (!sortBy) {
            setDataOrders(data);
        } else {
            setDataOrders(data.filter(order => order.status === sortBy));
        }

    }, [sortBy]);

    const handlePaginationChange = (page, pageSize) => {
        setCurrentPage(page);
        setPageSize(pageSize);
    };

    return (
        <>
            <div className='my-orders'>
                <h2>My Orders</h2>
                <div className="container">
                    <div className='sort-container'>
                        <div className="sort-input">
                            <Select
                                onChange={handleSelectChange}
                                defaultValue="Featured"
                                style={{
                                    width: 200,
                                }}
                                allowClear
                                options={[
                                    {
                                        value: 'Product Processing',
                                        label: 'Processing'
                                    },
                                    {
                                        value: 'Out for delivery',
                                        label: 'Out for delivery'
                                    },
                                    {
                                        value: 'Delivered',
                                        label: 'Delivered'
                                    },
                                ]}
                            />
                        </div>
                    </div>

                    <Row gutter={[16, 16]}>
                        {dataOrders
                            .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                            .map((order, index) => (
                                <Col key={index} span={24}>
                                    <Card>
                                        <Row>
                                            <Col span={4}>
                                                <img src={assets.parcel_icon} alt="Parcel Icon" style={{ width: '50px' }} />
                                            </Col>
                                            <Col span={16}>
                                                <p><strong>Items:</strong> {order.items.map((item, i) => item.name + ' x ' + item.quantity).join(', ')}</p>
                                                <p><strong>Total:</strong> {order.amount}.000vnđ</p>
                                                <p><strong>Status:</strong> <span>&#x25cf;</span> <b>{order.status}</b></p>
                                            </Col>
                                            <Col span={4}>
                                                <Button onClick={() => handleClickViewDetails(order)}>View Details</Button>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            ))}
                    </Row>

                    <Divider />

                    <Pagination
                        current={currentPage}
                        pageSize={pageSize}
                        total={dataOrders.length}
                        onChange={handlePaginationChange}
                        showSizeChanger
                    />
                </div>
            </div>

            <Modal
                title='Order Details'
                open={modalDetails}
                footer={null}
                width={800}
                centered
                onCancel={() => setModalDetails(false)}
            >
                <div className='order-details-container'>
                    <Table columns={columns} dataSource={itemDetail.items} pagination={false} />
                    {/* <Divider /> */}
                    <div className='infor-container'>
                        <div className='infor-details-container'>
                            <div className='left'>Name:</div>
                            <div className='right'>{itemDetail.address.name}</div>
                        </div>
                        <div className='infor-details-container'>
                            <div className='left'>Address:</div>
                            <div className='right'>{itemDetail.address.address}</div>
                        </div>
                        <div className='infor-details-container'>
                            <div className='left'>Phone:</div>
                            <div className='right'>{itemDetail.address.phone}</div>
                        </div>
                        <div className='infor-details-container'>
                            <div className='left'>Total:</div>
                            <div className='right' style={{ fontWeight: 600 }}>{itemDetail.amount}.000vnđ</div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default MyOrders;
