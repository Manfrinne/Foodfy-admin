const fs = require("fs")
const data = require("../data.json")

exports.redirect = function(req, res) {
  return res.redirect("recipes")
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

  let number = 1
  const lastRecipe = data.recipes[data.recipes.length - 1]
  if (lastRecipe) {
    number = lastRecipe.number + 1
  }

  // variável temporária
  let title = "Nova receita"
  let author = "Nome do Autor"

  data.recipes.push({
    image_url,
    title,
    number,
    author,
    ingredients,
    preparation_step,
    additional_information,
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error!")

    return res.redirect("recipes")
  })
}

exports.show = function(req, res) {
  const {number} = req.params

  const foundRecipe = data.recipes.find(function(recipe) {
    return recipe.number == number
  })

  if (!foundRecipe) return res.send("RECIPE NOT FOUND!")

  const recipe = {
    ...foundRecipe
  }

  return res.render("admin/recipes/show", {recipe})
}

exports.edit = function(req, res) {
  const {number} = req.params

  const foundRecipe = data.recipes.find(function(recipe) {
    return recipe.number == number
  })

  if (!foundRecipe) return res.send("RECIPE NOT FOUND!")

  const recipe = {
    ...foundRecipe
  }

  return res.render("admin/recipes/edit", {recipe})
}

exports.delete = function(req, res) {
  const {number} = req.body

  // Tudo que retornar TRUE será colocado dentro do array 'filteredRecipes'.
  const filteredRecipes = data.recipes.filter(function(recipe){
    return recipe.number != number // 'id' não pode ser deletado agora
  })

  data.recipes = filteredRecipes

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
      if(err) return res.send("Delete error!")

      return res.redirect("recipes")
    }
  )
}
