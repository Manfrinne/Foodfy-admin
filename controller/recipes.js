

exports.index = function(req, res) {
    return res.render("admin/recipes/index")
}

exports.create = function(req, res) {
    return res.render("admin/recipes/create")
}

exports.show = function(req, res) {
    return res.render("admin/recipes/show")
}

exports.edit = function(req, res) {
    return res.render("admin/recipes/edit")
}