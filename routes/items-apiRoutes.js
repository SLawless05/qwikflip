var db = require("../models");
var passport = require("../config/passport");
module.exports = function (app) {

  app.post("/api/login", passport.authenticate("local"), function (req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/members");
  });

  app.post("/api/signup", function (req, res) {
    console.log(req.body);
    db.User.create(req.body).then(function () {
      res.redirect(307, "/api/login");
    }).catch(function (err) {
      console.log(err);
      res.json(err);
      // res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function (req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function (req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    }
    else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  // Get all posts
  app.get("/api/items", function (req, res) {
    db.Item.findAll({ include: [db.User] }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });
  // Get all by category
  app.get("/api/items/:category", function (req, res) {
    db.Item.findAll({ include: [db.User], where: req.params }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });
  // Get one post by id
  app.get("/api/items/:id", function (req, res) {
    db.Item.findOne({ include: [db.User], where: req.params }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });
  // Get all posts of a user
  app.get("/api/items/:UserId", function (req, res) {
    db.Item.findAll({ include: [db.User], where: req.params }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });

  // Create a new post
  app.post("/api/items", function (req, res) {
    db.Item.create(req.body).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });

  //Edit a post
  app.put("/api/items", function (req, res) {
    console.log(req.body);
    db.Item.update(req.body, { where: { id: req.body.id } }).then(function (data) {
      res.send("Success");
    }).catch(err => res.send(err));
  });

  // Delete a post by id
  app.delete("/api/items", function (req, res) {

    db.Item.destroy({
      where: req.body
    }).then(function (data) {
      res.send("Success");
    }).catch(err => res.send(err));
  });
};
