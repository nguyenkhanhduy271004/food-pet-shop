import React, { useContext, useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

import './FoodList.scss'
import FoodItem from '../FoodItem/FoodItem'
import { StoreContext } from '../../context/StoreContext'

function FoodList1({ title, category, quantity }) {

    const { url, productList, cartItems } = useContext(StoreContext)

    const [data, setData] = useState([])

    const fetchListProduct = async () => {
        const filteredData = productList.filter((item) => item.category.includes(category))
        setData(filteredData.slice(0, quantity))
    }

    useEffect(() => {
        fetchListProduct()
    }, [productList])

    return (
        <div className='food-list-container'>
            <div className='title'>{title}</div>
            <div className="container">
                <div className="row">
                    {data.map((item, index) => {
                        return (
                            <div className="col" key={index} style={{ marginBottom: '10px' }}>
                                <FoodItem item={item} url={url} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FoodList1
