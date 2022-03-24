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

const SearchPage = ({staticData}) => {
  const [value, setValue] = useState('Steak')
  const [query, setQuery] = useState('steak')
  const [recipes, setRecipes] = useState(staticData.results)
  const [title, setTitle] = useState(query)
  const handleChange = (e) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setQuery(value)
  }
  const listTag = useRef(null)
  useEffect(async () => {
    setRecipes([])
    setTitle(`Searching for ${query}`)
    
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SEARCH_URL}&query=${query}&number=15`
    )
    const data = await response.json()
    setRecipes(data.results)
    console.log(recipes)
    recipes.length > 0
      ? setTitle(`Found ${recipes.length} recipes for `)
      : setTitle(`No recipes found for `)
  }, [query])
  return (
    <article className="flex w-full flex-col items-center justify-center  py-3 px-5">
      <Head>
        <title>Search recipes</title>
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
      </header>

      <main className="container max-w-4xl rounded-lg bg-white bg-white px-10 py-5">
        <h3 className="mb-5 block w-full text-lg font-semibold">
          {title} <span className="text-rose-500">{query}</span>
        </h3>
        {title.split(' ')[0] === 'Found' ? (
          <ul
            ref={listTag}
            className="grid w-full list-none grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {recipes.map((recipe) => (
              <li
                key={recipe.id}
                className="item relative col-span-1 m-2 flex cursor-pointer flex-row items-end justify-end overflow-hidden rounded-lg"
              >
                <Link href={`/recipe/${recipe.id}`} passHref>
                  <h4
                    title={recipe.title}
                    className=" z-10 flex h-full w-full flex-row items-end justify-center text-center text-sm font-normal"
                  >
                    {recipe.title.split(' ').length > 4
                      ? recipe.title
                          .split(' ')
                          .slice(0, 4)
                          .join(' ')
                          .concat('...')
                      : recipe.title}
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
        ) : title.split(' ')[0] === 'Searching' ? (
          <div className="flex w-full items-center justify-center text-rose-500">
            <CircularProgress color="inherit" />
          </div>
        ) : (
          ''
        )}
      </main>
    </article>
  )
}

export default SearchPage

export async function getStaticProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SEARCH_URL}&query=steak&number=15`
  )
  const staticData = await response.json()
  return {
    props: { staticData },
    revalidate: 86400,
  }
}
