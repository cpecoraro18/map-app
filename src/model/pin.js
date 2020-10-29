// Mock Database with test pins
const pins = [{
  id: 0,
  userId: 0,
  userName: 'test',
  userPic_url: '/assets/profilePictures/person2.webp',
  title: 'Argentina',
  description: 'AR',
  img_url: '/assets/images/argentina.jpg',
  creation_date: '1-1-0001',
  pin_date: '1-2-0001',
  lat: -38.416097,
  lng: -63.616672,
}, {
  id: 1,
  userId: 1,
  userName: 'cjpec18',
  userPic_url: '/assets/profilePictures/person1.jpeg',
  title: 'Austria',
  description: 'AT',
  img_url: '/assets/images/austria.jpg',
  creation_date: '1-3-0001',
  pin_date: '1-4-0001',
  lat: 47.516231,
  lng: 14.550072,
}, {
  id: 2,
  userId: 0,
  userName: 'test',
  userPic_url: '/assets/profilePictures/person2.webp',
  title: 'Brazil',
  description: 'BR',
  img_url: '/assets/images/brazil.jpg',
  creation_date: '1-1-0001',
  pin_date: '1-2-0001',
  lat: -14.235004,
  lng: -51.92528,
}, {
  id: 3,
  userId: 1,
  userName: 'cpecoraro18',
  userPic_url: '/assets/profilePictures/person1.jpeg',
  title: 'Canada',
  description: 'CA',
  img_url: '/assets/images/canada.jpeg',
  creation_date: '1-3-0001',
  pin_date: '1-4-0001',
  lat: 56.130366,
  lng: -106.346771,
}, {
  id: 4,
  userId: 0,
  userName: 'test',
  userPic_url: '/assets/profilePictures/person2.webp',
  title: 'Chile',
  description: 'CL',
  img_url: '/assets/images/chile.jpg',
  creation_date: '1-1-0001',
  pin_date: '1-2-0001',
  lat: -35.675147,
  lng: -71.542969,
}, {
  id: 5,
  userId: 1,
  userName: 'cpecoraro18',
  userPic_url: '/assets/profilePictures/person1.jpeg',
  title: 'Germany',
  description: 'DE',
  img_url: '/assets/images/germany.webp',
  creation_date: '1-3-0001',
  pin_date: '1-4-0001',
  lat: 51.165691,
  lng: 10.451526,
}];

// creates pin object with req body if it has all the information
const Pin = function(body) {
  this.title = body.title,
  this.description = body.description,
  this.img_url = body.img_url,
  this.lat = body.lat,
  this.lng = body.lng;
};

// loads all users pin
Pin.getPins = function(userId, result) {
  result(null, pins.filter((p) => p.userId === userId));
};

// loads all pins
Pin.getFeed = function(result) {
  result(null, pins);
};

Pin.getPinById = function(id, result) {
  result(null, pins.find((p) => (p.userId === userId && p.id === id)));
};

Pin.createPin = function(newPin, user, result) {
  const createdPin = {
    id: pins.length,
    userId: user.id,
    userName: user.username,
    title: newPin.title,
    description: newPin.description,
    img_url: newPin.img_url,
    lat: newPin.lat,
    lng: newPin.lng,
  };
  pins.push(createdPin);
  result(null, createdPin);
};

Pin.editPin = function(editedPin, result) {
  result(null);
};

Pin.deletePin = function(id, result) {
  pin = pins.filter((p) => p.id != id);
  result(null);
};

module.exports = Pin;
