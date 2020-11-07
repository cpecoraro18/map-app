// Router for event information

const express = require('express');
const router = express.Router();
const tagController = require('../controller/tag');

const {ensureAuthenticated} = require('../config/auth');


// gets all user tags
router.get('/', ensureAuthenticated, tagController.get_user_tags);
router.get('/feed', ensureAuthenticated, tagController.get_tags);
router.get('/:pinId', ensureAuthenticated, tagController.get_pin_tags);
router.post('/', ensureAuthenticated, tagController.post_tag);
router.delete('/', ensureAuthenticated, tagController.delete_tag);


module.exports = router;
