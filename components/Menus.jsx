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
import { Box, Divider, Typography } from '@mui/material'
import { Tooltip } from '@mui/material'
import Card from './Card'

const Menu = ({ title, recipes }) => {
  if (recipes.length == 0) return ''
  
  return (
    <Box
      className="container relative my-0 w-full  px-10 py-10 md:w-11/12 "
      component="section"
    >
      <Divider textAlign="left" className="w-full">
        <Typography variant="h5" component="h2" >
          {title}
        </Typography>
      </Divider>

      <Swiper
        slidesPerView={'auto'}
        slidesPerGroupAuto={'auto'}
        spaceBetween={30}
        loop={false}
        loopFillGroupWithBlank={true}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper mt-5"
      >
        {recipes.map((recipe) => (

          <SwiperSlide
            key={recipe.title}
            className="swiper-slide item  flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg"
          >
            <Card recipe={recipe} key={recipe.id + 1} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  )
}

export default Menu
