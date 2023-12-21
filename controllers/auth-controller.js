const User = require("../models/user-model.js");
const authentication = require("../utils/authentication.js");
const validation = require("../utils/validation.js");

function getSignup(req, res) {
  res.render("customer/auth/signup.ejs");
}

async function signup(req, res, next) {
  // validation
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
  ) {
    res.redirect("/signup");
    return;
  }

  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  // express can't catch errors which occured inside asynchronous functions by default
  try {
    if (await user.existAlready()) {
      res.redirect("/signup");
      return;
    }

    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect("/login");
}

function getLogin(req, res) {
  res.render("customer/auth/login.ejs");
}

async function login(req, res, next) {
  // check email
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

  if (!existingUser) {
    res.redirect("/login");
    return;
  }

  // check password
  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );

  if (!passwordIsCorrect) {
    res.redirect("/login");
    return;
  }

  authentication.createLoginUserSession(req, existingUser, function () {
    res.redirect("/");
  });
}

function logout(req, res) {
  authentication.removeLoginUserSession(req);
  res.redirect("/login");
}

module.exports = {
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
