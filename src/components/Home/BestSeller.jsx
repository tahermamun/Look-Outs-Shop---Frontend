import React from 'react';
import { products } from '../../utils/data.js';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import './Style.scss';

// import required modules
import { Autoplay, FreeMode } from 'swiper';
import SubHeader from './SubHeader.jsx';
import { Link } from 'react-router-dom';

export default function BestSeller() {
    return (
        <div className="container best-seller">
            <SubHeader title="Best Seller" />

            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                freeMode={true}
                // loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[FreeMode, Autoplay]}
                className="mySwiper"
                breakpoints={{
                    575: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    767: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    991: {
                        slidesPerView: 4,
                        spaceBetween: 20,
                    },
                }}
            >
                {products.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Link to={`/product/${item.id}`}>
                            <div className="product-card">
                                <div className="img-wrapper">
                                    <img src={item.img} alt="" />
                                </div>

                                <div className="title">iPhone 14 Pro Max</div>

                                <div className="price">$1200</div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="space"></div>
        </div>
    );
}
