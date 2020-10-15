//Router for event information

var express = require('express');
var router = express.Router();
var eventController = require('../controller/event');

const {ensureAuthenticated} = require('../config/auth');


//gets all user events
router.get('/', ensureAuthenticated, eventController.getUserEvents);

/*
router.get('/eventId', ensureAuthenticated, eventController.getEventById);

router.post('/', ensureAuthenticated, eventController.postEvent);

router.put('/:eventId', ensureAuthenticated, eventController.updateEvent);

router.delete('/:eventId', ensureAuthenticated, eventController.deleteEvent);
*/

module.exports = router;
