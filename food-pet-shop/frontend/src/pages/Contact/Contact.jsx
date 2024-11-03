import React, { useContext } from "react";
import { StoreContext } from '../../context/StoreContext';
import "./Contact.scss";
import { message } from "antd";
import axios from "axios";

const Contact = () => {
    const { token } = useContext(StoreContext);
    const [messageApi, contextHolder] = message.useMessage();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!token) {
            messageApi.open({
                type: 'error',
                content: 'Vui lòng đăng nhập',
            });
            return;
        }

        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            phoneNumber: e.target.phoneNumber.value,
            content: e.target.content.value,
        };



        try {
            const response = await axios.post(
                `http://localhost:4000/api/contact-info/contact-info`,
                { data },
                { headers: { token }, withCredentials: true }
            );

            if (response.status === 200) {
                messageApi.open({
                    type: 'success',
                    content: 'Thông tin liên hệ đã được gửi thành công!',
                });
                e.target.reset();
            } else {
                messageApi.open({
                    type: 'eror',
                    content: 'Thông tin liên hệ đã được gửi không thành công!',
                });
            }
        } catch (error) {
            messageApi.open({
                type: 'error',
                content: 'Có lỗi xảy ra khi gửi thông tin liên hệ.',
            });
            console.error(error);
        }
    };

    return (
        <>
            {contextHolder}
            <div className="contact-container">
                <div className="contact-form">
                    <span>PetFoodShop Liên Hệ</span>
                    <div className="contact-details">
                        <p>
                            <span>📍</span> Địa chỉ: Đông Hà, Quảng Trị
                        </p>
                        <p>
                            <span>📞</span> Số điện thoại: 0903525012
                        </p>
                        <p>
                            <span>📧</span> Email: PetFoodShop@gmail.com
                        </p>
                    </div>

                    <div className="contact-form-wrapper">
                        <h2>Liên hệ với chúng tôi</h2>
                        <form onSubmit={handleSubmit}>
                            <input type="text" name="name" placeholder="Họ tên*" required />
                            <input type="email" name="email" placeholder="Email*" required />
                            <input type="tel" name="phoneNumber" placeholder="Số điện thoại*" required />
                            <textarea name="content" placeholder="Nhập nội dung*" required></textarea>
                            <button type="submit">Gửi liên hệ của bạn</button>
                        </form>
                    </div>
                </div>

                <div className="contact-map">
                    <iframe
                        title="Google Maps"
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d433.5638514465935!2d107.10000014553016!3d16.813855682107608!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1730614199408!5m2!1sen!2s"
                        width="100%"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </>
    );
};

export default Contact;
