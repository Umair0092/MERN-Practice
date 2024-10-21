const express = require("express");
const path = require("path");
const app = express();
const { v4: uuid } = require("uuid");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
uuid();
const port = "3000";
app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

let comments = [
  {
    id: uuid(),
    name: "umair",
    comment: "lol that was funny",
  },
  {
    id: uuid(),
    name: "ali",
    comment: "haha that was so funny",
  },
  {
    id: uuid(),
    name: "ahmed",
    comment: "haha that was so not to much funny",
  },
  {
    id: uuid(),
    name: "aysha",
    comment: "i need job",
  },
];

app.listen(port, () => {
  console.log("listining on the port 3000");
});

app.get("/comments", (req, res) => {
  res.render("index", { comments });
});

app.get("/comments/new", (req, res) => {
  res.render("new");
});

app.post("/comments", (req, res) => {
  const { name, comment } = req.body;
  comments.push({ id: uuid(), name, comment });
  res.redirect("/comments");
});

app.patch("/comments/:id", (req, res) => {
  const id = req.params.id;
  const newcomment = req.body.comment;
  const c = comments.find((comment) => comment.id === id);
  c.comment = newcomment;
  console.log(req.body);
  res.redirect("/comments");
});

app.get("/comments/:id", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === id);
  res.render("show", { comment });
});

app.post("/tacos", (req, res) => {
  console.log(req.body);
  res.send("post request");
});

app.get("/comments/:id/edit", (req, res) => {
  const id = req.params.id;
  const comment = comments.find((comment) => comment.id === id);
  res.render("edit", { comment });
});

app.delete("/comments/:id", (req, res) => {
  const id = req.params.id;
  comments = comments.filter((comment) => comment.id !== id);
  res.redirect("/comments");
});
