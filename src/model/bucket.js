/**
* User
*@module User
*/
const db = require('../config/db');

/**
* A User
* @typedef {Object} Bucket
* @class User
* @property {string} name - Users real name
* @property {string} username - Username
* @property {string} password - User password
* @property {string} email - User email
* @param {object} user
*/
const Bucket = function(bucket) {
  this.userId = bucket.pin_userId,
  this.pinId = bucket.pin_id
};


/**
  * Creates a new user
  * @param {Object} newUser The pin information that is being added
  * @param {function} result function that takes and error and the new user
  */
Bucket.createBucket = async function(newBucket, userId, result) {

  const query = 'insert into bucket (bucket_userId, bucket_pinId) values("' + userId + '","' + newBucket.pinId + '")';

  db.query(query, (err, bucket, fields) => {
    if(err) throw err;

    result(null, bucket);
  });
}


/**
  * Creates a new user
  * @param {Object} newUser The pin information that is being added
  * @param {function} result function that takes and error and the new user
  */
Bucket.getUserBuckets =  async function(userId, result) {

  const query = 'SELECT * FROM bucket JOIN pin ON bucket.bucket_pinId = pin.pin_id WHERE bucket_userId = ' + userId;

  db.query(query, (err, buckets, fields) => {
    if(err) throw err;
    console.log(buckets);
    result(null, buckets);
  });
}

/**
  * Creates a new user
  * @param {Object} newUser The pin information that is being added
  * @param {function} result function that takes and error and the new user
  */
Bucket.deleteBucket = async function(bucketId, result) {

  const query = 'DELETE FROM bucket WHERE bucket_id = ' + bucketId;

  db.query(query, (err, bucket, fields) => {
    if(err) throw err;

    result(null, bucket);
  });
}

module.exports = Bucket;
