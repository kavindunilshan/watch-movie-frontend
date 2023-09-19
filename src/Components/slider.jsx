import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

import { fetchData } from '../Services/httpService';

function Slider() {
  const [images, setImages] = useState();

  useEffect(()=>{
    const fetchImages = async () => {
      try {
        const data = await fetchData("/pictures");
        setImages(data);
        console.log("working ", data);
      } catch {
        console.log("Error has occured.");
      }
    }

    return () => {
      fetchImages();
    }
  }, []);


  return (
    <div className="slider-container">
      <h1 className="slider-heading animated-text">PREMIERING NOW</h1>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={3}
        spaceBetween={20}
        coverflowEffect={{
          rotate: 12,
          stretch: 0,
          depth: 100,
          modifier: 2.5
        }}
        pagination={{ el: '.swiper-pagination', clickable: true }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
          clickable: true,
        }}
        autoplay={{ 
          delay: 3000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >

        {images && images.map((image) => {
          if(image.id.pid === 1) {
            return  <SwiperSlide>
                      <img src={image.name} alt="slide_image" />
                    </SwiperSlide>
          }
        })}
        

        <div className="slider-controler">
          <div className="swiper-button-prev slider-arrow">
            <ion-icon name="arrow-back-outline"></ion-icon>
          </div>
          <div className="swiper-button-next slider-arrow">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </Swiper>
    </div>
  );
}

export default Slider;