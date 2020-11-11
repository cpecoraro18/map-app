/**
* Pin Model
* @module Pin
*/
const db = require('../config/db');

/**
* A Pin
* @typedef {Object} Pin
* @class Pin
* @property {string} title - Pin Title
* @property {string} description - Pin description
* @property {string} img_url - pin image
* @property {double} lat - Pin latitute
* @property {double} lng - Pin longitude
* @param {object} body json object that has pin information
*/
const Pin = function(body) {
  this.title = body.title || 'Untitled',
  this.description = body.descr || '',
  this.location_name = body.location_name,
  this.lat = body.lat,
  this.lng = body.lng,
  this.tag = body.tag
};

/**
  * Gets all user pins from database
  * @param {number} userId ID of user getting the pins
  * @param {function} result function that takes and error and a list of pins
  */
Pin.getPins = function(userId, result) {
  const query = 'select pin.pin_id, pin.pin_title, pin.pin_description, pin.pin_lat, pin.pin_lng, user.user_username, user.user_profilePic FROM pin join user on pin.pin_userId = user.user_id WHERE pin_userId = ' + userId;
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
  const query = 'select pin.pin_id, pin.pin_title, pin.pin_description, pin.pin_lat, pin.pin_lng, user.user_username, user.user_profilePic FROM pin join user on pin.pin_userId = user.user_id';
  db.query(query, (err, pins, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, pins);
  });
};
/**
  * Gets a single pin by its id
  * @param {number} pinId ID of the pin
  * @param {function} result function that takes and error and a pin
  */
Pin.getPinById = function(pinId, result) {
  const query = 'select pin.pin_id, pin.pin_title, pin.pin_description, pin.pin_lat, pin.pin_lng, user.user_username, user.user_profilePic FROM pin join user on pin.pin_userId = user.user_id where pin.id = ' + pinId;
  db.query(query, (err, pin, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, pin);
  });
};

/**
  * Gets a single pin by its id
  * @param {number} pinId ID of the pin
  * @param {function} result function that takes and error and a pin
  */
Pin.getPinImages = function(pinId, result) {
  const query = 'select (photo_path) from pin_photo left join photo on pin_photo.pin_photo_photoId = photo.photo_id where pin_photo_pinId = ' + pinId;
  db.query(query, (err, photos, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, photos);
  });
};

/**
  * Gets a single pin by its id
  * @param {number} pinId ID of the pin
  * @param {function} result function that takes and error and a pin
  */
Pin.getPinTags = function(pinId, result) {
  const query = 'select (tag_name) from pin_tag left join tag on pin_tag_tagId = tag.tag_id where pin_tag_pinId = ' + pinId;
  db.query(query, (err, tags, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, tags);
  });
};

/**
  * Creates a new pin
  * @param {Object} newPin The pin information that is being added
  * @param {Object} user The user who posted the pin
  * @param {function} result function that takes and error and a pin
  */
Pin.createPin = function(newPin, user, result) {
  // create new pin
  const pin = {
    userId: user.user_id,
    userName: user.user_username,
    title: newPin.title,
    location_name: newPin.location_name,
    description: newPin.description,
    lat: newPin.lat,
    lng: newPin.lng,
    tag: newPin.tag
  };

  let images = newPin.img_url;

  let self = this;
  // MAKE NEW PIN
  const newPinQuery = 'insert into pin (pin_userId, pin_title, pin_description, pin_lat, pin_lng) values("' + pin.userId + '","' + pin.title + '","' + pin.description + '","' + pin.lat + '","' + pin.lng + '")';
  db.query(newPinQuery, (err, pinInsert, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    //add id
    pin.id = pinInsert.insertId;
    self.addPinImages(pin, images, result)
  });
};

Pin.addPinImages = function(pin, images, result) {
  let self = this;
  var pinPhotos = []
  // ADD PHOTOS
  if (images && images.length > 0) {
    const newPhotoQuery = 'INSERT INTO photo (photo_id, photo_path) VALUES ?';
    const values = [];
    images.forEach((file) => {
      const trimmedPath = file.path.slice(6);
      values.push([file.filename, trimmedPath]);
      pinPhotos.push(file.filename);
    });

    db.query(newPhotoQuery, [values], (err, photos, fields) => {
      if (err) throw err;
      self.connectImagesToPin(pin, pinPhotos, result);

    });
  } else {
    self.addPinTags(pin, result);
  }
};

Pin.connectImagesToPin = function(pin, pinPhotos, result) {
  // CONNECT PIN WITH PHOTOS
  if (pinPhotos.length > 0) {
    const newPinPhotoQuery = 'INSERT INTO pin_photo (pin_photo_pinId, pin_photo_photoId) VALUES ? ';
    const values = [];
    pinPhotos.forEach((photo) => {
      values.push([pin.id, photo]);
    });
    let self = this;
    db.query(newPinPhotoQuery, [values], (err, pinPhotos, fields) => {
      if (err) throw err;
      self.addPinTags(pin, result);
    });
  }
};


Pin.addPinTags = function(pin, result) {
  let self = this;
  if (pin.tag) {
    const newTagQuery = 'INSERT INTO tag (tag_name) VALUES("' + pin.tag +'")';
    db.query(newTagQuery, (err, tag, fields) => {
      if (err) throw err;
      pin.tag = {name: pin.tag, id: tag.insertId}
      self.connectTagstoPin(pin, result);
    });
  }
};

Pin.connectTagstoPin = function(pin, result) {
  if (pin.tag) {
    const newPinTagQuery = 'INSERT INTO pin_tag (pin_tag_pinId, pin_tag_tagId) VALUES('+ pin.id +', '+ pin.tag.id +')';
    db.query(newPinTagQuery, (err, tag, fields) => {
      if (err) throw err;
      console.log(pin);
      result(null, pin);
    });
  }
};



/**
  * Edits a pin
  * @param {number} editedPin ID of the pin
  * @param {function} result function that takes and error
  */
Pin.editPin = function(editedPin, result) {
  result(null);
};
/**
  * Deletes a pin
  * @param {number} pinId ID of the pin
  * @param {function} result function that takes and error
  */
Pin.deletePin = function(pinId, result) {
  pins = pins.filter((p) => p.id != pinId);
  result(null);
};

module.exports = Pin;
