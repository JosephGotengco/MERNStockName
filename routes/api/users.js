const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// User Model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register New User
// @access  Public
router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  // Simple Validation
  if (!email || !password || !username) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "A user with that email already exists." });

    const newUser = new User({
      username,
      email,
      password
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              let { id, balance, registrationDate, stocks,
                watchlist, hasConfirmedEmail, role, username, email } = user;
              res.json({
                token,

                id, balance, registrationDate, stocks,
                watchlist, hasConfirmedEmail, role, username, email

              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
