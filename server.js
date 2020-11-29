const express = require('express')
const nunjucks = require('nunjucks')
const recipes = require('./data')
const routes = require('./routes')

const server = express()

server.use(express.static('./public/'))
server.use(routes) //funçoes admin routes

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true,
})

// routes users
server.get("/", function(req, res) {

    let recipesControl = []

    for(let i = 0; i < 6; i++) {
        recipesControl.push(recipes[i])
    }

    return res.render("users/home", {recipeData: recipesControl});
}) 

server.get("/recipes", function(req, res) {

    return res.render("users/recipes", {recipes})
})

server.get("/recipes/:index", function(req, res) {

    const { index: recipeIndex } = req.params

    const recipe = recipes[recipeIndex]

    if (!recipe) return res.send("RECIPE NOT FOUND!")

    return res.render("users/recipe", {recipe})
})

server.get("/about", function(req, res) {
    return res.render("users/about")
})

server.listen(8080, function() {
    console.log("LEARN FULLSTACK DEVELOPMENT")
})
