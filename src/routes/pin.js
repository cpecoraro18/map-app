// Router for event information

const express = require('express');
const router = express.Router();
const pinController = require('../controller/pin');

const {ensureAuthenticated} = require('../config/auth');


// gets all user pins
router.get('/', ensureAuthenticated, pinController.get_user_pins);
router.get('/feed', ensureAuthenticated, pinController.get_user_feed);
//router.get('/explore', ensureAuthenticated, pinController.get_explore_feed);
router.post('/', ensureAuthenticated, pinController.post_pin);
router.get('/:pinId', ensureAuthenticated, pinController.get_pin_by_id);
router.put('/:pinId', ensureAuthenticated, pinController.edit_pin);
router.delete('/:pinId', ensureAuthenticated, pinController.delete_pin);


module.exports = router;
