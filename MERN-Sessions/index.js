const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Session = require("express-session");
const app = express();
const SessionOptions = {
  secret: "I am a secret",
  resave: false,
  saveUninitialized: false,
};
app.use(Session(SessionOptions));

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Campground");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/viewPage", (req, res) => {
  if (req.session.count) {
    req.session.count += 1;
  } else {
    req.session.count = 1;
  }
  res.send(`You visited the page ${req.session.count} times`);
});

app.get("/register", (req, res) => {
  const { userName = "Anonymous" } = req.query;
  req.session.userName = userName;
  res.redirect("/greet");
});
app.get("/greet", (req, res) => {
  const { userName } = req.session;
  res.send(`Hello, ${userName}!`);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
