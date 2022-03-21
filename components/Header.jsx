import React from 'react'
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
      <form className="relative flex flex-col md:flex-row">
        <label className="z-10 mb-4 text-lg md:w-3/4">
          <h2 className="w-full text-2xl font-normal">Search now</h2>
          <input
            type="text"
            className="mt-2 inline-block w-4/6 md:w-1/2 rounded-lg  border-2 border-green-700 bg-transparent py-1 px-4"
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
  )
}

export default Header