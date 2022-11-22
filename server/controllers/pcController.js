const express = require("express");
var router = express.Router();
var ObjectId = require("mongoose").Types.ObjectId;

var { PC } = require("../models/pc");

router.get("/", (req, res) => {
  PC.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log(
        "Error in Retriving PC data :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.post("/", async (req, res) => {
  var pc = new PC({
    name: req.body.name,
    productID: req.body.productID,
    price: req.body.price,
    link: req.body.link,
    oem: req.body.oem,
    service_locations: req.body.service_locations,
    cpu: req.body.cpu,
    gpu: req.body.gpu,
    storage: req.body.storage,
    memory: req.body.memory,
    additional_info: req.body.additional_info,
  });

  const itemExist =   await PC.findOne({productID: req.body.productID});
  if(itemExist){
      res.send(400, "PC already exists in database");
      console.log("PC already exists in database");
  }
  else{
    pc.save((err, doc) => {
        if (!err) {
          res.send(doc);
        } else {
          console.log(
            "Error in saving PC details: " + JSON.stringify(err, undefined, 2)
          );
          res.send(400,"Error in saving PC details: " + JSON.stringify(err, undefined, 2));
        }
      });
  }

  
});

router.put("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  var pc = {
    name: req.body.name,
    productID: req.body.productID,
    price: req.body.price,
    link: req.body.link,
    oem: req.body.oem,
    service_locations: req.body.service_locations,
    cpu: req.body.cpu,
    gpu: req.body.gpu,
    storage: req.body.storage,
    memory: req.body.memory,
    additional_info: req.body.additional_info,
  };

  PC.findByIdAndUpdate(
    req.params.id,
    { $set: pc },
    { new: true },
    (err, doc) => {
      if (!err) {
        res.send(doc);
      } else {
        console.log(
          "Error in updating PC details: " + JSON.stringify(err, undefined, 2)
        );
      }
    }
  );
});

router.delete("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  PC.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in deleting PC details: " + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

router.get("/:id", (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

  PC.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.send(doc);
    } else {
      console.log(
        "Error in Retriving PC data :" + JSON.stringify(err, undefined, 2)
      );
    }
  });
});

module.exports = router;
