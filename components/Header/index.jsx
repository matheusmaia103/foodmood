import React from 'react'
import {SearchRounded} from '@mui/icons-material'

const Header = () => {
  return (
    <header className="container relative mb-4  w-full bg-white px-10 py-10 md:w-5/6 md:rounded-lg">
      <h1 className="mb-3 w-full text-6xl font-medium">
        Food<span className="text-green-700">Mood</span>
      </h1>
      <h2 className="mb-3 w-full text-2xl  font-normal">
        Find recipes that make your life better
      </h2>
      <form className="relative flex flex-col md:flex-row">
        <label className="z-10 mb-4 text-lg md:w-3/4">
          <p className="text-normal font-normal">Search now</p>
          <input
            type="text"
            className="mt-2 inline-block rounded-lg border-2 border-rose-500 py-1 px-4 w-3/4 lg:w-5/6"
          />
          <button className="ml-2 inline-block rounded-full bg-rose-500 py-1 px-2 text-white">
            <SearchRounded />
          </button>
        </label>
      </form>
      <div className="items center flex w-full justify-start">
        <div className="mx-1 h-10 w-10 rounded-full bg-blue-900"></div>
        <div className="mx-1 h-10 w-10 rounded-full bg-blue-900"></div>
        <div className="mx-1 h-10 w-10 rounded-full bg-blue-900"></div>
        <div className="mx-1 h-10 w-10 rounded-full bg-blue-900"></div>
      </div>
    </header>
  )
}

export default Header