//Router for user information

var express = require('express');
var router = express.Router();
var userController = require('../controller/user');

const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth');

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res) {
  res.send('respond with a resource');
});

router.get('/:userId', userController.getUserById);

router.post('/register', forwardAuthenticated, userController.registerUser)

router.post('/login', forwardAuthenticated, userController.authenticateUser);

router.post('/logout', userController.logoutUser);

module.exports = router;
