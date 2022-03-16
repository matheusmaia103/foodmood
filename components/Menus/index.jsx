import React, {useState, useEffect} from 'react'
import Image from 'next/image'

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/css/bundle'

// import required modules
import { Pagination, Navigation } from "swiper";

const Menu = ({title}) => {
    //const [width, setWidth] = useState(0)
    //useEffect(() => setWidth(window.screen.height), [window.screen.height])
  return (
    <section className="container relative my-0 w-full bg-white px-10 py-10 md:w-5/6 ">
      <h3 className="mb-4 text-2xl font-bold">{title}</h3>

      <Swiper
        slidesPerView={'auto'}
        slidesPerGroupAuto={'auto'}
        spaceBetween={30}
        loop={false}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide className="swiper-slide item  flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg">
          <h4 className="z-10 flex h-full w-full flex-row items-end justify-center text-center text-base font-semibold">
            dsadsad
          </h4>
          <Image
            className="absolute z-0"
            src="https://source.unsplash.com/200x200/?food"
            layout="fill"
            objectFit="cover"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide item  flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg">
          <h4 className="z-10 flex h-full w-full flex-row items-end justify-center text-center text-base font-semibold">
            dsadsad
          </h4>
          <Image
            className="absolute z-0"
            src="https://source.unsplash.com/200x200/?food"
            layout="fill"
            objectFit="cover"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide item  flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg">
          <h4 className="z-10 flex h-full w-full flex-row items-end justify-center text-center text-base font-semibold">
            dsadsad
          </h4>
          <Image
            className="absolute z-0"
            src="https://source.unsplash.com/200x200/?food"
            layout="fill"
            objectFit="cover"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide item  flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg">
          <h4 className="z-10 flex h-full w-full flex-row items-end justify-center text-center text-base font-semibold">
            dsadsad
          </h4>
          <Image
            className="absolute z-0"
            src="https://source.unsplash.com/200x200/?food"
            layout="fill"
            objectFit="cover"
          />
        </SwiperSlide>
        <SwiperSlide className="swiper-slide item  flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg">
          <h4 className="z-10 flex h-full w-full flex-row items-end justify-center text-center text-base font-semibold">
            dsadsad
          </h4>
          <Image
            className="absolute z-0"
            src="https://source.unsplash.com/200x200/?food"
            layout="fill"
            objectFit="cover"
          />
        </SwiperSlide>
      </Swiper>
    </section>
  )
}

export default Menu
