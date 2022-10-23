import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Menu from '../components/Menus'
import { getRecipes } from './api/spoonacular'
import { CloseRounded, SearchRounded } from '@mui/icons-material'
import {
  Autocomplete,
  CircularProgress,
  IconButton,
  Paper,
} from '@mui/material'
import { TextField } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '../components/Card'

const Home = ({ recipes }) => {
  const { random, vegan, vegetarian } = recipes
  const [value, setValue] = useState('')
  const [query, setQuery] = useState('')
  const [data, setData] = useState([{}])
  const [title, setTitle] = useState('')
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(value)
  }
  const handleClear = () => {
    setQuery('')
    setData('')
    setValue('')
  }

  useEffect(() => {
  console.log(recipes)
  },[])

  useEffect(async () => {
    if (query === '') {
      handleClear()
    }
    setTitle(`Searching for `)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SEARCH_URL}&query=${query}&number=12`
    )
    const result = await response.json()
    const recipes = await result.results
    setData(recipes)
    console.clear()
  }, [query])
  
  useEffect(() => {
    data.length > 0
      ? setTitle(`Found ${data.length} recipes for `)
      : setTitle(`No recipes found for `)
  }, [data])

  useEffect(() => {
    if(query === '') return
    console.log('Results for ' + query)
    console.log(data)
  }, [data])

  return (
    <>
      <Head>
        <title>FoodMood</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="w-full px-10 py-10">
        <h1 className="mb-3 w-full text-center text-6xl font-medium">
          Food<span className="text-green-700">Mood</span>
        </h1>
        <label className="z-10 mb-4 text-lg md:w-3/4">
          <h2 className="w-full text-2xl font-normal">
            Find Delicious Recipes
          </h2>
          <br />
        </label>

        <form
          onSubmit={handleSubmit}
          className=" flex w-full items-center md:w-5/6"
        >
          <TextField
            label="Search now!"
            variant="outlined"
            color="primary"
            value={value}
            onChange={(e) => handleChange(e)}
            InputProps={{
              endAdornment: (
                <IconButton size="small" onClick={handleClear}>
                  <CloseRounded />
                </IconButton>
              ),
            }}
          />
          <IconButton
            variant="contained"
            color="primary"
            type="submit"
            size="large"
            onClick={(e) => handleSubmit(e)}
            className="mx-2 bg-gradient-to-r from-green-700 via-green-600 to-green-500 text-white"
          >
            <SearchRounded />
          </IconButton>
        </form>
      </header>
      <div className="min-h-screen w-full py-5 pb-2">
        {query ? (
          <main className="container max-w-4xl rounded-lg bg-white px-10 py-5">
            <h3 className="mb-5 block w-full text-lg font-semibold">
              {title} <span className="text-rose-500">{query}</span>
            </h3>
            {title.split(' ')[0] === 'Found' ? (
              <ul className="grid w-full list-none grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {data.map((recipe) => (
                  <li
                    key={recipe.id}
                    className="item relative col-span-1 m-2 flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg"
                  >
                    <Card recipe={recipe} />
                  </li>
                ))}
              </ul>
            ) : title.split(' ')[0] === 'Searching' ? (
              <div className="flex w-full justify-center">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              ''
            )}
          </main>
        ) : (
          <section className="flex  w-full flex-col items-center justify-center">
            <Menu title="Trending" recipes={random.recipes} />
            <Menu title="Vegan" recipes={vegan.recipes} />
            <Menu title="Vegetarian" recipes={vegetarian.recipes} />
          </section>
        )}
      </div>
    </>
  )
}

export default Home

export async function getStaticProps() {
  const recipes = await getRecipes()
  return {
    props: { recipes },
    revalidate: 86400,
  }
}
