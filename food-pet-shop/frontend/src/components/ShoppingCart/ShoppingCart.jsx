import React, { useEffect } from 'react';
import { Table, Button, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

function ShoppingCart({ handleClickCheckOut, loading, removeFromCart, getTotalCartAmount, dataSource, setCurStep }) {
    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => {
                const imageUrl = text ? text.split(',')[0] : '';
                return <img src={imageUrl} alt="product" style={{ width: 50 }} />;
            },
        },
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `${text}.000 vnđ`,
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            render: (text) => `${text}.000 vnđ`,
        },
        {
            title: '',
            key: 'action',
            render: (text, record) => (
                <Button type='primary' onClick={() => removeFromCart(record.key)} danger>
                    <DeleteOutlined />
                </Button>
            ),
        },
    ];


    return (
        <div>
            <Row>
                <Col span={16}>
                    <Table dataSource={dataSource} columns={columns} pagination={true} loading={loading} />
                </Col>
                <Col span={8}>
                    <div className="cart-bottom">
                        <div className="cart-total">
                            <h2>Cart Totals</h2>
                            <div>
                                <div className="cart-total-details">
                                    <p>Subtotal</p>
                                    <p>{getTotalCartAmount()}.000 vnđ</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <p>Delivery Fee</p>
                                    <p>{0}</p>
                                </div>
                                <hr />
                                <div className="cart-total-details">
                                    <b>Total: </b>
                                    <b>{getTotalCartAmount()}.000 vnđ</b>
                                </div>
                                <Button className='checkout-btn' type="primary" onClick={handleClickCheckOut}>PLEASE TO CHECKOUT</Button>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ShoppingCart;
