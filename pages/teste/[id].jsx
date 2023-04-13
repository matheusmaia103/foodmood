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
import {
  Divider,
  IconButton,
  Tooltip,
  Typography,
  CircularProgress,
} from '@mui/material'
import { HomeRounded } from '@mui/icons-material'
import { getRecipe } from '../../pages/api/spoonacular'



const RecipePage = () => {
  const router = useRouter()
  
  const [recipe, setRecipe] = useState({})
  const [value, setValue] = useState('1')
  const [similars, setSimilars] = useState([])
  
  
  useEffect( async () => {
  const query = router.query
  const id = query.id
  setRecipe( await getRecipe(id))
  console.log(recipe)
  }, [])

  if (!recipe.title)
    return (
      <article className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-emerald-100 to-emerald-50 ">
        <Head>
          <title>Loading</title>
        </Head>
        <h1 className='my-4'>Finding your recipe</h1>
        <CircularProgress color="secondary" />
      </article>
    )
  
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  
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
    </article>
  )
}

export default RecipePage
