//Router for user information

var express = require('express');
var router = express.Router();
var userController = require('../controller/user');

const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth');


router.post('/register', forwardAuthenticated, userController.registerUser)

router.post('/login', forwardAuthenticated, userController.authenticateUser);

router.post('/changePassword', ensureAuthenticated, userController.changePassword);

router.post('/logout', userController.logoutUser);

module.exports = router;
