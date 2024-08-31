const express = require("express");
const path = require("path");

const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Campground");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
//Passing string in the Function to enable the signed cookies
app.use(cookieParser("This is my secret"));

app.get("/greet", (req, res) => {
  const { name } = req.cookies;
  res.send(`MY name is ${name}`);
});

app.get("/setname", (req, res) => {
  res.cookie("name", "stevie rogers");
  res.cookie("animal", "rooster", { signed: true });
  res.send("ok sent you a cookie");
});

app.get("verifyFruit", (req, res) => {
  console.log(req.cookies);
  //if you change the signed cookies it will detect that and will not display its value
  console.log(req.signedCookies);

  res.send(req.signedCookies);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
