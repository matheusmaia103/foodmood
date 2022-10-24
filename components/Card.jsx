import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Tooltip } from '@material-ui/core'

function Card({recipe}) {
  const handleError = e => {
    console.error(e)
  }

  const imageCheck = (img) => {
    if(img) return img
    else return '/404.gif'
  }
  return (
      <>
      
      <Link href={`${/test/recipe.id}`} passHref>
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
          alt={`${recipe.title} image`}
          src={imageCheck(recipe.image)}
          layout="fill"
          objectFit="cover"
          onError={(e) => handleError(e)}
          />
        </>
  )
}

export default Card