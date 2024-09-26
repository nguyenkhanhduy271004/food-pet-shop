import React from "react";
import "./About.scss";

const About = () => {
    return (
        <div className="about-pet-shop">
            <header className="about-header">
                <h1>Welcome to PetFoodShop</h1>
                <p>
                    Chúng tôi mang đến những sản phẩm chất lượng cao dành riêng cho thú cưng yêu quý của bạn.
                </p>
            </header>

            <section className="shop-introduction">
                <h2>Giới thiệu</h2>
                <p>
                    Website chính thức và duy nhất của **PetFoodShop**! Tại đây, chúng tôi cung cấp đa dạng các loại thức ăn, đồ chơi, và phụ kiện cho thú cưng.
                    Hiện tại, chúng tôi chỉ nhận đơn hàng qua website này, không chấp nhận đơn từ bất kỳ kênh nào khác.
                </p>
                <p>
                    Với đội ngũ chuyên gia yêu thú cưng, chúng tôi luôn đảm bảo rằng mọi sản phẩm đều an toàn và chất lượng.
                    PetFoodShop cam kết đồng hành cùng bạn trong hành trình chăm sóc và yêu thương những người bạn bốn chân.
                </p>
            </section>

            <section className="shop-promise">
                <h2>Tại sao chọn PetFoodShop?</h2>
                <ul>
                    <li>💚 Sản phẩm chất lượng, an toàn và đầy đủ dưỡng chất.</li>
                    <li>🚚 Giao hàng nhanh chóng và tiện lợi trên toàn quốc.</li>
                    <li>🎁 Nhiều ưu đãi và quà tặng hấp dẫn cho khách hàng thân thiết.</li>
                    <li>🐾 Tư vấn miễn phí về dinh dưỡng và chăm sóc thú cưng.</li>
                </ul>
            </section>

            <section className="official-channels">
                <h2>Các kênh liên hệ chính thức</h2>
                <p>
                    Nếu có bất kỳ chương trình khuyến mãi hay thông báo, chúng tôi sẽ cập nhật tại các kênh chính thức và duy nhất sau đây:
                </p>
                <ul>
                    <li>
                        <strong>Website:</strong>
                        <a href="https://petfoodshop.com" target="_blank" rel="noopener noreferrer">
                            https://petfoodshop.com
                        </a>
                    </li>
                    <li>
                        <strong>Fanpage:</strong>
                        <a href="https://www.facebook.com/PetFoodShop" target="_blank" rel="noopener noreferrer">
                            https://www.facebook.com/PetFoodShop
                        </a>
                    </li>
                    <li>
                        <strong>Instagram:</strong>
                        <a href="https://www.instagram.com/petfood.shop" target="_blank" rel="noopener noreferrer">
                            https://www.instagram.com/petfood.shop
                        </a>
                    </li>
                    <li>
                        <strong>Email:</strong>
                        <a href="mailto:PetFoodShop@gmail.com">PetFoodShop@gmail.com</a>
                    </li>
                </ul>
            </section>

            <section className="customer-service">
                <h2>Chăm sóc khách hàng</h2>
                <p>
                    PetFoodShop không chỉ cung cấp sản phẩm, mà còn mang đến dịch vụ tư vấn chuyên nghiệp từ đội ngũ chuyên gia.
                    Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc về dinh dưỡng, cách chăm sóc, và các sản phẩm dành cho thú cưng.
                </p>
                <p>
                    Nếu bạn có bất kỳ câu hỏi nào, hãy liên hệ ngay với chúng tôi qua các kênh liên lạc chính thức. Đội ngũ chăm sóc khách hàng
                    của chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                </p>
            </section>

            <footer className="about-footer">
                <p>&copy; 2024 PetFoodShop. All rights reserved. Chúng tôi luôn đồng hành cùng thú cưng của bạn!</p>
            </footer>
        </div>
    );
};

export default About;
