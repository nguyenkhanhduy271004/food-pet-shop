import React, { useEffect, useRef } from 'react';
import styles from './FeaturedBrands.module.scss';
import { image_url } from '../../assets/assets.js';

function FeaturedBrands() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const images = container.querySelectorAll(`.${styles['image']}`);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(styles['appear']);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.,
        });

        images.forEach((image, index) => {
            setTimeout(() => {
                observer.observe(image);
            }, index * 100);
        });

        return () => {
            images.forEach((image) => {
                observer.unobserve(image);
            });
        };
    }, []);

    return (
        <div ref={containerRef} className={styles['container']}>
            <h2>Featured Brands</h2>
            <div className={styles['image-container']}>
                {image_url.map((url, index) => (
                    <div key={index} className={styles['image']}>
                        <img src={url} alt={`image-${index}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FeaturedBrands;
