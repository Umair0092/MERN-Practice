const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const campGround = require("./models/campgaurd");
const reviews = require("./models/reviews");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const AppError = require("./utilities/AppError");
const joi = require("joi");
const { campgroundSchema, ReviewSchema } = require("./schema");
const WrapAsync = require("./utilities/WrapAround");
const { title } = require("process");
const app = express();

app.use(methodOverride("_method"));

main()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Campground");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/campGround", async (req, res) => {
  res.render("home");
});

app.get(
  "/campground/index",
  WrapAsync(async (req, res) => {
    const campGrounds = await campGround.find();

    res.render("cumpground/index", { campGrounds });
  })
);

app.get("/campground/index/new", async (req, res) => {
  res.render("cumpground/new");
});

const validateCampGround = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(",");
    throw new AppError(errorMessage, 400);
  } else {
    next();
  }
};
const validateReview = (req, res, next) => {
  const { error } = ReviewSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(",");
    throw new AppError(errorMessage, 400);
  } else {
    next();
  }
};

app.post("/campground/index", validateCampGround, async (req, res, next) => {
  try {
    // if (!req.body.Campground) throw new AppError("invalid Data", 400);

    const campground = new campGround(req.body.Campground);

    await campground.save();
    res.redirect(`/campground/index/${campground._id}`);
  } catch (error) {
    next(error);
  }
});

app.get("/campground/index/:id", async (req, res, next) => {
  try {
    const campGrounds = await campGround
      .findById(req.params.id)
      .populate("review");
    if (!campGrounds) return next(new AppError("Page cannot be found", 404));
    res.render("cumpground/show", { campGrounds });
  } catch (error) {
    return next(error);
  }
});
app.patch(
  "/campground/index/:id",
  validateCampGround,
  async (req, res, next) => {
    try {
      const campGround = await campGround.findByIdAndUpdate(
        req.params.id,
        req.body.Campground,
        {
          new: true,
        }
      );
      res.redirect(`/campground/index/${req.params.id}`);
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/campground/index/:id/edit",
  WrapAsync(async (req, res) => {
    const campground = await campGround.findById(req.params.id);
    res.render("cumpground/update", { campground });
  })
);

app.delete(
  "/campground/index/:id",
  WrapAsync(async (req, res) => {
    const campGrounds = await campGround.findByIdAndDelete(req.params.id);
    if (!campGrounds) {
      throw new AppError("Campground not found", 404);
    }
    res.redirect("/campground/index");
  })
);

app.post(
  "/campground/index/:id/review",
  validateReview,
  WrapAsync(async (req, res) => {
    const campground = await campGround.findById(req.params.id);

    const review = new reviews(req.body.review);
    await review.save();
    campground.review.push(review);
    await campground.save();
    console.log(campground);
    res.redirect(`/campground/index/${req.params.id}`);
  })
);

app.delete(
  "/campground/index/:id/review/:reviewid",
  WrapAsync(async (req, res) => {
    campGround.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.reviewid },
    });
    await reviews.findByIdAndDelete(req.params.reviewid);
    res.redirect(`/campground/index/${req.params.id}`);
  })
);

app.all("*", (req, res, next) => {
  next(new AppError("Page not found", 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(status).render("error", { err });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
