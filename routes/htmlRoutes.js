var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Item.findAll({include: [db.User]}).then(function(data) {
      res.render("index", {
        posts: data
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/posts/:id", function(req, res) {
    db.Item.findOne({include: [db.User], where: { id: req.params.id } }).then(function(data) {
      res.render("singleItem", {
        post: data
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
