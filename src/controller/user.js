//User Controller

var User = require('../model/user')
const bcrypt = require('bcrypt');
const passport = require('passport');

//Use passport to authenticate user
exports.authenticateUser = function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

//Logout user, redirect to login page
exports.logoutUser = function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
}

//sends json with user info
exports.getUserById = function(req, res) {
  var id = parseInt(req.params.userId);
  User.getUserById(id, function(err, user) {
    if(err) {
      res.status(500).json({
        error: err,
        message: "Could not get user"
      });
      return;
    }
    if(user == null){
      res.status(401).json({
        message: "Invalid Login"
      });
    } else {
      delete user.password;
      res.status(200).json(user)
    }

  })
}

exports.registerUser = function(req, res) {
  const { name, username, email, password} = req.body;
  let errors = [];

  password2 = password;

  //checks
  /*
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }
  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }
  */
  if(errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    //add new user
    const newUser = new User({
      name: name,
      username: username,
      email: email,
      password: password
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        //add user to database
        User.createUser(newUser, (err, user) => {
          if(err) {
            res.status(500).json({
              error: err,
              message: err.message
            });
            return;
          } else {
            res.redirect('/login');
          }
        });
      })
    })
  }
}
