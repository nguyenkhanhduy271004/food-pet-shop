import React, { useContext, useState, useEffect } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { message, Steps } from 'antd';
import './Cart.scss';
import ShoppingCart from '../../components/ShoppingCart/ShoppingCart';
import ShippingDetails from '../../components/ShippingDetails/ShippingDetails';
import Success from '../../components/Success/Success';

const Cart = () => {
    const { url, token, cartItems, productList, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    const [messageApi, contextHolder] = message.useMessage();
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(true);
    const [curStep, setCurStep] = useState(0);

    const error = () => {
        messageApi.open({
            type: 'error',
            content: 'Vui lòng thêm sản phẩm',
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            const data = productList.map((item) => {
                if (cartItems[item._id] > 0) {
                    return {
                        key: item._id,
                        image: `${url}/images/${item.image}`,
                        name: item.name,
                        price: item.price,
                        quantity: cartItems[item._id],
                        total: item.price * cartItems[item._id],
                    };
                }
                return null;
            }).filter(item => item !== null);
            setDataSource(data);
            setLoading(false);
        };
        fetchData();
    }, [productList, cartItems, url]);

    const handleClickCheckOut = () => {
        if (getTotalCartAmount() > 0) {
            setCurStep(1);
        } else {
            error();
        }
    };

    useEffect(() => {
        if (token === '') {
            setDataSource([])
        }
    }, [curStep, token]);

    return (
        <div className='cart-container' style={{ marginTop: '160px', marginLeft: '80px', marginRight: '80px' }}>
            <Steps
                size="small"
                current={curStep}
                items={[
                    {
                        title: 'Shopping Cart',
                    },
                    {
                        title: 'Shipping Details',
                    },
                    {
                        title: 'Success',
                    },
                ]}
                style={{ marginBottom: '40px' }}
            />
            {contextHolder}
            {curStep === 0 && (
                <ShoppingCart
                    handleClickCheckOut={handleClickCheckOut}
                    loading={loading}
                    removeFromCart={removeFromCart}
                    getTotalCartAmount={getTotalCartAmount}
                    dataSource={dataSource}
                    setCurStep={setCurStep}
                />
            )}
            {curStep === 1 && (
                <ShippingDetails
                    setCurStep={setCurStep}
                />
            )}
            {curStep === 2 && (
                <Success
                    orderNumber="2017182818828182881"
                />
            )}
        </div>
    );
};

export default Cart;
