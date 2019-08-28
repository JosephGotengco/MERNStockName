const LocalStrategy = require("passport-local");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new LocalStrategy(async (username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) return done(err);
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) return done(null, false);
          if (result) {
            user = user.toObject();
            delete user.password;
            delete user.__v;
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );
};
