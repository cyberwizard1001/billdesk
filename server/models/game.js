const mongoose = require("mongoose");

var game = mongoose.model("game", {
  name: { type: String },
  gameID: { type: String },
  studio: { type: Number },
  link: { type: String },
  store: { type: String },
  minimum_requirements: { type: String },
  optimum_requirements: { type: String },
  issues: { type: String },
  version: { type: String },
  date_of_release: { type: String },
  popularity: {type: Number},
  cost : {type: Number},
  
});

module.exports = { game: game };