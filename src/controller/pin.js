/**
* Pin Controler
* @module Pin Controller
*/

const Pin = require('../model/pin');

/**
* gets user id from request and responds with an array of user posts
* @param {Object} req client request
* @param {Object} res server response
*/
exports.getUserPins = function(req, res) {
  const userId = req.user.id;

  Pin.getPins(userId, (err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
};
/**
* responds with a list of pins from feed
* @param {Object} req client request
* @param {Object} res server response
*/
exports.getUserFeed = function(req, res) {
  Pin.getFeed((err, rows) => {
    if (err) throw err;
    res.status(200).json(rows);
  });
};
/**
* gets user and new pin from request and
* responds with a json object of the new post
* @param {Object} req client request
* @param {Object} res server response
*/
exports.postPin = function(req, res) {
  const user = req.user;
  const newPin = new Pin(req.body);
  Pin.createPin(newPin, user, (err, pin) => {
    if (err) throw err;
    res.status(201).json(newPin);
  });
};
/**
* gets a new pin based on the old pin from request
* responds with a 201 status if successfull
* @param {Object} req client request
* @param {Object} res server response
*/
exports.editPin = function(req, res) {
  const newPin = new Pin(req.body);
  Pin.editPin(newPin, (err) => {
    if (err) throw err;
    res.status(201);
  });
};
/**
* deletes a pin based on an id received by the request
* responds with 201 if successfull
* @param {Object} req client request
* @param {Object} res server response
*/
exports.deletePin = function(req, res) {
  const pinId = req.pinId;
  Pin.deletePin(pinId, (err) => {
    if (err) throw err;
    res.status(201);
  });
};
