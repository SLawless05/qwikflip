var db = require("../models");

module.exports = function (app) {
  
  // Get all posts
  app.get("/api/items", function (req, res) {
    db.Item.findAll({include: [db.User]}).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });
  // Get all by category
  app.get("/api/items/:category", function (req, res) {
    db.Item.findAll({include: [db.User], where: req.params }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });
  // Get one post by id
  app.get("/api/items/:id", function (req, res) {
    db.Item.findOne({include: [db.User], where: req.params }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });
  // Get all posts of a user
  app.get("/api/posts/:userid", function (req, res) {
    db.Item.findAll({include: [db.User], where: req.params }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });

  // Create a new post
  app.post("/api/posts", function (req, res) {
    db.Item.create(req.body).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });

  //Edit a post
  app.put("api/posts", function(req, res){
    db.Item.update(req.body, {where: {id: req.body.id}}).then(function(data){
      res.json(data);
    }).catch(err => res.json(err));
  })

  // Delete a post by id
  app.delete("/api/posts/:id", function (req, res) {
    db.Item.destroy({ where: req.params }).then(function (data) {
      res.json(data);
    }).catch(err => res.json(err));
  });
};
