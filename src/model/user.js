/**
* User
*@module User
*/
const bcrypt = require('bcrypt');

// Mock Database with test user
const users = [{
  id: 0,
  name: 'test',
  username: 'test',
  email: 'test@gmail.com',
  password: 'test',
  style: [],
}];

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('test', salt, (err, hash) => {
    if (err) throw err;
    users[0].password = hash;
  });
});

/**
* A User
* @typedef {Object} User
* @class User
* @property {string} name - Users real name
* @property {string} username - Username
* @property {string} password - User password
* @property {string} email - User email
* @property {double} lng - Pin longitude
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
  const createdUser = {
    id: users.length,
    username: newUser.username,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
  };
  users.push(createdUser);
  result(null, createdUser);
};
/**
  * Gets a user by username
  * @param {number} username username of the user
  * @param {function} result function that takes and error and user
  */
User.getUserByUsername = function(username, result) {
  result(null, users.find((u) => u.username === username));
};
/**
  * Gets a single user by its id
  * @param {number} id ID of the user
  * @param {function} result function that takes and error and a user
  */
User.getUserById = function(id, result) {
  result(null, users.find((user) => user.id === id));
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
  console.log(users[userIndex]);
  result(null, users.find((user) => user.username === username));
};
/**
  * Sets user style to new template
  * @param {string} username users username
  * @param {function} result function that takes and style template
  */
User.changeStyle = function(username, newStyle, result) {
  const userIndex = users.findIndex((user) => user.username === username);
  users[userIndex].style = newStyle;
  console.log(users[userIndex]);
  result(null, newStyle);
};
module.exports = User;
