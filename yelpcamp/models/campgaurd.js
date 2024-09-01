const mongoose = require("mongoose");
const reviews = require("./reviews");
const { campgroundSchema } = require("../schema");
const schema = mongoose.Schema;

const campGroundSchema = mongoose.Schema({
  title: String,
  price: Number,
  image: String,
  description: String,
  location: String,
  review: [
    {
      type: schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});
campGroundSchema.post("findOneAndDelete", async function (params) {
  if (params) {
    await reviews.deleteMany({ _id: { $in: params.review } }, { multi: true });
  }
});
module.exports = mongoose.model("Campground", campGroundSchema);
