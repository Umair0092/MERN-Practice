const express = require("express");
const app = express();
const path = require("path");

app.listen("3000", () => {
  console.log("listning on the port 3000");
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
  const num = Math.floor(Math.random() * 10) + 1;
  res.render("home", { num });
});

app.get("/r/:subredit", (req, res) => {
  const subredit = req.params;
  res.render("subredit", subredit);
});

app.get("/rand", (req, res) => {
  const rand = Math.floor(Math.random() * 10) + 1;
  res.render("rand", { rand });
});

app.get("/cats", (req, res) => {
  const array = ["Poppy", "Bella", "Misty", "Molly", "Daisy", "Tilly"];
  res.render("cats", { array });
});
