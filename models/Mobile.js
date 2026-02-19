const mongoose = require("mongoose");

const mobileSchema = new mongoose.Schema({
  name: String,
  price: Number,
  ram: String,
  storage: String
});

module.exports = mongoose.model("Mobile", mobileSchema);
