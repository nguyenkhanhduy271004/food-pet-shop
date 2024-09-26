import React, { useContext, useEffect, useState } from 'react';
import { Rate, Progress, Input } from 'antd';
import axios from 'axios';

import { StoreContext } from '../../context/StoreContext';
import styles from './CustomerReview.module.scss';

const { TextArea } = Input;

function CustomerReview({ productName, onAverageRatingChange }) {
    const { url } = useContext(StoreContext);
    const [dataReviews, setDataReviews] = useState([]);
    const [filteredReviews, setFilteredReviews] = useState([]);
    const [data, setData] = useState({ productName: productName, rate: 5, name: '', review: '' });
    const [showEvaluateContainer, setShowEvaluateContainer] = useState(false);
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        setData({ ...data, review: e.target.value });
    };

    const handleInputName = (e) => {
        setData({ ...data, name: e.target.value });
    }

    const handleChangeRateValue = (value) => {
        setData({ ...data, rate: value });
    }

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${url}/api/reviews/add-customer-review`, data);
            if (response.data.success) {
                await fetchingApiGetAllReviews();
            } else {
                console.log('Error');
            }
        } catch (error) {
            console.log('Error connecting to the database', error.message);
        } finally {
            setLoading(false);
        }
    }

    const fetchingApiGetAllReviews = async () => {
        try {
            const response = await axios.get(`${url}/api/reviews/get-all-customer-reviews`);
            if (response.data.success) {
                const dataFiltered = response.data.data.filter((review) => review.productName === productName);
                setDataReviews(dataFiltered);
                setFilteredReviews(dataFiltered);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const calculateAverageRating = () => {
        if (dataReviews.length === 0) return 0;
        const totalRating = dataReviews.reduce((acc, review) => acc + review.rate, 0);
        return totalRating / dataReviews.length;
    };

    const handleClickRateTag = (value) => {
        if (value) {
            const filtered = dataReviews.filter((review) => review.rate === value);
            setFilteredReviews(filtered);
        } else {
            setFilteredReviews(dataReviews);
        }
    }

    useEffect(() => {
        fetchingApiGetAllReviews();
        const averageRating = calculateAverageRating();
        if (onAverageRatingChange) {
            onAverageRatingChange(averageRating);
        }
    }, []);

    return (
        <div className={styles['container']}>
            {loading && <p>Loading...</p>}
            <div className={styles['container-top']}>
                <h3>Customer Review</h3>
                <div className={styles['progress-rating-bar']}>
                    <div className={styles['left']}>
                        <Rate disabled defaultValue={5} style={{ fontSize: '14px' }} />
                        <span>Based on {dataReviews.length} reviews</span>
                    </div>
                    <div className={styles['slider']}></div>
                    <div className={styles['right']}>
                        {Array.from({ length: 5 }, (_, i) => i + 1).map((rating) => (
                            <div
                                className={styles['progress-rating-bar-item']}
                                key={rating}
                                onClick={() => handleClickRateTag(rating)}
                            >
                                <Rate disabled defaultValue={rating} style={{ fontSize: '14px', width: '110px' }} />
                                <Progress
                                    percent={(dataReviews.filter(review => review.rate === rating).length / dataReviews.length) * 100}
                                    size="small"
                                    style={{ width: 'fit-content' }}
                                />
                                <span>({dataReviews.filter(review => review.rate === rating).length})</span>
                            </div>
                        ))}
                        <span onClick={() => handleClickRateTag()} className={styles['text-view-all']}>View All</span>
                    </div>
                    <div className={styles['slider']}></div>
                    <div
                        className={styles['btn-evaluate']}
                        onClick={() => setShowEvaluateContainer(!showEvaluateContainer)}
                    >
                        Đánh giá
                    </div>
                </div>

                <div className={`${styles['evaluate-container']} ${showEvaluateContainer ? styles['show'] : ''}`}>
                    <div className={styles['slider']}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <span>Đánh giá: </span>
                        <Rate allowHalf defaultValue={5} onChange={handleChangeRateValue} />
                    </div>
                    <Input placeholder="Họ và tên" style={{ width: '300px' }} onChange={handleInputName} />
                    <TextArea
                        showCount
                        maxLength={100}
                        onChange={onChange}
                        placeholder="Ý kiến của bạn"
                        style={{ height: 120, resize: 'none' }}
                    />
                    <button className={styles['submit-btn']} onClick={handleSubmit}>Submit</button>
                </div>
            </div>
            <div className={styles['container-bot']}>
                <div className={styles['slider']}></div>
                <div className={styles['customer-review-container']}>
                    {filteredReviews.map((review) => {
                        return (
                            <div className={styles['customer-review-container-item']} key={review._id}>
                                <h5>{review.name}</h5>
                                <span>{review.createdAt}</span>
                                <Rate disabled defaultValue={review.rate} />
                                <span>{review.review}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}

export default CustomerReview;
