import React from 'react'
import { Link } from 'react-router-dom'
import './Categories.scss'

function Categories() {
    return (
        <div className='categories-container'>
            <div className='categories-title'>Top Categories For Your Dog</div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link className="categories-item" to='all-products/dog-food'>
                            <img src="//www.petsy.online/cdn/shop/files/Dog-Food_79fa23fe-8d90-4319-ae3a-e4ff668bd9ab.jpg?v=1713935085&width=500" alt="" />
                            <span>Dog Food</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="categories-item" to='all-products/dog-grooming'>
                            <img src="https://www.petsy.online/cdn/shop/files/Dog-Gromming.jpg?v=1713935085&width=352" alt="" />
                            <span>Dog Grooming</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="categories-item" to='all-products/dog-toys'>
                            <img src="https://www.petsy.online/cdn/shop/files/Dog-Toys.jpg?v=1713935086&width=352" alt="" />
                            <span>Dog Toys</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="categories-item" to='all-products/dog-accessories'>
                            <img src="https://www.petsy.online/cdn/shop/files/Dog-Accessories_cdfec15f-5bc1-4bfa-938c-873bdb29c956.jpg?v=1713935084&width=352" alt="" />
                            <span>Dog Accessories</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="categories-item" to='all-products/dog-supplements'>
                            <img src="https://www.petsy.online/cdn/shop/files/Dog-Supplements.jpg?v=1713935084&width=352" alt="" />
                            <span>Dog Supplements</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='categories-title'>Top Categories For Your Cat</div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link className="categories-item" to='all-products/cat-food'>
                            <img src="https://www.petsy.online/cdn/shop/files/Cat-food_6813ac40-1a6d-4e43-814d-59bb1414992c.jpg?v=1713935100&width=352" alt="" />
                            <span>Cat Food</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="categories-item" to='all-products/cat-treats'>
                            <img src="https://www.petsy.online/cdn/shop/files/Cat-Gromming.jpg?v=1713935099&width=352" alt="" />
                            <span>Cat Treats</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="categories-item" to='all-products/cat-toys'>
                            <img src="https://www.petsy.online/cdn/shop/files/Cat-Toys_ffb14734-7bcd-4252-9b97-0245e64f4d98.jpg?v=1713935100&width=352" alt="" />
                            <span>Cat Toys</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="categories-item" to='all-products/cat-accessories'>
                            <img src="https://www.petsy.online/cdn/shop/files/Cat-Accessories_607381a7-682b-452c-89f8-fa957b5c4fa8.jpg?v=1713935099&width=352" alt="" />
                            <span>Cat Accessories</span>
                        </Link>
                    </div>
                    <div className="col">
                        <Link className="categories-item" to='all-products/cat-carriers'>
                            <img src="https://www.petsy.online/cdn/shop/files/Cat-Supplements.jpg?v=1713935100&width=352" alt="" />
                            <span>Cat Carriers</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Categories
