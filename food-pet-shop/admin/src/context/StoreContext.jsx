import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = 'http://localhost:4000';
    const [users, setUsers] = useState([])
    const [orders, setOrders] = useState([])
    const [productList, setProductList] = useState([])
    const [revenue, setRevenue] = useState(0)

    const fetchDataOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                const total = response.data.data.reduce((total, val) => {
                    return total + Number(val.amount);
                }, 0);
                setRevenue(total);
                setOrders(response.data.data);
            } else {
                console.log('Fetching data orders failed');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            if (response.data.success) {
                const formattedData = response.data.data.map(item => ({
                    ...item,
                    key: item._id,
                }));
                setProductList(formattedData);
            } else {
                console.log('Fetching product list failed');
            }
        } catch (error) {
            console.error('Error fetching product list:', error);
        }
    };

    const fetchDataUser = async () => {
        try {
            const response = await axios.get(`${url}/api/user/list`)
            if (response.data.success) {
                setUsers(response.data.data)
            } else {
                console.log('Fetching user list failed');
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDataOrders()
        fetchList()
        fetchDataUser()
    }, [])

    const contextValue = {
        url,
        orders,
        revenue,
        fetchDataOrders,
        productList,
        fetchList,
        users,
        fetchDataUser
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
