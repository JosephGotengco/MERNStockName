const express = require("express");
const router = express.Router();
const passport = require("passport");

// @route   POST api/auth
// @desc    Auth User
// @access  Public
router.post(
  "/",
  (req, res, next) => {
    passport.authenticate("local", (err, user) => {
      if (err) {return next(err);}
      if(!user) {return res.status(400).json({ msg: "invalid credentials" });}
      if (user) {
        // if (user.role === 'admin') {
          
        // } else if (user.role === 'standard') {
          req.login(user, (err) => {
            if (err) { return next(err); }
            return res.status(200).json({ ...user });
          });
        // }
      }
    })  (req, res, next)
  }
);

// @route   POST api/auth/user
// @desc    Get user data
// @access  Private
router.get("/user", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.status(200).json({ ...req.user })
});

router.post("/logout", isLoggedIn, (req, res) => {
  req.session.destroy();
  res.status(200).json({ msg: "logged out success" })
});

function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ msg: "authorization denied" });
  }
}

module.exports = router;
