import { useRef, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import {
  SearchRounded,
  LunchDiningRounded,
  LocalPizzaRounded,
  LocalBarRounded,
  HealthAndSafetyRounded,
} from '@mui/icons-material'
import { CircularProgress } from '@mui/material'
import { Checkbox } from '@mui/material'

const SearchPage = () => {
  const [value, setValue] = useState('Ice cream')
  const [query, setQuery] = useState('cream')
  const [recipes, setRecipes] = useState([])

  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(value)
  }
  useEffect(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SEARCH_URL}&query=${query}`
    )
    const data = await response.json()
    setRecipes(data.results)
  }, [query])
  return (
    <article className="flex w-full flex-col items-center justify-center bg-green-300 py-3 px-5">
      <Head>
        <title>Search recipes</title>
      </Head>
      <header className="container relative col-span-12  mb-4  w-full  px-10 py-10 md:w-5/6 md:rounded-lg">
        <h1 className="mb-3 w-full text-center text-6xl font-medium">
          Food<span className="text-green-700">Mood</span>
        </h1>
        <form
          className="relative flex flex-col md:flex-row"
          onSubmit={handleSubmit}
        >
          <label className="z-10 mb-4 text-lg md:w-3/4">
            <h2 className="w-full text-2xl font-normal">Search now</h2>
            <input
              className="mt-2 inline-block w-4/6 rounded-lg border-2  border-green-700 bg-transparent py-1 px-4 md:w-1/2"
              type="text"
              value={value}
              onChange={handleChange}
            />
            <button className="ml-2 inline-block  h-10 w-10 rounded-full  bg-gradient-to-r from-green-700 to-green-600 text-white ">
              <SearchRounded />
            </button>
          </label>
        </form>
        <div className="flex w-3/4 items-center justify-evenly md:w-3/6">
          <div
            title="pizza"
            className="mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 text-white  "
          >
            <LocalPizzaRounded />
          </div>
          <div
            title="sandwiches"
            className="mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 text-white  "
          >
            <LunchDiningRounded />
          </div>
          <div
            title="drinks"
            className="mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 text-white  "
          >
            <LocalBarRounded />
          </div>
          <div
            title="Healthy"
            className="mx-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-gradient-to-b from-rose-400 via-rose-500 to-rose-600 text-white  "
          >
            <HealthAndSafetyRounded />
          </div>
        </div>
      </header>
      <main className=" container grid w-full grid-cols-12 gap-2 ">
        <section className="container col-span-12 rounded-lg bg-white px-10 py-5 md:sticky md:top-2 md:col-span-4">
          <h3 className="mb-2 block w-full text-center text-lg font-semibold">
            Filters
          </h3>
          <ul className="list-none">
            <li className="flex items-center">
              <Checkbox label="Healthy" /> Healthy{' '}
              <span className="flex items-center text-slate-600">(3)</span>
            </li>
            <li className="flex items-center">
              <Checkbox label="Gluten free" /> Gluten free{' '}
              <span className="flex items-center text-slate-600">(5)</span>
            </li>
            <li className="flex items-center">
              <Checkbox label="Vegan" /> Vegan{' '}
              <span className="flex items-center text-slate-600">(7)</span>
            </li>
            <li className="flex items-center">
              <Checkbox label="Vegetarian" /> Vegetarian{' '}
              <span className="flex items-center text-slate-600">(7)</span>
            </li>
            <li className="flex items-center">
              <Checkbox label="Vegan" /> Vegan{' '}
              <span className="flex items-center text-slate-600">(3)</span>
            </li>
          </ul>
        </section>

        <section className="container col-span-12 rounded-lg bg-white bg-white px-10 py-5 md:col-span-8">
          <h3 className="mb-5 block w-full text-lg font-semibold">
            Found {recipes.length || 0} results for {query}
          </h3>
          <ul className="list-none w-full flex flex-col flex-wrap justify-center items-center">
            {recipes.map((recipe) => (
              <li key={recipe.id} className="m-2 item relative  flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg">
                <Link href={`/recipe/${recipe.id}`} passHref>
                  <h4 className=" z-10 flex h-full w-full flex-row items-end justify-center text-center text-sm font-normal">
                    {recipe.title}
                  </h4>
                </Link>
                <Image
                  className="absolute z-0"
                  src={recipe.image}
                  layout="fill"
                  objectFit="cover"
                />
              </li>
            ))}
          </ul>
        </section>
      </main>
    </article>
  )
}

export default SearchPage
