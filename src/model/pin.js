/**
* Pin Model
* @module Pin
*/
const db = require('../config/db');


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

/**
* A Pin
* @typedef {Object} Pin
* @class Pin
* @property {string} title - Pin Title
* @property {string} description - Pin description
* @property {string} img_url - pin image
* @property {double} lat - Pin latitute
* @property {double} lng - Pin longitude
*/
const Pin = function(body) {
  this.title = body.title,
  this.description = body.description,
  this.img_url = body.img_url,
  this.lat = body.lat,
  this.lng = body.lng;
};

/**
  * Gets all user pins from database
  * @param {number} userId ID of user getting the pins
  * @param {function} result function that takes and error and a list of pins
  */
Pin.getPins = function(userId, result) {
  let query = 'select pin.pin_title, pin.pin_description, pin.pin_lat, pin.pin_lng, pin.pin_imgUrl, user.user_username, user.user_profilePic FROM pin join user on pin.pin_userId = user.user_id WHERE pin_userId = ' + userId;
  console.log(query);
  db.query(query, (err, pins, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, pins);
 });
};

/**
  * Gets all feed pins from database
  *@param {function} result function that takes and error and a list of pins
  */
Pin.getFeed = function(result) {
  let query = 'select pin.pin_title, pin.pin_description, pin.pin_lat, pin.pin_lng, pin.pin_imgUrl, user.user_username, user.user_profilePic FROM pin join user on pin.pin_userId = user.user_id';

  db.query(query, (err, pins, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, pins);
 });
};
/**
  * Gets a single pin by its id
  * @param {number} id ID of the pin
  * @param {function} result function that takes and error and a pin
  */
Pin.getPinById = function(pinId, result) {
  let query = 'select pin.pin_title, pin.pin_description, pin.pin_lat, pin.pin_lng, pin.pin_imgUrl, user.user_username, user.user_profilePic FROM pin join user on pin.pin_userId = user.user_id where pin.id = ' + pinId;

  db.query(query, (err, pin, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, pin);
 });
};

/**
  * Creates a new pin
  * @param {Object} newPin The pin information that is being added
  * @param {Object} user The user who posted the pin
  * @param {function} result function that takes and error and a pin
  */
Pin.createPin = function(newPin, user, result) {
  const pin = {
    userId: user.id,
    userName: user.username,
    title: newPin.title,
    description: newPin.description,
    img_url: newPin.img_url,
    lat: newPin.lat,
    lng: newPin.lng,
  };
  let query = 'insert into pin (pin_userId, pin_title, pin_description, pin_lat, pin_lng) values("' + pin.userId + '","' + pin.title + '","' + pin.description + '","' + pin.lat + '","' + pin.lng + '")';

  db.query(query, (err, pin, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, pin);
 });
};
/**
  * Edits a pin
  * @param {number} id ID of the pin
  * @param {function} result function that takes and error
  */
Pin.editPin = function(editedPin, result) {
  result(null);
};
/**
  * Deletes a pin
  * @param {number} id ID of the pin
  * @param {function} result function that takes and error
  */
Pin.deletePin = function(id, result) {
  pins = pins.filter((p) => p.id != id);
  result(null);
};

module.exports = Pin;
