import Image from 'next/image';
import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/zoom';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs, Zoom } from 'swiper/modules';

export default function Photos({setPhotos, photos}:any) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<any>();
  const sliderRef = React.useRef<any>();

  const sliderPrev = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slidePrev();
  }, []);

  const sliderNext = React.useCallback(() => {
    if (!sliderRef.current) return;
    sliderRef.current.swiper.slideNext();
  }, []);

  const breakpointsConfig = {
    0: {
      slidesPerView: 2, 
      spaceBetween: 15, 
    }, 
    576: { 
      slidesPerView: 2, 
      spaceBetween: 15, 
    }, 
    768: { 
      slidesPerView: 3, 
      spaceBetween: 18, 
    }
  }

  return (
    <div className="row align-items-stretch gx-lg-5">
      <div className="col-lg-9 order-lg-last">
        <Swiper ref={sliderRef} loop={true} spaceBetween={10} navigation={false} thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }} modules={[FreeMode, Navigation, Thumbs, Zoom]} zoom={true} className="main-carousel">
          {photos.map((photo:any, index:any) => {
            
            return (
            <SwiperSlide key={index}>
              {photo ? (
                <img src={process.env.NEXT_PUBLIC_API + photo} />
              ) : (
                <p className="my-0 text-center fz-14">No se ha proporcionado una URL de imagen válida</p>
              )}
            </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className="col-lg-3 d-none d-lg-block">
        <div className="me-lg-4 me-xl-5 h-100 py-5 position-relative">
          <button type="button" onClick={sliderPrev} className="btn-slider-nav nav-prev">
            <i className="fa-solid fa-chevron-up"></i>
          </button>

          <Swiper onSwiper={setThumbsSwiper} modules={[FreeMode, Thumbs]} spaceBetween={16} slidesPerView={3} direction={'vertical'} autoHeight freeMode={true} watchSlidesProgress={true} breakpoints={breakpointsConfig} className="gallery-img h-100">
            {photos.map((photo:any, index:any) => {
             
              return (
              <SwiperSlide key={index}>
                <div className="img">
                  {photo ? (
                    <img src={process.env.NEXT_PUBLIC_API + photo} />
                  ) : (
                    <p className="my-0 text-center fz-14">No se ha proporcionado una URL de imagen válida</p>
                  )}
                </div>
              </SwiperSlide>
              );
            })}
          </Swiper>

          <button type="button" onClick={sliderNext} className="btn-slider-nav nav-next">
            <i className="fa-solid fa-chevron-down"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
