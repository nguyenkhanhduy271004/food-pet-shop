import React from 'react';
import styles from './Error.module.scss';

function Error() {
    return (
        <div className={styles['error-container']}>
            <h1 className={styles['error-code']}>403</h1>
            <h2 className={styles['error-title']}>OH NO! Bạn không có quyền truy cập trang web này</h2>
            <p className={styles['error-message']}>Vui lòng đăng nhập với tài khoản có quyền truy cập hoặc quay lại trang chủ.</p>
            <button className={styles['home-button']} onClick={() => window.location.href = '/'}>
                Trở về trang chủ
            </button>
        </div>
    );
}

export default Error;
