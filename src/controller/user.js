var User = require('../model/user')
const bcrypt = require('bcrypt');
const passport = require('passport');

exports.authenticateUser = function(req, res, next) {
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
}

exports.logoutUser = function(req, res) {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
}

exports.getUserByUsername = function(req, res) {
  const { name, username, email, password} = req.body;
  const user = new User({
    name: name,
    username: username,
    email: email,
    password: password
  });
  User.getUserByUsername(user);
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
    console.log(errors);
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
            console.log(user);
            res.redirect('/login');
          }
        });
      })
    })
  }
}
