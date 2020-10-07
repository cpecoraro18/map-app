const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

// Load User model
const User = require('../model/user');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({usernameField: 'username'}, (username, password, done) => {
      // Match user

      User.getUserByUsername(username, (err, user) => {
        if (err || !user) {
          return done(null, false, { message: 'That username does not exist' });
        }
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            return done(null, false, { message: 'Password incorrect' });
          }
        });
      });
    })
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
  });
}
