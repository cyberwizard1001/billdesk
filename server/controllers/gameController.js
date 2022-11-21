const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { game } = require("../models/game");

router.get("/", (req, res) => {
  game.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving game data :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", async (req, res) => {
    var game = new game({
      name: req.body.name,
      gameID: req.body.gameID,
      link: req.body.link,
      studio: req.body.studio,
      date_of_release: req.body.date_of_release,
      popularity: req.body.popularity,
      minimum_requirements: req.body.minimum_requirements,
      optimum_requirements: req.body.optimum_requirements,
      cost: req.body.cost,
      issues: req.body.issues,
      version: req.body.version
    });

    const itemExist =   await game.findOne({productID: req.body.productID});
    if(itemExist){
        res.send(400, "Game already exists in database");
        console.log("Game already exists in database");
    }
    else{
      game.save((err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.log(
              "Error in saving game details: " + JSON.stringify(err, undefined, 2)
            );
            res.send(400,"Error in saving game details: " + JSON.stringify(err, undefined, 2));
          }
        });
    }    
  });


  router.put("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);
  
      var game = new game({
        name: req.body.name,
        gameID: req.body.gameID,
        link: req.body.link,
        studio: req.body.studio,
        date_of_release: req.body.date_of_release,
        popularity: req.body.popularity,
        minimum_requirements: req.body.minimum_requirements,
        optimum_requirements: req.body.optimum_requirements,
        cost: req.body.cost,
        issues: req.body.issues,
        version: req.body.version
      });
  
    game.findByIdAndUpdate(
      req.params.id,
      { $set: game },
      { new: true },
      (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log(
            "Error in updating game details: " + JSON.stringify(err, undefined, 2)
          );
        }
      }
    );
  });
  
  router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    game.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in deleting game details: " + JSON.stringify(err, undefined, 2)
        );
      }
    });
  });
  
  router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    game.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Retriving game data :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
  });
  
  module.exports = router;
  