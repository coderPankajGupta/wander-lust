const Listing = require("../model/listing");
const Review = require("../model/review");

module.exports.reviewPost = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let { rating, comment } = req.body;
  let newReview = new Review({ rating, comment });
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await listing.save();
  await newReview.save();
  req.flash("success", "Review Posted Successfully!");
  res.redirect(`/listing/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted Succefully!");
  res.redirect(`/listing/${id}`);
};
