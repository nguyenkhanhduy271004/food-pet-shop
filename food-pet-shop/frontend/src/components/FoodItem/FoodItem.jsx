import React, { useContext, useState } from 'react'
import { StoreContext } from '../../context/StoreContext'
import { Rate, Modal, Select, InputNumber, Image, message } from 'antd'

import './FoodItem.scss'
import { useNavigate } from 'react-router-dom'


function FoodItem({ item }) {

    const { url, token, addToCart } = useContext(StoreContext)
    const [messageApi, contextHolder] = message.useMessage()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [selectedQuantity, setSelectedQuantity] = useState(1)
    const [isCustomQuantity, setIsCustomQuantity] = useState(true)
    const navigate = useNavigate()

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    const handleQuantityChange = (value) => {
        if (value === 10) {
            setIsCustomQuantity(true);
        } else {
            setIsCustomQuantity(false);
            setSelectedQuantity(Number(value));
        }
    }

    const handleCustomQuantityChange = (value) => {
        setSelectedQuantity(value);
    }

    const handleAddToCart = (itemId, quantity) => {
        if (token === '') {
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
            setIsModalVisible(false)
        }
    }

    const handleClickItem = (item) => {
        navigate(`/products/${item._id}`, { state: { item } })
    }

    return (
        <>
            {contextHolder}
            <div className='food-item-container'>
                <div className="card" style={{ width: '18rem' }}>
                    <img src={`${url}/images/${item.image[0]}`} className="card-img-top" alt="..." onClick={() => handleClickItem(item)} />
                    <div className="card-body">
                        <div onClick={() => handleClickItem(item)}>
                            <h5 className="card-title">{item.name}</h5>
                            <div className='rating-star'>
                                <Rate disabled defaultValue={item.rate > 0 ? item.rate : 5} />
                            </div>
                            <span className='price'>{item.price}.000vnđ</span>
                        </div>
                        {item.stockQuantity !== 0 ? <button className="btn-choose" onClick={showModal}>Choose options</button> : <button className="btn-sold-out" disabled>Sold out</button>}
                    </div>
                </div>
            </div >
            <Modal title="Product Details" open={isModalVisible} onOk={handleOk} onCancel={handleCancel} footer={null}>
                <div className='product-detail-card'>
                    <div className="product-name">{item.name}</div>
                    <div className="product-rating-star">
                        <Rate disabled defaultValue={2} />
                    </div>
                    <div className="product-price">{item.price}.000vnđ</div>
                    <Image
                        width={200}
                        src={`${url}/images/${item.image[0]}`}
                    />

                    {/* {!isCustomQuantity && (
                        <Select
                            placeholder="Select a quantity"
                            optionFilterProp="label"
                            options={[
                                { value: 1, label: '1' },
                                { value: 2, label: '2' },
                                { value: 3, label: '3' },
                                { value: 4, label: '4' },
                                { value: 5, label: '5' },
                                { value: 6, label: '6' },
                                { value: 7, label: '7' },
                                { value: 8, label: '8' },
                                { value: 9, label: '9' },
                                { value: 10, label: '10+' },
                            ]}
                            style={{ width: '40%' }}
                            defaultValue={1}
                            onChange={handleQuantityChange}
                        />
                    )} */}

                    {isCustomQuantity && (
                        <InputNumber
                            min={1}
                            max={100}
                            defaultValue={1}
                            onChange={handleCustomQuantityChange}
                            style={{ width: '40%', marginTop: '10px' }}
                        />
                    )}

                    <button className='add-to-cart-btn' onClick={() => handleAddToCart(item._id, selectedQuantity)}>Add to cart</button>
                </div>
            </Modal>
        </>
    )
}

export default FoodItem
