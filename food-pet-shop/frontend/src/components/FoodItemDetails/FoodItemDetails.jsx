import React, { useContext } from 'react'
import { Rate, message } from 'antd'

import styles from './FoodItemDetails.module.scss'
import { StoreContext } from '../../context/StoreContext'

function FoodItemDetails({ product }) {
    const { url, token, addToCart } = useContext(StoreContext)
    const [messageApi, contextHolder] = message.useMessage()

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

    return (
        <>
            {contextHolder}
            <div className={styles['food-item-container']}>
                <div className={styles.card}>
                    <img src={`${url}/images/${product.image[0]}`} alt={product.name} className={styles['card-img-top']} />
                    <div className={styles['card-body']}>
                        <h5 className={styles['card-title']}>{product.name}</h5>
                        <div className={styles['rating-star']}>
                            <Rate className={styles['small-rate']} disabled defaultValue={2} />
                        </div>
                        <span className={styles.price}>{product.price}.000vnđ</span>
                        <button className={styles['btn-add-to-cart']} onClick={() => handleAddToCart(product._id, 1)}>Add to cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FoodItemDetails
