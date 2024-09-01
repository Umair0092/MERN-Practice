const mongoose = require("mongoose");
const campGround = require("../models/campgaurd");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Campground");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await campGround.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random = Math.floor(Math.random() * cities.length);
    const c = new campGround({
      location: `${cities[random].city},${cities[random].state}`,
      title: `${sample(descriptors)},${sample(places)}`,
      image: "https://picsum.photos/800/450",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet nulla auctor",
      price: Math.floor(Math.random() * 100),
    });
    await c.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
