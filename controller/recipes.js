const fs = require("fs")
const data = require("../data.json")

exports.redirect = function(req, res) {
  return res.redirect("recipes")
}

exports.index = function(req, res) {
  return res.render("admin/recipes/index")
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

  data.recipes.push({
    number,
    image_url,
    ingredients,
    preparation_step,
    additional_information,
  })

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if (err) return res.send("Write file error!")

    return res.redirect("recipes")
  })
}
