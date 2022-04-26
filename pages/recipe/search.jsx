import { useRef, useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Autocomplete, TextField } from '@mui/material'

import { CloseRounded, SearchRounded } from '@mui/icons-material'
import { Button } from '@mui/material'
import { CircularProgress, IconButton, Paper } from '@mui/material'

const top100Films = [
{ title: 'The Shawshank Redemption', year: 1994 },
{ title: "It's a Wonderful Life", year: 1946 },
{ title: 'Life Is Beautiful', year: 1997 },
{ title: 'The Usual Suspects', year: 1995 },
{ title: 'Léon: The Professional', year: 1994 },
{ title: 'Spirited Away', year: 2001 },
{ title: 'Saving Private Ryan', year: 1998 },
{ title: 'Once Upon a Time in the West', year: 1968 },
{ title: 'American History X', year: 1998 },
{ title: 'Interstellar', year: 2014 },
{ title: 'Casablanca', year: 1942 },
{ title: 'City Lights', year: 1931 },
{ title: 'Psycho', year: 1960 },
{ title: 'The Green Mile', year: 1999 },
{ title: 'The Intouchables', year: 2011 },
{ title: 'Modern Times', year: 1936 },
{ title: 'Raiders of the Lost Ark', year: 1981 },
{ title: 'Rear Window', year: 1954 },
{ title: 'The Pianist', year: 2002 },
{ title: 'The Departed', year: 2006 },
{ title: 'Terminator 2: Judgment Day', year: 1991 },
{ title: 'Back to the Future', year: 1985 },
{ title: 'Whiplash', year: 2014 },
{ title: 'Gladiator', year: 2000 },
{ title: 'Memento', year: 2000 },
{ title: 'The Prestige', year: 2006 },
{ title: 'The Lion King', year: 1994 },
{ title: 'Apocalypse Now', year: 1979 },
{ title: 'Alien', year: 1979 },
{ title: 'Sunset Boulevard', year: 1950 },
{
  title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
  year: 1964,
},
{ title: 'The Great Dictator', year: 1940 },
{ title: 'Cinema Paradiso', year: 1988 },
{ title: 'The Lives of Others', year: 2006 },
{ title: 'Grave of the Fireflies', year: 1988 },
{ title: 'Paths of Glory', year: 1957 },
{ title: 'Django Unchained', year: 2012 },
{ title: 'The Shining', year: 1980 },
{ title: 'WALL·E', year: 2008 },
{ title: 'American Beauty', year: 1999 },
{ title: 'The Dark Knight Rises', year: 2012 },
{ title: 'Princess Mononoke', year: 1997 },
{ title: 'Aliens', year: 1986 },
{ title: 'Oldboy', year: 2003 },
{ title: 'Once Upon a Time in America', year: 1984 },
{ title: 'Witness for the Prosecution', year: 1957 },
{ title: 'Das Boot', year: 1981 },
{ title: 'Citizen Kane', year: 1941 },
{ title: 'North by Northwest', year: 1959 },
{ title: 'Vertigo', year: 1958 },
{
  title: 'Star Wars: Episode VI - Return of the Jedi',
  year: 1983,
}]
const SearchPage = () => {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gradient-to-b from-rose-100 to-rose-200">
      <form action="" className="w-2/6">
        <Autocomplete
          id="search-input"
          freeSolo
          options={top100Films.map((option) => option.title)}
          renderInput={(params) => (
            <TextField {...params} label="Search now!" />
          )}
        />
{
  /*
  
        <TextField
          label="Search now!"
          variant="outlined"
          color="primary"
          value={value}
          onChange={(e) => handleChange(e)}
          InputProps={{
            endAdornment: (
              <IconButton size="small" onClick={(e) => handleClear}>
                <CloseRounded />
              </IconButton>
            ),
          }}
        />
        */
}
      </form>
    </main>
  )
}

export default SearchPage
