const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { software } = require("../models/software");

router.get("/", (req, res) => {
  software.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving software data :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", async (req, res) => {
    var software = new software({
      name: req.body.name,
      softwareID: req.body.softwareID,
      link: req.body.link,
      developer: req.body.developer,
      date_of_release: req.body.date_of_release,
      minimum_requirements: req.body.minimum_requirements,
      optimum_requirements: req.body.optimum_requirements,
      cost: req.body.cost,
      issues: req.body.issues,
      version: req.body.version
    });

    const itemExist =   await software.findOne({productID: req.body.productID});
    if(itemExist){
        res.send(400, "Software already exists in database");
        console.log("Software already exists in database");
    }
    else{
      software.save((err, doc) => {
          if (!err) {
            res.send(doc);
          } else {
            console.log(
              "Error in saving software details: " + JSON.stringify(err, undefined, 2)
            );
            res.send(400,"Error in saving software details: " + JSON.stringify(err, undefined, 2));
          }
        });
    }
    });


  router.put("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);
  
      var software = new software({
        name: req.body.name,
        softwareID: req.body.softwareID,
        link: req.body.link,
        developer: req.body.developer,
        date_of_release: req.body.date_of_release,
        minimum_requirements: req.body.minimum_requirements,
        optimum_requirements: req.body.optimum_requirements,
        cost: req.body.cost,
        issues: req.body.issues,
        version: req.body.version
      });
  
    software.findByIdAndUpdate(
      req.params.id,
      { $set: software },
      { new: true },
      (err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log(
            "Error in updating software details: " + JSON.stringify(err, undefined, 2)
          );
        }
      }
    );
  });
  
  router.delete("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    software.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in deleting software details: " + JSON.stringify(err, undefined, 2)
        );
      }
    });
  });
  
  router.get("/:id", (req, res) => {
    if (!ObjectId.isValid(req.params.id))
      return res.status(400).send(`No record with given id : ${req.params.id}`);
  
    software.findById(req.params.id, (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in Retriving software data :" + JSON.stringify(err, undefined, 2)
        );
      }
    });
  });
  
  module.exports = router;
  