import React, { useState, useContext } from 'react';
import { Button, Form, Input, message } from 'antd';
import { LockOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './Login.scss';

function Login() {
    const [form] = Form.useForm();
    const [isLogin, setIsLogin] = useState(true);
    const { setToken, url } = useContext(StoreContext);
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

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

    const onFinish = async (values) => {
        try {
            const endpoint = `${url}/api/user/${isLogin ? 'login' : 'register'}`;
            const response = await axios.post(endpoint, {
                username: values.username,
                password: values.password
            }, {
                withCredentials: true
            });

            if (response.data.success) {
                success(isLogin ? 'Login successful!' : 'Registration successful!');

                if (isLogin) {

                    if (response.data.data.isAdmin) {
                        console.log(response.data.data.isAdmin);

                        const token = response.data.data.access_token;
                        setToken(token);
                        localStorage.setItem('token', token);
                        navigate('/');
                    } else {
                        navigate('/error');
                    }
                }
                form.resetFields();
            } else {
                error(response.data.message);
            }
        } catch (err) {
            console.log(err);
            error('An error occurred. Please try again.');
        }
    };

    return (
        <div className="login-page">
            {contextHolder}
            <h2 className="login-title">{isLogin ? 'Login' : 'Register'}</h2>
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
                    <Button type="primary" htmlType="submit" className="register-form-button">
                        {isLogin ? 'Login' : 'Register'}
                    </Button>
                </Form.Item>
                <div className="toggle-login-register">
                    {isLogin
                        ? <span>Don't have an account?</span>
                        : <span>Already have an account?</span>
                    }
                    <span className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? 'Register here' : 'Login here'}
                    </span>
                </div>
            </Form>
        </div>
    );
}

export default Login;
