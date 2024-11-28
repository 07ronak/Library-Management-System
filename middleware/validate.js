const { reviewSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

//Middleware for validating reviews
module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMessage);
  } else {
    next();
  }
};
