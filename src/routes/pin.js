//Router for event information

var express = require('express');
var router = express.Router();
var pinController = require('../controller/pin');

const {ensureAuthenticated} = require('../config/auth');


//gets all user events
router.get('/', ensureAuthenticated, pinController.getUserPins);
router.post('/', ensureAuthenticated, pinController.postPin);
router.put('/', ensureAuthenticated, pinController.editPin);
router.delete('/', ensureAuthenticated, pinController.deletePin);


module.exports = router;
