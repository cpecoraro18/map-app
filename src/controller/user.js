// User Controller

const User = require('../model/user');
const bcrypt = require('bcrypt');
const passport = require('passport');

// Use passport to authenticate user
exports.authenticateUser = function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  })(req, res, next);
};

exports.getUserInfo = function(req, res) {
  const userInfo = req.user;
  delete userInfo['password'];
  res.json(userInfo);
};

// Logout user, redirect to login page
exports.logoutUser = function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
};

// sends json with user info
exports.getUserById = function(req, res) {
  const id = parseInt(req.params.id);
  User.getUserById(id, function(err, user) {
    if (err) {
      res.status(500).json({
        error: err,
        message: 'Could not get user',
      });
      return;
    }
    if (user == null) {
      res.status(401).json({
        message: 'Invalid Login',
      });
    } else {
      delete user.password;
      res.status(200).json(user);
    }
  });
};

exports.registerUser = function(req, res) {
  const {name, username, email, password} = req.body;

  const errors = [];

  User.getUserByUsername(username, (err, user) => {
    if (user) {
      errors.push({msg: 'Username already exisits'});
    }
  });

  password2 = password;


  if (!name || !email || !password || !password2) {
    errors.push({msg: 'Please enter all fields'});
  }
  if (password != password2) {
    errors.push({msg: 'Passwords do not match'});
  }
  /*
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }*/
  if (errors.length > 0) {
    res.render('register', {
      errors,
    });
  } else {
    // add new user
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        // add user to database
        User.createUser(newUser, (err, user) => {
          if (err) {
            res.status(500).json({
              error: err,
              message: err.message,
            });
            return;
          } else {
            res.redirect('/login');
          }
        });
      });
    });
  }
};

exports.changePassword = function(req, res) {
  const {oldPassword, newPassword, newPassword2} = req.body;

  const errors = [];

  if (newPassword != newPassword2) {
    errors.push({msg: 'Passwords do not match'});
  }

  if (errors.length > 0) {
    res.render('changePassword', {
      errors,
    });
  } else {
    // change password
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newPassword, salt, (err, hash) => {
        if (err) throw err;
        // add user to database
        User.changePassword(req.user.username, hash, (err, user) => {
          if (err) {
            res.status(500).json({
              error: err,
              message: err.message,
            });
            return;
          } else {
            res.redirect('/');
          }
        });
      });
    });
  }
};

exports.editStyle = function(req, res) {
  console.log(req.body);
  const newStyle = req.body.userStyle;
  User.changeStyle(req.user.username, newStyle, (err, style) => {
    if (err) throw err;
    console.log(style);
    res.json(style);
  });
};
