
var Pin = require('../model/pin')


exports.getUserPins = function(req, res) {
  var userId = req.user.id;

  Pin.getPins(userId, (err, rows) => {
    if(err) throw err;
    res.status(200).json(rows);
  });
}

exports.getUserFeed = function(req, res) {
  Pin.getFeed((err, rows) => {
    if(err) throw err;
    res.status(200).json(rows);
  });
}

exports.postPin = function(req, res) {
  const user = req.user;
  const newPin = new Pin(req.body);
  Pin.createPin(newPin, user, (err, pin) => {
    if(err) throw err;
    res.status(201).json(newPin);
  });
}

exports.editPin = function(req, res) {
  const newPin = new Pin(req.body);
  Pin.editPin(newPin, (err) => {
    if(err) throw err;
    res.status(201);
  });
}

exports.deletePin = function(req, res) {
  var pinId = req.pinId;
  Pin.deletePin(pinId, (err) => {
    if(err) throw err;
    res.status(201);
  });
}
