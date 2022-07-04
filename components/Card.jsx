import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Tooltip } from '@material-ui/core'

function Card({recipe}) {
  const handleError = e => {
    console.error(e)
  }
  return (
      <>
      
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
        alt={`${recipe.title} image`}
        src={recipe.image}
        layout="fill"
        objectFit="cover"
        onError={(e) => handleError(e)}
        />
        </>
  )
}

export default Card