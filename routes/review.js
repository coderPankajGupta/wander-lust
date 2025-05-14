const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewValidation } = require("../schemaValidation.js");
const { isLoggedIn, isReviewAuthor } = require("../middleWare.js");

const reviewController = require("../controllers/review.js");

function reviewValidate(req, res, next) {
  let err = reviewValidation.validate(req.body);
  if (err.error) throw new ExpressError(400, err.error);
  else next();
}

//Reviews post route
router.post(
  "/",
  isLoggedIn,
  reviewValidate,
  wrapAsync(reviewController.reviewPost)
);

//Review delete route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
