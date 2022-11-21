const mongoose = require("mongoose");

var pc = mongoose.model("PC", {
  name: { type: String },
  productID: { type: String },
  price: { type: Number },
  link: { type: String },
  oem: { type: String },
  service_locations: { type: String },
  cpu: { type: String },
  gpu: { type: String },
  storage: { type: String },
  memory: { type: String },
  additional_info: { type: String },
});

module.exports = { PC: pc };
