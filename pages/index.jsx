import Head from 'next/head'
import Header from '../components/Header'
import Menu from '../components/Menus'
import { getRecipes } from './api/spoonacular'

const Home = ({ recipes }) => {
  const { random, vegan, vegetarian } = recipes

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center py-5 pb-2">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="flex  w-full flex-col items-center justify-center lg:w-3/4 ">
        <Menu title="Trending" recipes={random.recipes} />
        <Menu title="Vegan" recipes={vegan.recipes} />
        <Menu title="Vegetarian" recipes={vegetarian.recipes} />
      </main>
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