import React from 'react'
import { Button, Result } from 'antd';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import { useEffect } from 'react';

function Success({ orderNumber }) {
    const { setCartItems } = useContext(StoreContext)

    useEffect(() => {
        setCartItems({})
    }, [])

    return (
        <Result
            status="success"
            title="Purchase Successful!"
            subTitle={`Order number: ${orderNumber}. Your order is being processed and will be shipped soon.`}
            extra={[
                <Button type="primary" key="home" onClick={() => window.location.href = '/'}>
                    Go to Home
                </Button>,
                <Button key="orders" onClick={() => window.location.href = '/my-orders'}>
                    View Orders
                </Button>,
            ]}
        />
    )
}

export default Success;
