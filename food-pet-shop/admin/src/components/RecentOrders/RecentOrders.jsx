import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';
import './RecentOrders.scss';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';

const columns = [
    {
        title: 'Name',
        dataIndex: ['address', 'name'],
        key: 'name',
    },
    {
        title: 'Phone',
        dataIndex: ['address', 'phone'],
        key: 'phone',
    },
    {
        title: 'Address',
        dataIndex: ['address', 'address'],
        key: 'address',
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: amount => `${amount}.000vnđ`
    },
    {
        title: 'Date',
        dataIndex: 'date',
        key: 'date',
        render: date => new Date(date).toLocaleDateString(),
    },
];

function RecentOrders() {
    const { orders, fetchDataOrders } = useContext(StoreContext)

    useEffect(() => {
        fetchDataOrders();
    }, []);

    return (
        <Table dataSource={orders} columns={columns} rowKey="_id" />
    );
}

export default RecentOrders;
