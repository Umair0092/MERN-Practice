const Joi = require("joi");
const joi = require("joi");
module.exports.campgroundSchema = joi.object({
  campground: joi
    .object({
      title: joi.string().required(),
      price: joi.number().min(0).required(),
      image: joi.string().required(),
      location: joi.string().required(),
      description: joi.string().required(),
    })
    .required(),
});

module.exports.ReviewSchema = Joi.object({
  review: Joi.object({
    body: Joi.string(),
    rating: Joi.number().min(1).max(5),
  }).required(),
});
