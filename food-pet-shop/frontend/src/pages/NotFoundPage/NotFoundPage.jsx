import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.scss';
function NotFoundPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
    return (
        <div className="not-found-container">
            <h1 className="not-found-title">404 - Không tìm thấy trang</h1>
            <p className="not-found-text">
                Oops! Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </p>
            <Link to="/" className="not-found-link">Quay lại trang chủ</Link>
        </div>
    );
}

export default NotFoundPage;
