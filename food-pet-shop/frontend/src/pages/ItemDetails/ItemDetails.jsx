import React, { useState, useContext, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Select, Image, message, Col, Row, Rate } from 'antd'
import styles from './ItemDetails.module.scss'
import { StoreContext } from '../../context/StoreContext'
import FoodItemDetails from '../../components/FoodItemDetails/FoodItemDetails'
import CustomerReview from '../../components/CustomerReview/CustomerReview'

function ItemDetails() {
    const { url, token, addToCart, productList, fetchProducts } = useContext(StoreContext)

    const [urlImage, setUrlImage] = useState('')
    const [averageRating, setAverageRating] = useState(0)
    const [messageApi, contextHolder] = message.useMessage()
    const [relatedProducts, setRelatedProducts] = useState([])
    const [selectedQuantity, setSelectedQuantity] = useState(1)

    const location = useLocation()
    const { item } = location.state || {}

    if (!item) {
        return <div>Item not found</div>
    }

    useEffect(() => {
        if (item.image.length > 0) {
            setUrlImage(item.image[0])
        }
    }, [item.image])

    const getRelatedProducts = () => {
        const related = productList.filter(product => product.category === item.category && product.subCategory === item.subCategory && product._id !== item._id)
        setRelatedProducts(related.slice(0, 5))
    }

    const handleAddToCart = (itemId, quantity) => {
        if (!token) {
            messageApi.open({
                type: 'error',
                content: 'Vui lòng đăng nhập',
            })
        } else {
            addToCart(itemId, quantity)
            messageApi.open({
                type: 'success',
                content: 'Đã thêm vào giỏ hàng thành công',
            })
        }
    }

    const handleQuantityChange = (value) => {
        setSelectedQuantity(Number(value))
    }

    const handleAverageRatingChange = (rating) => {
        setAverageRating(rating);
    };

    const setDefaultImage = (url) => {
        setUrlImage(url)
    }

    useEffect(() => {
        if (!productList.length) {
            fetchProducts()
        }
    }, [productList.length, fetchProducts])

    useEffect(() => {
        if (productList.length) {
            getRelatedProducts()
        }
    }, [productList, item])

    useEffect(() => {
    }, [urlImage])

    return (
        <>
            {contextHolder}
            <div className={styles['item-details-container']}>
                <div className={styles.title}>
                    <div className={styles['home-text']}><span>Home</span></div>
                    <div><i className="fas fa-angle-right"></i></div>
                    <div className={styles['title-text']}>{item.name}</div>
                </div>
                <div className={styles.body}>
                    <div className={styles['body-left']}>
                        <Image
                            width={480}
                            src={`${url}/images/${urlImage}`}
                        />
                        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'nowrap', gap: '4px' }}>
                            {item.image.map((image, index) => {
                                return (
                                    <img
                                        key={index}
                                        src={`${url}/images/${image}`}
                                        className={`${styles['sub-image']} ${urlImage === image ? styles['active'] : ''}`}
                                        onClick={() => setDefaultImage(image)}>
                                    </img>
                                )
                            })}
                        </div>
                    </div>
                    <div className={styles['body-right']}>
                        <span className={styles['item-name']}>{item.name}</span>
                        <span className={styles['item-brand']}>by <span>{item.brand}</span></span>
                        <Rate disabled defaultValue={averageRating} style={{ fontSize: '16px', width: '140px' }} />
                        <div className={styles['point-container']}>
                            <img src="https://api.smile.io/v1/images/rewards/custom.svg?color=%23ff0000&colorize=true" alt="" />
                            <span>Earn 1,899 Petsy Points on this purchase. <a href="">Learn more</a></span>
                        </div>
                        <span className={styles['item-price']}>{item.price}.000vnđ</span>
                        <Select
                            placeholder="Select a quantity"
                            optionFilterProp="label"
                            options={[
                                { value: 1, label: '1' },
                                { value: 2, label: '2' },
                                { value: 3, label: '3' },
                            ]}
                            style={{ width: '40%' }}
                            defaultValue={1}
                            onChange={handleQuantityChange}
                        />
                        <button className={styles['add-to-cart-btn']} onClick={() => handleAddToCart(item._id, selectedQuantity)}>Add to cart</button>
                    </div>
                </div>
                <div className={styles.footer}>
                    <span>Pet lovers also bought</span>
                    <div className={styles['related-product-container']}>
                        <Row style={{ display: 'flex', justifyContent: 'center', gap: '38px' }}>
                            {relatedProducts.map((product, index) => (
                                <Col span={4.8} key={index}>
                                    <FoodItemDetails product={product} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
            <CustomerReview productName={item.name} onAverageRatingChange={handleAverageRatingChange} />
        </>
    )
}

export default ItemDetails
