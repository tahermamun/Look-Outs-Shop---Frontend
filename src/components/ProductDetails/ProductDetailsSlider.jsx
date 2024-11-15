import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { useEffect, useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//pwsa
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';

export default function ProductDetailsSlider({ data }) {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    useEffect(() => {
        let lightbox = new PhotoSwipeLightbox({
            // eslint-disable-next-line no-useless-concat
            gallery: '#' + 'my-test-gallery',
            children: 'a',
            pswpModule: () => import('photoswipe'),
        });
        lightbox.init();

        return () => {
            lightbox.destroy();
            lightbox = null;
        };
    }, []);
    return (
        <div className="slide">
            <div className="pswp-gallery slide-wrapper" id={'my-test-gallery'}>
                <Swiper
                    loop={true}
                    spaceBetween={10}
                    navigation={true}
                    thumbs={{
                        swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
                    }}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={` mySwiper2`}
                >
                    {data?.imagesLink?.map((image, index) => (
                        <SwiperSlide key={index}>
                            <a
                                href={image}
                                data-pswp-width={728}
                                data-pswp-height={666}
                                // eslint-disable-next-line no-useless-concat
                                key={'my-test-gallery' + '-' + index}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                    width: '100%',
                                }}
                            >
                                <img
                                    width="100%"
                                    style={{ height: '772px', objectFit: 'cover' }}
                                    src={image}
                                    alt=""
                                />
                            </a>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <Swiper
                    onSwiper={setThumbsSwiper}
                    loop={true}
                    spaceBetween={10}
                    slidesPerView={5}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className={`mySwiper2`}
                >
                    {data?.imagesLink?.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img width="auto" height="auto" src={item} alt="" />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}
