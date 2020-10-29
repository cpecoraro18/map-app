// Router for event information

const express = require('express');
const router = express.Router();
const pinController = require('../controller/pin');

const {ensureAuthenticated} = require('../config/auth');


// gets all user pins
router.get('/', ensureAuthenticated, pinController.getUserPins);
router.get('/feed', ensureAuthenticated, pinController.getUserFeed);
router.post('/', ensureAuthenticated, pinController.postPin);
router.put('/', ensureAuthenticated, pinController.editPin);
router.delete('/', ensureAuthenticated, pinController.deletePin);


module.exports = router;
