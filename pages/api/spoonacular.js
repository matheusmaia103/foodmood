export async function getRecipes() {
  const vegans = await fetch(
    `https://api.spoonacular.com/recipes/random?tags=vegan&number=6&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const vegetarian = await fetch(
    `https://api.spoonacular.com/recipes/random?tags=vegetarian&number=6&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const random = await fetch(
    `https://api.spoonacular.com/recipes/random?number=6&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
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
    `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=7`
  )
  const recipes = await getRecipes.json()
  return recipes
}
