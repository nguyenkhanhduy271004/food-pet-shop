import React, { useContext, useEffect } from 'react'
import { FloatButton } from 'antd';
import { Link } from 'react-router-dom'

import './Home.scss'
import Video from '../../components/Video/Video'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import FoodList from '../../components/FoodList/FoodList'
import { StoreContext } from '../../context/StoreContext';
import Categories from '../../components/Categories/Categories'
import FeaturedBrands from '../../components/FeaturedBrands/FeaturedBrands';

function Home() {
    const { url } = useContext(StoreContext)

    return (
        <div className='home-container'>
            <Header />
            <div id='explore-menu'>
                <FoodList title={'Dog Products Collection'} category={'dog'} url={url} quantity={4} />
                <Link className='view-more-btn' to='all-products/product-for-dog'>View more</Link>
                <FoodList title={'Cat Products Collection'} category={'cat'} url={url} quantity={4} />
                <Link className='view-more-btn' to='all-products/product-for-cat'>View more</Link>
                <FoodList title={'Bird Products Collection'} category={'bird'} url={url} quantity={4} />
                <Link className='view-more-btn' to='all-products/product-for-bird'>View more</Link>
                <FoodList title={'Turtle And Fish Products Collection'} category={'turtle-and-fish'} url={url} quantity={4} />
                <Link className='view-more-btn' to='all-products/product-for-turtle-and-fish'>View more</Link>
                <Video />
                <Categories />
                <FeaturedBrands />
            </div>
            <FloatButton.BackTop />
        </div>
    )
}

export default Home
