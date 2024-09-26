import React, { useState, useEffect, useContext } from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { Col, Row, Slider, Select } from 'antd';
import axios from 'axios';

import './AllProduct.scss';
import FoodItem from '../../components/FoodItem/FoodItem';
import { StoreContext } from '../../context/StoreContext';

const AllProduct = ({ category, subCategory, title }) => {

    const { url } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [options, setOptions] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 999]);
    const [sortBy, setSortBy] = useState('');

    const [visibleFilters, setVisibleFilters] = useState({
        brand: false,
        productType: false,
        price: false
    });

    const [productTypeCounts, setProductTypeCounts] = useState({});

    const toggleFilterVisibility = (filter) => {
        setVisibleFilters((prevState) => ({
            ...prevState,
            [filter]: !prevState[filter]
        }));
    };

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        setOptions(prevState => {
            if (checked) {
                return [...prevState, value];
            } else {
                return prevState.filter(option => option !== value);
            }
        });
    };

    const fetchListProduct = async () => {
        try {
            const response = await axios.get(`${url}/api/product/list`);
            if (response.data.success) {
                const products = response.data.data;
                let filteredProducts;
                if (subCategory) {
                    filteredProducts = subCategory ? products.filter(product => product.category === category && product.subCategory === subCategory) : products;
                } else {
                    filteredProducts = category ? products.filter(product => product.category === category) : products;
                }
                setData(filteredProducts);
                setFilteredData(filteredProducts);
            } else {
                console.log("Failed to fetch products");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getProductTypeCounts = () => {
        const counts = {}
        data.forEach(product => {
            const type = product.subCategory.charAt(0).toLowerCase() + product.subCategory.slice(1)
            if (counts[type]) {
                counts[type]++
            } else {
                counts[type] = 1
            }
        })
        return counts;
    }

    const handleDeleteOption = (value) => {
        setOptions(prevState => prevState.filter(option => option !== value));
    };

    const handleClearAllOptions = () => {
        setOptions([])
    }

    const filterProducts = () => {
        let filtered = data;
        if (options.length > 0) {
            filtered = filtered.filter(product => options.includes(product.brand) || options.includes(product.subCategory.charAt(0).toUpperCase() + product.subCategory.slice(1)));
        }

        filtered = filtered.filter(product => product.price >= priceRange[0] && product.price <= priceRange[1]);

        setFilteredData(filtered);
    };

    const handleSliderChange = (value) => {
        setPriceRange(value);
    };

    const handleSelectChange = (value) => {
        setSortBy(value);
    };

    const uniqueBrands = [...new Set(data.map(product => product.brand))];
    const uniqueProductTypes = [...new Set(data.map(product => product.subCategory))]
        .map(subCategory => subCategory.charAt(0).toUpperCase() + subCategory.slice(1));

    const priceFormatter = (value) => `${value}.000vnđ`;

    useEffect(() => {
        window.scrollTo(0, 0)
        fetchListProduct();
    }, []);


    useEffect(() => {
        filterProducts();
    }, [priceRange, options, data]);

    useEffect(() => {
        const sortData = () => {
            let sortedData = [...filteredData];
            switch (sortBy) {
                case 'price-ascending':
                    sortedData.sort((a, b) => a.price - b.price);
                    break;
                case 'price-descending':
                    sortedData.sort((a, b) => b.price - a.price);
                    break;
                case 'created-ascending':
                    sortedData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                    break;
                case 'created-descending':
                    sortedData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    break;
                default:
                    sortedData = [...filteredData]
                    break;
            }
            setFilteredData(sortedData);
        };

        sortData();
    }, [sortBy]);

    useEffect(() => {
        const counts = getProductTypeCounts();
        setProductTypeCounts(counts);
    }, [data]);

    return (
        <div className='all-product-container'>
            <div className="title">
                <div className='home-text'><span>Home</span></div>
                <div><i className="fas fa-angle-right"></i></div>
                <div className='title-text'>{title}</div>
            </div>
            <Row>
                <Col span={4}>
                    <div className="filter-container">
                        <div style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '10px' }}>Filters</div>
                        <div className="divider"></div>
                        <div className="filter-option">
                            <div className="filter-option-title" onClick={() => toggleFilterVisibility('brand')}>
                                <div className='filter-text'>Brand</div>
                                <div><i className="fas fa-angle-down"></i></div>
                            </div>
                            {visibleFilters.brand && (
                                <div className="options-container">
                                    {uniqueBrands.map((brand, index) => (
                                        <div className="option-container" key={index}>
                                            <input
                                                type="checkbox"
                                                value={brand}
                                                onChange={handleCheckboxChange}
                                                checked={options.includes(brand)}
                                            />
                                            <span>{brand}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="divider"></div>
                        <div className="filter-option">
                            <div className="filter-option-title" onClick={() => toggleFilterVisibility('productType')}>
                                <div className='filter-text'>Product Type</div>
                                <div><i className="fas fa-angle-down"></i></div>
                            </div>
                            {visibleFilters.productType && (
                                <div className="options-container">
                                    {uniqueProductTypes.map((type, index) => (
                                        <div className="option-container" key={index}>
                                            <input
                                                type="checkbox"
                                                value={type}
                                                onChange={handleCheckboxChange}
                                                checked={options.includes(type)}
                                            />
                                            <span>{type}</span>
                                            <span className='product-count'>{`(${productTypeCounts[type.charAt(0).toLowerCase() + type.slice(1)]})`}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="divider"></div>
                        <div className="filter-option">
                            <div className="filter-option-title" style={{ display: 'block' }} onClick={() => toggleFilterVisibility('price')}>
                                <div className='filter-text'>Price:</div>
                                <div>
                                    <Slider
                                        range
                                        defaultValue={[0, 999]}
                                        max={999}
                                        value={priceRange}
                                        onChange={handleSliderChange}
                                        tooltip={{
                                            formatter: priceFormatter
                                        }}
                                    />
                                </div>
                                <div style={{ marginTop: '10px', fontSize: '12px' }}>Khoảng: {priceFormatter(priceRange[0])} - {priceFormatter(priceRange[1])}</div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col span={20}>
                    <div className='sort-container'>
                        <div className="sort-text">Sort by</div>
                        <div className="sort-input">
                            <Select
                                onChange={handleSelectChange}
                                defaultValue="Featured"
                                style={{
                                    width: 200,
                                }}
                                allowClear
                                options={[
                                    {
                                        value: 'price-ascending',
                                        label: 'Price, low to high'
                                    },
                                    {
                                        value: 'price-descending',
                                        label: 'Price, high to low'
                                    },
                                    {
                                        value: 'created-ascending',
                                        label: 'Date, old to new'
                                    },
                                    {
                                        value: 'created-descending',
                                        label: 'Date, new to old'
                                    }
                                ]}
                            />
                        </div>
                        <div className="option-active">
                            {options.map((option, index) => (
                                <div className='option-tag' key={index} onClick={() => handleDeleteOption(option)}>
                                    {option}
                                    <span className='delete-btn'>&times;</span>
                                </div>
                            ))}
                            <div className={options.length > 0 ? 'clear-all-btn' : 'clear-all-btn hidden'} onClick={handleClearAllOptions}>Clear All</div>
                        </div>
                    </div>
                    <div className="product-container">
                        <Row style={{ marginTop: '10px' }}>
                            {filteredData.map((product, index) => (
                                <Col span={6} key={index} style={{ marginTop: '10px' }}>
                                    <FoodItem item={product} url={`${url}`} />
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default AllProduct;
