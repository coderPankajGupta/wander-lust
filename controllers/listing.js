const Listing = require("../model/listing");

module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listing/index.ejs", { allListing });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listing/new.ejs");
};

module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let { title, description, image, price, location, country } = req.body;
  let newListing = await new Listing({
    title,
    description,
    image,
    price,
    location,
    country,
  });
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listing");
};

module.exports.editForm = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Your requested item does't exist.");
    return res.redirect("/listing");
  }
  let originalImageUrl = listing.image.url;
  console.log(originalImageUrl);
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_250,w_250");
  console.log(originalImageUrl);
  res.render("listing/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateRouter = async (req, res) => {
  let { id } = req.params;
  let { title, description, image, price, location, country } = req.body;
  let listing = await Listing.findByIdAndUpdate(id, {
    title,
    description,
    image,
    price,
    location,
    country,
  });
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listing/${id}`);
};

module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listing");
};

module.exports.singleListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Your requested item does't exist.");
    res.redirect("/listing");
  } else res.render("listing/show.ejs", { listing });
};
