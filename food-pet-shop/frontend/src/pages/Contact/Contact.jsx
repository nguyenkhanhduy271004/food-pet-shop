import React from "react";
import "./Contact.scss";

const Contact = () => {
    return (
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
                    <form>
                        <input type="text" placeholder="Họ tên*" required />
                        <input type="email" placeholder="Email*" required />
                        <input type="tel" placeholder="Số điện thoại*" required />
                        <textarea placeholder="Nhập nội dung*" required></textarea>
                        <button type="submit">Gửi liên hệ của bạn</button>
                    </form>
                </div>
            </div>

            <div className="contact-map">
                <iframe
                    title="Google Maps"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.7265107762764!2d105.8166406757351!3d21.04302289066095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135aba24b1f0fbf%3A0x4dcfb1529e6a00df!2zWMOhIGzhuq9uZywgVGjhu6UgVGjhu6csIEjDoCBO4buZaQ!5e0!3m2!1sen!2s!4v1695771788580!5m2!1sen!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;
