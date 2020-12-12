const express = require('express')
const recipes = require('./controller/recipes')
const routes = express.Router()

//admin routes
routes.get("/admin", recipes.redirect); // Redirecionar Pages

routes.get("/admin/recipes", recipes.index); // Mostrar a lista de receitas

routes.get("/admin/recipes/create", recipes.create); // Mostrar formulário de nova receita

routes.post("/admin/recipes", recipes.post); // Cadastrar nova receita

routes.get("/admin/recipes/:number", recipes.show); // Exibir detalhes de uma receita



module.exports = routes

// routes.get("/admin/recipes/:id", recipes.show); // Exibir detalhes de uma receita
// routes.get("/admin/recipes/:id/edit", recipes.edit); // Mostrar formulário de edição de receita

// routes.put("/admin/recipes", recipes.put); // Editar uma receita
// routes.delete("/admin/recipes", recipes.delete); // Deletar uma receita
