export async function getRecipes() {
  const vegans = await fetch(
    `https://api.spoonacular.com/recipes/random?tags=vegan&number=10&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const vegetarian = await fetch(
    `https://api.spoonacular.com/recipes/random?tags=vegetarian&number=10&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const random = await fetch(
    `https://api.spoonacular.com/recipes/random?number=10&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const recipes = {
    vegan: await vegans.json(),
    vegetarian: await vegetarian.json(),
    random: await random.json(),
  }
  return recipes
}

export async function getSimilar(id) {
  const getRecipes = await fetch(
    `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=10`
  )
  const recipes = await getRecipes.json()
  return recipes
}
