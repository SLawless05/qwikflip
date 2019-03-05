var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Item.findAll({ include: [db.User] }).then(function (data) {
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

  app.get("/logout", function(req, res){
    // req.logout();
    res.redirect("/");
  })


  app.get("/members", function(req, res){
    if(req.user){
      db.Item.findAll({ include: [db.User] }).then(function (data) {
        res.render("members", {
          items: data
        });
      });


    }else{
      res.redirect("/login");
    }
  })

  app.get("/members/account", function (req, res) {
   
    if(req.user){
      db.User.findOne({ where: { id: req.user.id } }).then(function(result){

        db.Item.findAll({ include: [db.User], where: {UserId: req.user.id} }).then(data => res.render("account", { items: data,
        user: result}))
  
      }).catch(err => res.json(err))

    }else{
      res.redirect("/login");
    }
    
      
    
  });

  app.get("/newitem/:UserId", function (req, res) {
    res.render("postItem", req.params);
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
