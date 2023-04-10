import React, { useEffect, useState } from 'react'
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
import { getRecipe } from '../../pages/api/spoonacular'

export async function getServerSideProps(context) {
  const { params } = context
  const { id } = params

  const recipe = await getRecipe(id)
  return {
    props: { recipe },
  }
}

const RecipePage = ({ recipe }) => {
  if (!recipe.title)
    return (
      <article className="flex min-h-screen flex-col items-center justify-center">
        <Head>
          <title>Not found</title>
        </Head>
        <h1>Sorry, recipe not found!</h1>
        <Image
          src="/cooking.gif"
          objectFit="contain"
          width="400px"
          height="250px"
        />
      </article>
    )
  const router = useRouter()
  const [value, setValue] = useState('1')
  const [similars, setSimilars] = useState([])

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  useEffect(async () => {
    const similarResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SEARCH_URL}&query=${
        recipe.title.split(' ')[0]
      }&tags=${recipe.diets}&number=4`
    )
    const response = await similarResponse.json()
    const arr = response.results
    setSimilars(arr.filter((similar) => similar.id != recipe.id))
  }, [])

  useEffect(() => {
    console.log(recipe.title)
    console.log(recipe)
    console.log(similars)
  }, [similars])

  const imageCheck = (img) => {
    if (img) return img
    else return '/404.gif'
  }

  return (
    <article className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-b from-amber-100 to-white py-2">
      <Head>
        <title>{recipe.title}</title>
        <meta name="description" content={recipe.summary} />
        <meta name="keywords" content={recipe.diets} />
      </Head>
      <div className="container w-full px-10">
        <Tooltip title="Back">
          <IconButton onClick={() => router.back()} color="primary">
            <ArrowBackRounded />
          </IconButton>
        </Tooltip>
        <Link href="/" passHref>
          <Tooltip title="Home page">
            <IconButton color="primary">
              <HomeRounded />
            </IconButton>
          </Tooltip>
        </Link>
      </div>

      <section className="container flex  w-full flex-col items-center justify-evenly px-5 py-10 sm:flex-col md:flex-row md:flex-row">
        <Image
          className="m-5 rounded-lg"
          src={imageCheck(recipe.image)}
          id="banner"
          width="400px"
          height="250px"
          objectFit="contain"
          alt="Recipe image"
          title={recipe.image || 'Sorry, image not found!'}
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

      <Menu title="Similar recipes" recipes={similars} />
    </article>
  )
}

export default RecipePage
