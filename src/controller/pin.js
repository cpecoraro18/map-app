
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
  const userId = req.user.id;
  const newPin = new Pin(req.body);
  Pin.createPin(newPin, userId, (err, pin) => {
    if(err) throw err;
    res.status(201).json(newPin);
  });
}

exports.editPin = function(req, res) {
  const userId = req.user.id;
  const newPin = new Pin(req.body);
  Pin.editPin(newPin, (err) => {
    if(err) throw err;
    res.status(201);
  });
}

exports.deletePin = function(req, res) {
  const userId = req.user.id;
  const newPin = new Pin(req.body);
  Pin.deletePin(newPin, (err) => {
    if(err) throw err;
    res.status(201);
  });
}
