import React, { useContext, useEffect, useState } from 'react';
import { Select, Modal, Table, Image, Divider } from 'antd';
import { StoreContext } from '../../context/StoreContext';
import { assets } from '../../assets/assets';
import './MyOrders.scss';
import axios from 'axios';

function MyOrders() {
    const { url, token } = useContext(StoreContext)

    const [itemDetail, setItemDetail] = useState({ address: {}, items: [] })
    const [modalDetails, setModalDetails] = useState(false);
    const [dataOrders, setDataOrders] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) =>
                <Image
                    width={30}
                    src={text ? `${url}/images/${text}` : ''}
                />,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
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
            render: (text) => <a>{text}.000vnđ</a>,
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
    }

    const handleClickViewDetails = (item) => {
        setItemDetail(item);
        setModalDetails(!modalDetails);
    }

    const handleSelectChange = (value) => {
        setSortBy(value);
    };

    useEffect(() => {
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
                    {dataOrders.map((order, index) => (
                        <div key={index} className='my-orders-order'>
                            <img src={assets.parcel_icon} alt="" />
                            <p>{order.items.map((item, index) => {
                                if (index === order.items.length - 1) {
                                    return item.name + ' x ' + item.quantity
                                } else {
                                    return item.name + ' x ' + item.quantity + ' , '
                                }
                            })}</p>
                            <p>{order.amount}.000vnđ</p>
                            <p>Items: {order.items.length}</p>
                            <p><span>&#x25cf;</span><b>{order.status}</b></p>
                            <button onClick={() => handleClickViewDetails(order)}>View Details</button>
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                title='Đơn hàng của bạn'
                open={modalDetails}
                footer={null}
                width={800}
                centered
                onCancel={() => setModalDetails(false)}
            >
                <div className='order-details-container'>
                    <Table columns={columns} dataSource={itemDetail.items} pagination={false} />
                    <div className='infor-container'>
                        <div className='infor-details-container'>
                            <div className='left'>Họ và Tên:</div>
                            <div className='right'>{itemDetail.address.name}</div>
                        </div>
                        <div className='infor-details-container'>
                            <div className='left'>Địa chỉ:</div>
                            <div className='right'>{itemDetail.address.address}</div>
                        </div>
                        <div className='infor-details-container'>
                            <div className='left'>Số điện thoại:</div>
                            <div className='right'>{itemDetail.address.phone}</div>
                        </div>
                        <div className='infor-details-container'>
                            <div className='left'>Tổng:</div>
                            <div className='right' style={{ fontWeight: 600 }}>{itemDetail.amount}.000vnđ</div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default MyOrders;
