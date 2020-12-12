
exports.redirect = function(req, res) {
  return res.redirect("recipes")
}

exports.index = function(req, res) {
  return res.render("admin/recipes/index")
}

exports.create = function(req, res) {
  return res.render("admin/recipes/create")
}
