// Router for user information

const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

const {ensureAuthenticated, forwardAuthenticated} = require('../config/auth');


router.post('/register', forwardAuthenticated, userController.registerUser);

router.post('/login', forwardAuthenticated, userController.authenticateUser);

router.post('/changePassword', ensureAuthenticated, userController.changePassword);

router.put('/style', ensureAuthenticated, userController.editStyle);

router.get('/userInfo', ensureAuthenticated, userController.getUserInfo);

router.post('/logout', userController.logoutUser);

module.exports = router;
