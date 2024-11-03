import React, { useContext, useEffect, useState } from 'react';
import { Card, Button, Row, Col, message, Carousel, Spin } from 'antd';
import { HeartFilled, ShoppingCartOutlined, DeleteOutlined } from '@ant-design/icons';
import axios from 'axios';
import './WishList.scss';
import { StoreContext } from '../../context/StoreContext';

function WishList() {
    const { token, addToCart } = useContext(StoreContext);
    const [wishList, setWishList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchWishList = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:4000/api/product/wish-list', {
                    headers: { token },
                    withCredentials: true
                });
                if (response.data && response.data.success) {
                    setWishList(response.data.products);
                } else {
                    message.error('Không thể tải danh sách yêu thích');
                }
            } catch (error) {
                message.error('Lỗi khi lấy danh sách yêu thích');
                console.error('Error fetching wishlist:', error);
            }
            setLoading(false);
        };

        fetchWishList();
    }, [token]);

    const handleAddToCart = async (productId) => {
        const response = await addToCart(productId, 1);
        console.log(response);

        if (!response) {
            message.error('Sản phẩm tạm thời hết hàng');
        } else {
            message.success('Thêm sản phẩm thành công');
        }
    };

    const handleRemoveFromWishlist = async (itemId) => {
        try {
            const response = await axios.post('http://localhost:4000/api/product/wish-list-delete', { itemId }, {
                headers: { token },
                withCredentials: true
            });

            if (response.data.success) {
                message.success('Sản phẩm đã được xóa khỏi danh sách yêu thích');
                setWishList(prevWishList => prevWishList.filter(product => product._id !== itemId));
            } else {
                message.error('Không thể xóa sản phẩm khỏi danh sách yêu thích');
            }
        } catch (error) {
            message.error('Lỗi khi xóa sản phẩm khỏi danh sách yêu thích');
            console.error('Error removing product from wishlist:', error);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="wishlist-container">
                <h2 className="wishlist-title"><HeartFilled /> Danh sách yêu thích của bạn</h2>
                {loading ? (
                    <Spin />
                ) : (
                    wishList.length > 0 ? (
                        wishList.length > 5 ? (
                            <Carousel autoplay arrows dots={false}>
                                {wishList.map((product) => (
                                    <div key={product._id}>
                                        <Row gutter={[8, 16]} style={{ marginBottom: '20px' }}>
                                            <Col xs={24} sm={12} md={8} lg={6}>
                                                <Card
                                                    hoverable
                                                    cover={<img alt={product.name} src={`http://localhost:4000/images/${product.image[0]}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} className="wishlist-image" />}
                                                    className="wishlist-card"
                                                    style={{ position: 'relative' }}
                                                >
                                                    <div
                                                        onClick={() => handleRemoveFromWishlist(product._id)}
                                                        style={{
                                                            position: 'absolute',
                                                            top: '10px',
                                                            right: '10px',
                                                            cursor: 'pointer',
                                                            color: 'red',
                                                            fontSize: '20px',
                                                        }}
                                                    >
                                                        <DeleteOutlined />
                                                    </div>
                                                    <Card.Meta title={product.name} description={`${product.price}.000 VNĐ`} />
                                                    {console.log('Stock Quantity:', product.stockQuantity)} {/* Debugging log */}
                                                    <Button
                                                        type="primary"
                                                        icon={<ShoppingCartOutlined />}
                                                        onClick={product.stockQuantity > 0 ? () => handleAddToCart(product._id) : null}
                                                        disabled={product.stockQuantity <= 0} // Ensure button is disabled when stock is 0
                                                        style={{ marginTop: '10px', width: '100%', backgroundColor: product.stockQuantity <= 0 ? '#ccc' : '#4f3426', color: '#fff' }}
                                                    >
                                                        {product.stockQuantity <= 0 ? 'Sold out' : 'Thêm vào giỏ hàng'}
                                                    </Button>
                                                </Card>
                                            </Col>
                                        </Row>
                                    </div>
                                ))}
                            </Carousel>
                        ) : (
                            <Row gutter={[8, 16]} style={{ marginBottom: '20px' }}>
                                {wishList.map((product) => (
                                    <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                                        <Card
                                            hoverable
                                            cover={<img alt={product.name} src={`http://localhost:4000/images/${product.image[0]}`} style={{ width: '100%', height: 'auto', objectFit: 'cover' }} className="wishlist-image" />}
                                            className="wishlist-card"
                                            style={{ position: 'relative' }}
                                        >
                                            <div
                                                onClick={() => handleRemoveFromWishlist(product._id)}
                                                style={{
                                                    position: 'absolute',
                                                    top: '10px',
                                                    right: '10px',
                                                    cursor: 'pointer',
                                                    color: 'red',
                                                    fontSize: '20px',
                                                }}
                                            >
                                                <DeleteOutlined />
                                            </div>
                                            <Card.Meta title={product.name} description={`${product.price}.000 VNĐ`} />
                                            <Button
                                                type="primary"
                                                icon={<ShoppingCartOutlined />}
                                                onClick={product.stockQuantity > 0 ? () => handleAddToCart(product._id) : null}
                                                disabled={product.stockQuantity <= 0}
                                                style={{ marginTop: '10px', width: '100%', backgroundColor: product.stockQuantity <= 0 ? '#ccc' : '#4f3426', color: '#fff' }}
                                            >
                                                {product.stockQuantity <= 0 ? 'Sold out' : 'Thêm vào giỏ hàng'}
                                            </Button>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        )
                    ) : (
                        <p className="wishlist-empty">Danh sách yêu thích trống.</p>
                    )
                )}
            </div>
        </>
    );
}

export default WishList;
