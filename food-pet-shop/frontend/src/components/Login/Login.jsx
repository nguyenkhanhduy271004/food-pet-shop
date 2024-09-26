import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Checkbox, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './Login.scss';

function Login() {
    const [form] = Form.useForm();
    const [isLogin, setIsLogin] = useState(true);
    const { token, setToken } = useContext(StoreContext);
    const [messageApi, contextHolder] = message.useMessage();
    const { url, showModalLogin, setShowModalLogin } = useContext(StoreContext);

    const success = (msg) => {
        messageApi.open({
            type: 'success',
            content: msg,
        });
    };
    const error = (msg) => {
        messageApi.open({
            type: 'error',
            content: msg,
        });
    };

    const handleOk = () => {
        setShowModalLogin(false);
    };

    const handleCancel = () => {
        setShowModalLogin(false);
        form.resetFields();
    };


    const onFinish = async (values) => {
        try {
            let api = `${url}/api/user/`;
            api += isLogin ? 'login' : 'register';

            const response = await axios.post(api, {
                username: values.username,
                password: values.password
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                success(isLogin ? 'Login successful!' : 'Registration successful!');
                if (isLogin) {
                    const token = response.data.data.access_token;
                    setToken(token);
                }
                setShowModalLogin(false);
                form.resetFields();
            } else {
                error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            error('An error occurred. Please try again.');
        }
    };

    useEffect(() => { }, [isLogin]);

    return (
        <Modal
            title={isLogin ? 'Login' : 'Register'}
            open={showModalLogin}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            width={300}
            keyboard={true}
            centered
        >
            {contextHolder}
            <Form
                form={form}
                name="login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your Username!' }]}
                >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your Password!' }]}
                    hasFeedback={!isLogin}
                >
                    <Input.Password
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                {!isLogin && (
                    <Form.Item
                        name="rePassword"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            { required: true, message: 'Please confirm your Password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input.Password
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Confirm Password"
                            suffix={
                                form.isFieldTouched('rePassword') && !form.getFieldError('rePassword').length ? (
                                    <CheckCircleOutlined style={{ color: 'green' }} />
                                ) : null
                            }
                        />
                    </Form.Item>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit" className="register-form-button" style={{ marginRight: '4px' }}>
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </Form.Item>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {isLogin
                        ? <span>You haven't an account?</span>
                        : <span>You have an account?</span>
                    }
                    <span className="login-text" onClick={() => setIsLogin(!isLogin)} style={{ marginLeft: '2px' }}>{isLogin ? 'Register here' : 'Login here'}</span>

                </div>
            </Form>
        </Modal>
    );
}

export default Login;
