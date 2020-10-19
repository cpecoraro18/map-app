//Router for rendering EJS pages

var express = require('express');
var router = express.Router();
const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('home', {page:'Home', menuId:'home', username: req.user.username});
});
router.get('/profile', ensureAuthenticated, function(req, res, next) {
  res.render('profile', {page:'Profile', menuId:'profile', username: req.user.username});
});
router.get('/explore', ensureAuthenticated, function(req, res, next) {
  res.render('explore', {page:'Explore', menuId:'explore', username: req.user.username});
});
router.get('/customizeMap', ensureAuthenticated, function(req, res, next) {
  res.render('customizeMap', {page:'Customize', menuId:'Customize', username: req.user.username});
});
router.get('/settings', ensureAuthenticated, function(req, res, next) {
  res.render('settings', {page:'Settings', menuId:'Settings', username: req.user.username});
});
router.get('/changePassword', ensureAuthenticated, function(req, res, next) {
  const errors = req.flash().error || [];
  res.render('changePassword', {page:'Customize', menuId:'Customize', username: req.user.username, errors: errors});
});
router.get('/login', forwardAuthenticated, function(req, res) {
  const errors = req.flash().error || [];
  res.render('login', {page:'Login', errors: errors});
});

router.get('/register', forwardAuthenticated, function(req, res) {
  res.render('register', {page:'Register'});
});
module.exports = router;
