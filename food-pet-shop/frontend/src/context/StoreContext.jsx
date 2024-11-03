import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from 'antd';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const url = 'http://localhost:4000';
    const [cartItems, setCartItems] = useState({});
    const [productList, setProductList] = useState([]);
    const [token, setToken] = useState('');
    const [showModalLogin, setShowModalLogin] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    const addToCart = async (itemId, quantity) => {
        if (token) {
            try {
                const response = await axios.post(url + '/api/cart/add', { itemId, quantity }, { headers: { token }, withCredentials: true });
                if (!response.data.success) {
                    messageApi.open({
                        type: 'error',
                        content: response.data.message,
                    });
                    return false;
                } else {
                    if (!cartItems[itemId]) {
                        setCartItems((prev) => ({ ...prev, [itemId]: quantity }));
                    } else {
                        const currentQuantity = cartItems[itemId];
                        setCartItems((prev) => ({ ...prev, [itemId]: currentQuantity + quantity }));
                    }
                    messageApi.open({
                        type: 'success',
                        content: response.data.message,
                    });
                }
                await fetchProducts();
            } catch (err) {
                console.error('Failed to add item to cart:', err);
                return false;
            }
        }
        return true;
    };


    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev,
            [itemId]: 0
        }));

        if (token) {
            try {
                await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token }, withCredentials: true });
                await fetchProducts();
            } catch (err) {
                console.error('Failed to remove item from cart:', err);
            }
        }
    };

    const getTotalQuantity = () => {
        let totalQuantity = 0;
        for (const itemId in cartItems) {
            if (cartItems[itemId] > 0) {
                totalQuantity += 1;
            }
        }
        return totalQuantity;
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const itemId in cartItems) {
            let itemInfo = productList.find((product) => product._id === itemId);
            if (cartItems[itemId] > 0 && itemInfo) {
                totalAmount += itemInfo.price * cartItems[itemId];
            }
        }
        return totalAmount;
    };

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            if (response.data.success) {
                setProductList(response.data.data);
            } else {
                console.log('Fetching product list failed');
            }
        } catch (err) {
            console.error('Failed to fetch products:', err);
        }
    };

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(url + '/api/cart/get', {}, { headers: { token }, withCredentials: true });
            setCartItems(response.data.cartData);
        } catch (err) {
            console.error('Failed to load cart data:', err);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            await fetchProducts();
            if (token) {
                await loadCartData(token);
            }
        };

        loadData();
    }, [token]);

    const contextValue = {
        url,
        showModalLogin,
        setShowModalLogin,
        token,
        setToken,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalQuantity,
        getTotalCartAmount,
        productList,
        fetchProducts
    };

    return (
        <StoreContext.Provider value={contextValue}>
            {contextHolder}
            {props.children}
        </StoreContext.Provider>
    );
};

export default StoreContextProvider;
