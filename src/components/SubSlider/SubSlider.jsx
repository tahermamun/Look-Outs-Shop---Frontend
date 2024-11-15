import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// import required modules
import { Link } from 'react-router-dom';
import { SubBanner } from '../../utils/data';
import './Style.scss';
import { Autoplay } from 'swiper';

export default function SubSlider() {
    return (
        <div className="subSlider">
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper"
            >
                {SubBanner.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={`card ${item.class}`}
                            style={{
                                backgroundImage: ` linear-gradient(0deg, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${item.banner})`,
                            }}
                        >
                            <div className="container">
                                <div className={`content-wrapper ${item.class}`}>
                                    <div className="content">
                                        {/* <h4 className="sub-title">Get your iPhone Now!</h4> */}

                                        <h2 className="title2">
                                            <span>{item.title2}</span>
                                        </h2>

                                        <Link to="/product/AP01IDS08">
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
