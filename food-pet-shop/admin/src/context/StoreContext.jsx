import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = 'http://localhost:4000';
    const [users, setUsers] = useState([]);
    const [orders, setOrders] = useState([]);
    const [productList, setProductList] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [token, setToken] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const axiosInstance = axios.create({
        baseURL: url,
        withCredentials: true,
    });

    useEffect(() => {
        if (token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            delete axiosInstance.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const fetchDataOrders = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/order/list');
            if (response.data.success) {
                const total = response.data.data.reduce((total, val) => total + Number(val.amount), 0);
                setRevenue(total);
                setOrders(response.data.data);
            } else {
                console.log('Fetching data orders failed');
            }
        } catch (error) {
            console.log(error);
            setError('Failed to fetch orders');
        } finally {
            setLoading(false);
        }
    };

    const fetchList = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/product/list');
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
            setError('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const fetchDataUser = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get('/api/user/list');
            if (response.data.success) {
                setUsers(response.data.data);
            } else {
                console.log('Fetching user list failed');
            }
        } catch (error) {
            console.log(error);
            setError('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataOrders();
        fetchList();
        fetchDataUser();
    }, []);

    const contextValue = {
        url,
        orders,
        revenue,
        fetchDataOrders,
        productList,
        fetchList,
        users,
        fetchDataUser,
        loading,
        error,
        showModalLogin,
        setShowModalLogin,
        token,
        setToken,
        isAuthenticated,
        setIsAuthenticated
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
