import React from 'react'
import {SearchRounded} from '@mui/icons-material'

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
            className="mt-2 inline-block rounded-lg bg-transparent border-2 border-green-700 py-1 px-4 w-3/4 lg:w-5/6"
          />
          <button  className="ml-2 inline-block rounded-full bg-green-700 py-1 px-2 text-white">
            <SearchRounded />
          </button>
        </label>
      </form>
      <div className="items-center flex w-3/4 md:w-3/6 justify-evenly">
        <div className="bg-rose-500 mx-1 h-10 w-10 cursor-pointer rounded-full"></div>
        <div className="bg-rose-500 mx-1 h-10 w-10 cursor-pointer rounded-full"></div>
        <div className="bg-rose-500 mx-1 h-10 w-10 cursor-pointer rounded-full"></div>
        <div className="bg-rose-500 mx-1 h-10 w-10 cursor-pointer rounded-full"></div>
      </div>
    </header>
  )
}

export default Header