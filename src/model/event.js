//Mock Database with test events
var events = [{
  id: 0,
  userId: "test",
  title: "MyEvent",
  description: "This is my event",
  lat: 100,
  lng: 100
}]


var Event = function(event) {
  this.title = event.title,
  this.description = event.description,
  this.lat = event.lat,
  this.lng = event.lng
}


Event.getEvent = function(userId) {
  result(null, events.find(e => e.userId === userId))
}

Event.getEventById = function(id) {
  result(null, events.find(e => (e.userId === userId && e.id === id)))
}

Event.createEvent = function(newEvent) {
  var newEvent = {
    id: events.length,
    username: newEvent.username,
    name: newEvent.name,
    email: newEvent.email,
    password: newEvent.password
  }
  events.push(newEvent);
  result(null, user);
}

Event.deleteEvent = function(id) {
  events = events.filter(e => e.id != id)
}
