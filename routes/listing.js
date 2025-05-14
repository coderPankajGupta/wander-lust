const express = require("express");
const router = express.Router();
const { schemaValidation } = require("../schemaValidation.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner } = require("../middleWare.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");

function validation(req, res, next) {
  let err = schemaValidation.validate(req.body);
  if (err.error) throw new ExpressError(400, err.error);
  else next();
}

// Index Route and Create new listing Route
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    validation,
    upload.single("image"),
    wrapAsync(listingController.createNewListing)
  );

//New Listing Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editForm)
);

//Update Route , Delete Route and Show Single Route
router
  .route("/:id")
  .put(
    isLoggedIn,
    isOwner,
    upload.single("image"),
    validation,
    wrapAsync(listingController.updateRouter)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing))
  .get(wrapAsync(listingController.singleListing));

module.exports = router;
