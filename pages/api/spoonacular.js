export async function getRecipes() {
  const steak = await fetch(
    `https://api.spoonacular.com/recipes/random?tags=steak&number=6&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const chicken = await fetch(
    `https://api.spoonacular.com/recipes/random?tags=chicken&number=6&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const eggs = await fetch(
    `https://api.spoonacular.com/recipes/random?tags=eggs&number=6&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const random = await fetch(
    `https://api.spoonacular.com/recipes/random?number=6&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )

  const recipes = {
    steak: await steak.json(),
    chicken: await chicken.json(),
    eggs: await eggs.json(),
    random: await random.json(),
  }
  return recipes
}

export async function getSimilar(id) {
  const getRecipes = await fetch(
    `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&number=7`
  )
  const recipes = await getRecipes.json()
  return recipes.filter((recipe) => recipe.id === id)
}

export async function getRecipe(id) {
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.NEXT_PUBLIC_API_KEY}`
  )
  const recipe = await response.json()
  return recipe
}
