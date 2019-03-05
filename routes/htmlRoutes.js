var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Item.findAll({ include: [db.User] }).then(function (data) {
      if(req.user){
        res.redirect("/members");
      }
      res.render("index", {
        items: data
      });
    });
  });

  app.get("/signup", function (req, res) {
    res.render("register");

  });

  app.get("/login", function (req, res) {
    // res.sendfile("public/html/login.html");
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login");
  });

  app.get("/items/update/:id", function(req, res){
    db.Item.findOne({include: [db.User], where: req.params}).then(function(data){
      res.render("updateItem", data.dataValues);
      console.log(data.dataValues);
    }).catch();
  })

  // Load singleitem page and pass in an item by id
  app.get("/items/:id", function (req, res) {
    db.Item.findOne({ include: [db.User], where: { id: req.params.id } }).then(function (data) {
      res.render("singleItem", data.dataValues);
      console.log(data.dataValues);
    });
  });

  app.get("/users/:UserId", function (req, res) {
    db.User.findOne({ where: { id: req.params.UserId } }).then(function(result){

      db.Item.findAll({ include: [db.User], where: req.params }).then(data => res.render("account", { items: data,
      user: result}))

    }).catch(err => res.json(err))
      
    
  });

  app.get("/newitem/:UserId", function (req, res) {
    res.render("postItem", req.params);
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
};
