import React from 'react';
import { Banner } from '../../utils/data';
import './Style.scss';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination } from 'swiper';
import { Link } from 'react-router-dom';

export default function Hero() {
    return (
        <div className="hero">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                pagination={{
                    clickable: true,
                }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Pagination]}
                className="mySwiper"
            >
                {Banner.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={`card ${item.class}`}
                            style={{ backgroundImage: `url(${item.banner})` }}
                        >
                            <div className="container">
                                <div className={`content-wrapper ${item.class}`}>
                                    <div className="content">
                                        <h4 className="sub-title">Get your iPhone Now!</h4>
                                        <h2 className="title">
                                            <span>{item.title}</span>
                                        </h2>
                                        <h2 className="title2">
                                            <span>{item.title2}</span>
                                        </h2>

                                        <Link to="product/AP01IDS08">
                                            <button className="button-secondary">Order Now</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
