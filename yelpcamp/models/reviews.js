const mongoose = require("mongoose");
const { Schema } = mongoose;
const campground = require("./campgaurd");

const Reviewschema = new mongoose.Schema({
  body: String,
  rating: Number,
});

module.exports = mongoose.model("Review", Reviewschema);
