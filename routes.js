const express = require('express')
const recipes = require('./controller/recipes')
const routes = express.Router()

//admin routes
routes.get("/admin/recipes", recipes.index)
routes.get("/admin/recipes/create", recipes.create)
routes.get("/admin/recipes/show", recipes.show)
routes.get("/admin/recipes/edit", recipes.edit)


module.exports = routes
