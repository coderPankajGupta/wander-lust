const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");

mongoose
  .connect("mongodb://localhost/wonderlust")
  .then(() => console.log("Connect Successfully to DB"))
  .catch((err) => console.log(err));

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({ ...obj, owner: "68202f7eab2ba9ebc6a4d140" }));
  await Listing.insertMany(initData.data);
  console.log("Inserted seccessfully");
};

initDB();
