import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import {
  AccessTimeRounded,
  Person,
  FavoriteRounded,
  ThumbUpAltRounded,
} from '@mui/icons-material'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList'
import Box from '@mui/material/Box'
import { getSimilar } from '../pages/api/spoonacular'
import Menu from '../components/Menus'

/*

      <section className="container flex flex-col items-center justify-center px-10 py-10">
        <h2 className="mb-3 w-full text-4xl font-medium">Ingredients:</h2>
        <div className="flex w-full flex-col items-center justify-start">
          {recipe.extendedIngredients.map((ingredient) => (
            <p className="mb-text-lg font-normal text-slate-400 ">
              {ingredient.original}
            </p>
          ))}
        </div>
      </section>
      */

const RecipePage = ({ recipe, similars }) => {
  console.log(similars)
  const [value, setValue] = useState('1')

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <article className="flex min-h-screen w-full flex-col items-center justify-center py-2">
      <Head>
        <title>{recipe.title}</title>
        <meta name="description" content={recipe.summary} />
        <meta name="keywords" content={recipe.diets} />
      </Head>

      <section className="container flex w-full flex-col items-center justify-evenly px-10 py-10 sm:flex-col md:flex-row md:flex-row">
        <Image
          className="m-5 rounded-lg"
          src={recipe.image}
          width="400px"
          height="300px"
          alt="Recipe image"
        />
        <div className="items-left mt-5 flex flex-col md:ml-5">
          <h1 className="mb-3 w-full text-4xl font-medium">{recipe.title}</h1>
          <p className="mb-3 flex w-full items-center text-2xl  font-normal text-slate-500 ">
            <AccessTimeRounded />
            Ready in {recipe.readyInMinutes} minutes
          </p>
          <a
            className="mb-3 flex w-full items-center text-2xl  font-normal text-slate-500 "
            href={recipe.sourceUrl}
          >
            <Person />
            {recipe.sourceName}
          </a>
        </div>
      </section>

      <section className="container flex flex-col items-center justify-center px-10 py-10 sm:flex-col">
        <h2 className="mb-3 w-full text-4xl font-medium">Description:</h2>
        <div
          className="mb-1 text-lg  font-normal "
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></div>
      </section>
      <section className="container flex flex-col items-center justify-center px-10 py-10 sm:flex-col">
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Ingredients" value="1" className="" />
                <Tab label="Instructions" value="2" className="" />
              </TabList>
            </Box>
            <TabPanel value="1">
              {recipe.extendedIngredients.map((ingredient) => (
                <p className="mb-text-lg font-normal" key={ingredient.id}>{ingredient.original}</p>
              ))}
            </TabPanel>
            <TabPanel value="2">
              <div
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              ></div>
            </TabPanel>
          </TabContext>
        </Box>
      </section>
      <Menu title="Similar recipes" recipes={similars.results} />
    </article>
  )
}

export default RecipePage
//api.spoonacular.com/recipes/641063/information?includeNutritiosn=false&apiKey=c09e8f38556b4770bebb889afdcaae32

export async function getServerSideProps(context) {
  const  {params} = context
  const {id} = params

  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )
  const recipe = await response.json()

  const similarResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SEARCH_URL}&tags=${recipe.diets}&number=10`
  )
  const similars = await similarResponse.json()
  //const similars = await getSimilar(recipe.id)
  return {
    props: { recipe, similars },
  }
}
