import React, { useContext } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';
import './ShippingDetails.scss';
import axios from 'axios';
import { StoreContext } from '../../context/StoreContext';

const ShippingDetails = ({ setCurStep }) => {
    const { url, token, productList, cartItems, getTotalCartAmount } = useContext(StoreContext); // Added cartItems
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values) => {
        try {
            const address = {
                name: values.name,
                email: values.email,
                address: values.address,
                phone: values.phone,
                note: values.note
            };
            let orderItems = [];
            productList.forEach((item) => {
                if (cartItems[item._id]) {
                    let itemInfo = { ...item };
                    itemInfo['quantity'] = cartItems[item._id];
                    orderItems.push(itemInfo);
                }
            });
            const orderData = {
                address: address,
                items: orderItems,
                amount: getTotalCartAmount()
            };
            const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token }, withCredentials: true });
            if (response.data.success) {
                setCurStep(2);
            } else {
                messageApi.open({
                    type: 'error',
                    content: 'Đặt hàng thất bại',
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Đặt hàng thất bại',
            });
        }
    };

    return (
        <>
            {contextHolder}
            <div style={{ marginTop: '20px', padding: '20px', background: '#fff', borderRadius: '8px' }}>
                <h2>Shipping Details</h2>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter your name' }]}
                            >
                                <Input placeholder="Nguyễn Khánh Duy" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Please enter your email' }]}
                            >
                                <Input placeholder="abc@gmail.com" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                name="address"
                                label="Address"
                                rules={[{ required: true, message: 'Please enter your address' }]}
                            >
                                <Input placeholder="VD: Kiệt 1/12 Hùng Vương - Đông Hà - Quảng Trị" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                name="phone"
                                label="Phone"
                                rules={[{ required: true, message: 'Please enter your phone number' }]}
                            >
                                <Input placeholder="0903525012" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item
                                name="note"
                                label="Note"
                            >
                                <Input.TextArea placeholder="Not required" autoSize={{ minRows: 3, maxRows: 6 }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};

export default ShippingDetails;
