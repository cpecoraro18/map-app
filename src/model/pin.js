//Mock Database with test pins
var pins = [{
  id: 0,
  userId: 0,
  title: "MyPin",
  description: "This is my pin",
  img_url: "/",
  creation_date: "1-1-0001",
  pin_date: "1-2-0001",
  lat: 100,
  lng: 100
},{
  id: 2,
  userId: 1,
  title: "MyPin2",
  description: "This is my 2nd pin",
  img_url: "/",
  creation_date: "1-3-0001",
  pin_date: "1-4-0001",
  lat: 120,
  lng: 120
}]


var Pin = function(body) {
  this.title = body.title,
  this.description = body.description,
  this.img_url = body.img_url,
  this.lat = body.lat,
  this.lng = body.lng
}


Pin.getPins = function(userId, result) {
  result(null, pins.filter(p => p.userId === userId))
}

Pin.getPinById = function(id, result) {
  result(null, pins.find(p => (p.userId === userId && p.id === id)))
}

Pin.createPin = function(newPin, userId, result) {
  var newPin = {
    id: pins.length,
    userId: userId,
    title: newPin.title,
    description: newPin.description,
    img_url: newPin.img_url,
    lat: newPin.lat,
    lng: newPin.lng
  }
  pins.push(newPin);
  result(null, newPin);
}

Pin.editPin = function(editedPin, result) {
  result(null);
}

Pin.deletePin = function(id, result) {
  pin = pins.filter(p => p.id != id)
  result(null);
}

module.exports = Pin;
