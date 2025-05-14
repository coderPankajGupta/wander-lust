const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongooes = require("passport-local-mongoose");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
});

userSchema.plugin(passportLocalMongooes);
let User = mongoose.model("User", userSchema);

module.exports = User
