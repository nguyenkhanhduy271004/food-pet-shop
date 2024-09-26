import React, { useState, useContext, useEffect } from 'react'
import { Select, Modal, Table, Image, Divider } from 'antd';

import './Orders.scss'
import { StoreContext } from '../../context/StoreContext'
import { assets } from '../../assets/assets'
import axios from 'axios'

function Orders() {
    const { url, orders, fetchDataOrders } = useContext(StoreContext)
    const [modalDetails, setModalDetails] = useState(false)
    const [itemDetail, setItemDetail] = useState({ address: {}, items: [] })
    const [dataOrders, setDataOrders] = useState([])
    const [sortBy, setSortBy] = useState('')

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

    const handleStatusProduct = async (e, orderId) => {
        try {
            const response = await axios.post(url + '/api/order/update-status', {
                orderId,
                status: e.target.value
            });
            if (response.data.success) {
                await fetchDataOrders()
            } else {
                console.log('Error updating order status');
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
        if (sortBy) {
            setDataOrders(orders.filter(order => order.status === sortBy));
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
            <div className='order-add'>
                <div>
                    <h3>Order</h3>
                    <div className='sort-container'>
                        <div className="sort-input">
                            <Select
                                onChange={handleSelectChange}
                                defaultValue=""
                                placeholder="Select Status"
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
                </div>
                <div className="order-list">
                    {dataOrders.map((order) => (
                        <div key={order._id} className='order-item'>
                            <img src={assets.parcel_icon} alt="Parcel Icon" />
                            <div>
                                <p className='order-item-food'>
                                    {order.items.map((item, index) => (
                                        <span key={index}>
                                            {item.name} x {item.quantity}
                                            {index !== order.items.length - 1 && ', '}
                                        </span>
                                    ))}
                                </p>
                                <p className="order-item-name">
                                    {order.address.name}
                                </p>
                                <div className="order-item-address">
                                    <p>{order.address.address}</p>
                                </div>
                                <p className='order-item-phone'>{order.address.phone}</p>
                            </div>
                            <p>Items: {order.items.length}</p>
                            <p>{order.amount}.000 vnđ</p>
                            <select onChange={(e) => handleStatusProduct(e, order._id)} value={order.status}>
                                <option value="Product Processing">Product Processing</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>
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
                    <Table columns={columns} dataSource={itemDetail.items.map((item, index) => ({ ...item, key: index }))} pagination={false} />
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

export default Orders;
