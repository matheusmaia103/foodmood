import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'
import Menu from '../components/Menus'
import { getRecipes } from './api/spoonacular'
import { CloseRounded, SearchRounded } from '@mui/icons-material'
import { Button } from '@mui/material'
import {
  Autocomplete,
  CircularProgress,
  IconButton,
  Paper,
} from '@mui/material'
import {
  TextField
} from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment'
import Card from '../components/Card'

const Home = ({ recipes }) => {
  const [value, setValue] = useState('')
  const [query, setQuery] = useState('')
  const [data, setData] = useState([])
  const [length, setLength] = useState(0)
  const [title, setTitle] = useState('')
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setQuery(value)
  }
  const handleClear = e => {
    setQuery('')
    setData('')
    setValue('')
  }

  useEffect(async () => {
    if(query === '') return
    setData([])
    setTitle(`Searching for ${query}`)

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SEARCH_URL}&query=${query}&number=15`
    )
    const result = await response.json()
    setData( result.results)
    setLength(result.results.length)

    data.length > 0
      ? setTitle(`Found ${length} recipes for `)
      : setTitle(`No recipes found for `)
  }, [query])

  const { random, vegan, vegetarian } = recipes
  const RecipesData = vegan.recipes
  const options = [{ title: 'egg' }, { title: 'chicken' }, { title: 'boiled' }]

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-5 pb-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container relative col-span-12  mb-4  w-full  px-10 py-10 md:max-w-4xl md:rounded-lg">
        <h1 className="mb-3 w-full text-center text-6xl font-medium">
          Food<span className="text-green-700">Mood</span>
        </h1>
        <form
          className="relative flex flex-col md:flex-row"
          onSubmit={handleSubmit}
        >
          <label className="z-10 mb-4 text-lg md:w-3/4">
            <h2 className="w-full text-2xl font-normal">
              Find Delicious Recipes
            </h2>
            <br />

            <section className="block flex w-full items-center md:w-4/6">
              <Autocomplete
                id="search-input"
                freeSolo
                fullWidth
                options={options.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search now!"
                    value={value}
                    onChange={(e) => handleChange(e)}
                  />
                )}
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
            </section>
          </label>
        </form>
      </header>
      {query ? (
        <main className="container max-w-4xl rounded-lg bg-white bg-white px-10 py-5">
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
            <div className="flex w-full items-center justify-center text-rose-500">
              <CircularProgress color="inherit" />
            </div>
          ) : (
            ''
          )}
        </main>
      ) : (
        <section className="flex  w-full flex-col items-center justify-center  ">
          <Menu title="Trending" recipes={random.recipes} />
          <Menu title="Vegan" recipes={vegan.recipes} />
          <Menu title="Vegetarian" recipes={vegetarian.recipes} />
        </section>
      )}
    </div>
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
