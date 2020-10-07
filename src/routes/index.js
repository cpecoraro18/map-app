var express = require('express');
var router = express.Router();
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  console.log(req);
  res.render('index', {page:'Home', menuId:'home', username: req.user.username});
});
router.get('/about', function(req, res, next) {
  res.render('about', {page:'About', menuId:'about'});
});
router.get('/login', forwardAuthenticated, function(req, res) {
  res.render('login', {page:'Login'});
});

router.get('/register', forwardAuthenticated, function(req, res) {
  res.render('register', {page:'Register'});
});
module.exports = router;
