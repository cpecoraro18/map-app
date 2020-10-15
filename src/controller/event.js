
var Event = require('../model/event')


exports.getUserEvents = function(req, res) {
  var userId = parseInt(req.params.userId)
  Event.getEvents(userId, function(err, events){
    if(err) {
      res.status(500).json({
        error: err,
        message: "Could not get events"
      });
      return;
    }
    if(events == []) {
      res.status(401).json({
        message: "No events found"
      });
    }
    else {
      res.status(200).json(events);
    }
  })
}

exports.getEventById = function(req, res) {
  Event.getEventById()
}

exports.postEvent = function(req, res) {
  Event.createEvent()
}

exports.updateEvent = function(req, res) {
  Event.updateEvent()
}

exports.deleteEvent = function(req, res) {
  Event.deleteEvent()
}
