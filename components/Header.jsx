import React from 'react'
import Link from 'next/link'
import {
  SearchRounded,
  LunchDiningRounded,
  LocalPizzaRounded,
  LocalBarRounded,
  HealthAndSafetyRounded,
} from '@mui/icons-material'

const Header = () => {
  /*
  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=chicken&number=2&apiKey=c09e8f38556b4770bebb889afdcaae32`
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    */
   
  return (
    <header className="container relative mb-4  w-full  px-10 py-10 md:w-5/6 md:rounded-lg">
      <h1 className="mb-3 w-full text-6xl font-medium">
        Food<span className="text-green-700">Mood</span>
      </h1>
      <h2 className="mb-3 w-full text-2xl  font-normal">
        Find recipes that make your life better
      </h2>
      <Link href='/recipe/search' passHref>
        <button className="p-2 text-white rounded-lg bg-gradient-to-t from-green-600 to-green-700">
          SEARCH
        </button>
      </Link>
    </header>
  )
}

export default Header