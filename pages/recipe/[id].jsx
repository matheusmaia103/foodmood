import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import {
  AccessTimeRounded,
  ArrowBackRounded,
  FavoriteRounded,
  HealthAndSafetyRounded,
} from '@mui/icons-material'
import Tab from '@mui/material/Tab'
import TabContext from '@mui/lab/TabContext'
import TabPanel from '@mui/lab/TabPanel'
import TabList from '@mui/lab/TabList'
import Box from '@mui/material/Box'
import Menu from '../../components/Menus'
import { Divider, IconButton, Tooltip, Typography } from '@mui/material'
import { HomeRounded } from '@mui/icons-material'



const RecipePage = ({ recipe, similars }) => {
  const router = useRouter()
  console.log(recipe)
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
      <div className="container w-full px-10">
        <Tooltip title="Back">
          <IconButton
            onClick={() => router.back()}
            color="secondary"
          >
            <ArrowBackRounded />
          </IconButton>
        </Tooltip>
        <Link href="/" passHref>
          <Tooltip title="Home page">
            <IconButton color="secondary">
              <HomeRounded />
            </IconButton>
          </Tooltip>
        </Link>
      </div>

      <section className="container flex  w-full flex-col items-center justify-evenly px-5 py-10 sm:flex-col md:flex-row md:flex-row">
        <Image
          className="m-5 rounded-lg"
          src={recipe.image}
          width="400px"
          height="250px"
          objectFit="contain"
          alt="Recipe image"
        />
        <div className="mt-5 flex flex-col items-center md:ml-5">
          <h1 className="mb-3 w-full text-center text-4xl font-medium">
            {recipe.title}
          </h1>
          <p className="mb-3 flex w-full items-center justify-center text-center text-2xl  font-normal ">
            <AccessTimeRounded />
            Ready in{' '}
            {recipe.readyInMinutes > 120
              ? `${(recipe.readyInMinutes % 60).toFixed()} hours`
              : `${recipe.readyInMinutes} minutes`}{' '}
          </p>
          <p className="mb-3 flex w-full items-center justify-around text-2xl  font-normal text-rose-500 ">
            
            <Tooltip title="Health score">
              <IconButton color="secondary">
                <HealthAndSafetyRounded />
                {recipe.healthScore}
              </IconButton>
            </Tooltip>
            <Tooltip title="Likes">
              <IconButton color="secondary">
                <FavoriteRounded />
                {recipe.aggregateLikes}
              </IconButton>
            </Tooltip>
          </p>
        </div>
      </section>

      <section className="container flex flex-col items-center justify-center px-10 py-10 sm:flex-col">
        <Divider textAlign="left" className="w-full">
          <Typography variant="h4" component="h2" className="px-2">
            Description
          </Typography>
        </Divider>
        <br />
        <div
          className="mb-1 text-base  font-normal "
          dangerouslySetInnerHTML={{ __html: recipe.summary }}
        ></div>
      </section>
      <section className="container flex flex-col items-center justify-center px-10 py-10 sm:flex-col">
        <Box sx={{ width: '100%' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                textColor="primary"
                indicatorColor="primary"
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Ingredients" value="1" className="" />
                <Tab label="Instructions" value="2" className="" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <ul>
                {recipe.extendedIngredients.map((ingredient) => (
                  <li className="text-base font-normal" key={ingredient.id}>
                    {ingredient.original}
                  </li>
                ))}
              </ul>
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

export async function getServerSideProps(context) {
  const  {params} = context
  const {id} = params

  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )
  const recipe = await response.json()

  const similarResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SEARCH_URL}&query=${recipe.title.split(' ')[0]}&tags=${recipe.diets}&number=10`
  )
  const similars = await similarResponse.json()
  return {
    props: { recipe, similars },
  }
}
