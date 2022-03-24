import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/bundle'

// import required modules
import { Navigation } from 'swiper'

const Menu = ({ title, recipes }) => {
  //const [width, setWidth] = useState(0)
  //useEffect(() => setWidth(window.screen.height), [window.screen.height])
  return (
    <section className="container relative my-0 w-full  px-10 py-10 md:w-11/12 ">
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
        {recipes.map((recipe) => (
          <SwiperSlide key={recipe.title} className="swiper-slide item  flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg">
            <Link href={`/recipe/${recipe.id}`} passHref>
              <h4 
                className=" z-10 flex h-full w-full flex-row items-end justify-center text-center text-sm font-normal"
                >

                {recipe.title.split(' ').length > 4
                  ? recipe.title.split(' ').slice(0, 4).join(' ').concat('...')
                  : recipe.title}
              </h4>
            </Link>
            <Image
              className="absolute z-0"
              src={recipe.image}
              layout="fill"
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Menu