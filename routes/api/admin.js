const express = require("express");
const router = express.Router();

const User = require("../../models/User");

router.get('/users', async(req, res) => {
    var users = await User.find({});
    users = users.map((user) => {
        user = user.toObject();
        delete user.password;
        delete user.__v;
        return user
    });
    res.status(200).json({ users: users });
})

function isAdmin(req, res, next) {
    if (!req.user) {
        res.status(401).json({ msg: "you are not even logged in lol", user: `user: ${req.user}` });
    } else if (req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ msg: "only admins sorry" });
    }
}

module.exports = router;