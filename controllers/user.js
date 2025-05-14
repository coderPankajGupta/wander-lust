const User = require("../model/user");

module.exports.signupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signupUser = async (req, res, next) => {
  try {
    let { username, password, email } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      else {
        req.flash("success", "Welcome to Wanderlust");
        res.redirect("/listing");
      }
    });
  } catch (er) {
    req.flash("error", er.message);
    res.redirect("/signup");
  }
};

module.exports.loginUser = async (req, res) => {
  req.flash("success", "Welcome back to Wanderlust");
  let redirectUrl = res.locals.redirectUrl || "/listing";
  res.redirect(redirectUrl);
};

module.exports.logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    else {
      req.flash("success", "You logged out!");
      res.redirect("/listing");
    }
  });
};
