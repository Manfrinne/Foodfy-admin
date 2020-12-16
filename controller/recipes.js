const fs = require("fs")
const data = require("../data.json")

exports.redirect = function(req, res) {
  return res.redirect("admin/recipes")
}

exports.index = function(req, res) {
  return res.render("admin/recipes/index", {recipes: data.recipes})
}

exports.create = function(req, res) {
  return res.render("admin/recipes/create")
}

exports.post = function(req, res) {

  const keys = Object.keys(req.body)
  for (key of keys) {
      if (req.body[key] == "") {
          return res.send('PLEASE, FILL ALL FIELDS!')
      }
  }

  let {image_url, ingredients, preparation_step, additional_information} = req.body

  let id = 1
  const lastRecipe = data.recipes[data.recipes.length - 1]
  if (lastRecipe) {
    id = lastRecipe.id + 1
  }

  // variável temporária
  let title = "Nova receita"
  let author = "Nome do Autor"

  data.recipes.push({
    image_url,
    title,
    id,
    author,
    ingredients,
    preparation_step,
    additional_information,
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error!")

    return res.redirect("admin/recipes")
  })
}

exports.show = function(req, res) {
  const {id} = req.params

  const foundRecipe = data.recipes.find(function(recipe) {
    return recipe.id == id
  })

  if (!foundRecipe) return res.send("RECIPE NOT FOUND!")

  const recipe = {
    ...foundRecipe
  }

  return res.render("admin/recipes/show", {recipe})
}

exports.edit = function(req, res) {
  const {id} = req.params

  const foundRecipe = data.recipes.find(function(recipe) {
    return recipe.id == id
  })

  if (!foundRecipe) return res.send("RECIPE NOT FOUND!")

  const recipe = {
    ...foundRecipe
  }

  return res.render("admin/recipes/edit", {recipe})
}

exports.put = function(req, res) {
  const {id} = req.body

  let index = 0

  const foundRecipe = data.recipes.find(function(recipe, foundIndex) {
    if (recipe.id == id) {
      index = foundIndex

      return true
    }
  })

  if (!foundRecipe) return res.send("RECIPE NOT FOUND!")

  const recipe = {
    ...foundRecipe,
    ...req.body
  }

  data.recipes[index] = recipe

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error!")

    return res.redirect(`recipes/${id}`)
  })
}

exports.delete = function(req, res) {
  const {id} = req.body

  const filterRecipe = data.recipes.filter(function(recipes) {
    return recipes.id != id
  })

  data.recipes = filterRecipe

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("WRITE FILE ERROR!")

    return res.redirect('recipes')
  })


}

