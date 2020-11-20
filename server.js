const express = require('express')
const nunjucks = require('nunjucks')

const recipes = require('./data')

const server = express()

server.use(express.static('./public/'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true,
})

server.get("/", function(req, res) {

    let recipesControl = []

    for(let i = 0; i < 6; i++) {
        recipesControl.push(recipes[i])
    }

    return res.render("home", {recipeData: recipesControl});
})  

server.get("/recipes", function(req, res) {

    return res.render("recipes", {recipes})
})

server.get("/recipes/:index", function(req, res) {

    const { index: recipeIndex } = req.params

    const recipe = recipes[recipeIndex]

    console.log(recipe)

    if (!recipe) return res.send("RECIPE NOT FOUND!")

    return res.render("recipe", {recipe})
})

server.get("/about", function(req, res) {
    return res.render("about")
})

server.listen(8080, function() {
})
