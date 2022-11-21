const mongoose = require('mongoose');

var software = mongoose.model("software", {
    name: { type: String },
    softwareID: { type: String },
    developer: { type: Number },
    link: { type: String },
    minimum_requirements: { type: String },
    optimum_requirements: { type: String },
    issues: { type: String },
    version: { type: String },
    date_of_release: { type: String },
    cost : {type: Number},
    
  });
  
  module.exports = {software : software};