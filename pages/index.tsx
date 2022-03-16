import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Menu from '../components/Menus'

const Home: NextPage = () => {
  /*fetch('https://api.spoonacular.com/recipes/661557/information?includeNutrition=false&apiKey=c09e8f38556b4770bebb889afdcaae32')
    .then(response => response.json())
    .then(response => console.log(response))
  */
  return (
    <div className="py-5  lg:w-3/4 font-poppins flex min-h-screen flex-col items-center justify-center pb-2 w-full">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className='w-full  lg:w-3/4 flex flex-col items-center justify-center '>
        <Menu title='Meals'/>  
        <Menu title='Vegan'/>  
        <Menu title='Vegetarian'/>  
      </main>
    </div>
  )
}

export default Home
