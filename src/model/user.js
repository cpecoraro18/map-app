/**
* User
*@module User
*/
const bcrypt = require('bcrypt');
const db = require('../config/db');

/**
* A User
* @typedef {Object} User
* @class User
* @property {string} name - Users real name
* @property {string} username - Username
* @property {string} password - User password
* @property {string} email - User email
*/
const User = function(user) {
  this.name = user.name,
  this.username = user.username,
  this.password = user.password,
  this.email = user.email;
};

/**
  * Creates a new user
  * @param {Object} newUser The pin information that is being added
  * @param {function} result function that takes and error and the new user
  */
User.createUser = async function(newUser, result) {
  const user = {
    username: newUser.username,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  };
  let query = 'insert into user (user_username, user_password, user_email, user_name) values("' + user.username + '","' + user.password + '","' + user.email + '","' + user.name + '")';

  db.query(query, (err, user, fields) => {
    // if any error while executing above query, throw error
    if (err) throw err;
    // if there is no error, you have the result
    result(null, user[0]);
 });
};
/**
  * Gets a user by username
  * @param {number} username username of the user
  * @param {function} result function that takes and error and user
  */
User.getUserByUsername = function(username, result) {
  let query = 'select * from user WHERE user_username = "' + username+'"';

  db.query(query, (err, user, fields) => {
    // if any error while executing above query, throw error
    if (err) result(err, null);
    else {
      // if there is no error, you have the result
      result(null, user[0]);
    }
 });
};
/**
  * Gets a single user by its id
  * @param {number} id ID of the user
  * @param {function} result function that takes and error and a user
  */
User.getUserById = function(id, result) {
  let query = 'select * from user WHERE user_id = "' + id + '"';

  db.query(query, (err, user, fields) => {
    // if any error while executing above query, throw error
    if (err) result(err, null);
    else {
      // if there is no error, you have the result
      result(null, user[0]);
    }
 });
};

/**
  * Gets a single user by its id
  * @param {number} id ID of the user
  * @param {function} result function that takes and error and a user
  */
User.getUserInfo = function(id, result) {
  let query = 'select user_username, user_name, user_profilePic, user_bio from user WHERE user_id = "' + id + '"';

  db.query(query, (err, user, fields) => {
    // if any error while executing above query, throw error
    if (err) result(err, null);
    else {
      // if there is no error, you have the result
      result(null, user[0]);
    }
 });
};
/**
  * Gets a single pin by its id
  * @param {string} username users username
  * @param {string} newPassword password the user want to change to
  * @param {function} result function that takes and user
  */
User.changePassword = function(username, newPassword, result) {
  const userIndex = users.findIndex((user) => user.username === username);
  users[userIndex].password = newPassword;
  result(null, users.find((user) => user.username === username));
};

/**
  * Sets user style to new template
  * @param {string} username users username
  * @param {function} result function that takes and style template
  */
User.getUserStyle = function(userId, result) {
  let query = 'select * from mapstyle where mapStyle_userId = ' + userId;
  console.log(query);

  db.query(query, (err, mapStyle, fields) => {
    // if any error while executing above query, throw error
    if (err) result(err, null);
    else {
      // if there is no error, you have the result
      result(null, mapStyle[0]);
    }
 });
};

/**
  * Sets user style to new template
  * @param {string} username users username
  * @param {function} result function that takes and style template
  */
User.changeStyle = function(userId, newStyle, result) {
  db.query('select * from mapstyle where mapStyle_userId =' + userId, (err, mapStyle, fields) => {
    // if any error while executing above query, throw error
    if (err) result(err, null);
    else {
      if(mapStyle.length === 0) {
        let query = 'insert into mapstyle (mapStyle_userId, mapStyle_template) values("'+ userId +'", \'' + newStyle + '\')';
        db.query(query, (err, mapStyle, fields) => {
          // if any error while executing above query, throw error
          if (err) result(err, null);
          else {
            // if there is no error, you have the result
            result(null, mapStyle);
          }
       });
     } else {
       let query = 'update mapstyle set mapStyle_template = \'' + newStyle + '\' where mapStyle_userId = "'+ userId + '"'
       //console.log(query);
       db.query(query, (err, mapStyle, fields) => {
         // if any error while executing above query, throw error
         if (err) result(err, null);
         else {
           // if there is no error, you have the result
           result(null, mapStyle);
         }
      });
     }
    }
  });
};


module.exports = User;
