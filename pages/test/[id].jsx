import React from 'react'
import { getRecipe } from '../../pages/api/spoonacular'
import Image from 'next/image'

function test({ recipe }) {
  console.log(recipe);
  return (
    <article className="flex flex-col min-h-screen items-center justify-center text-xl">
      <h1>{recipe.title || 'No recipe here'}</h1>
      <Image
        className="m-5 rounded-lg"
        src={recipe.image || '/404.gif'}
        id="banner"
        width="400px"
        height="250px"
        objectFit="contain"
        alt="Recipe image"
        title={recipe.image || 'Sorry, image not found!'}
      />
    </article>
  )
}

export default test

export async function getServerSideProps(context){
    const { params } = context
    const { id } = params
    
    const recipe = await getRecipe(id)
    return {
        props: { recipe },
    }
}