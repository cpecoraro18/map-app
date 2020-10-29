// User model

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

// User attributes
const User = function(user) {
  this.name = user.name,
  this.username = user.username,
  this.password = user.password,
  this.email = user.email;
};

// takes a user made with template
// returns new user with id
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

// takes a user with a username
User.getUserByUsername = function(username, result) {
  result(null, users.find((u) => u.username === username));
};

User.getUserById = function(id, result) {
  result(null, users.find((user) => user.id === id));
};

User.changePassword = function(username, newPassword, result) {
  const userIndex = users.findIndex((user) => user.username === username);
  users[userIndex].password = newPassword;
  console.log(users[userIndex]);
  result(null, users.find((user) => user.username === username));
};

User.changeStyle = function(username, newStyle, result) {
  const userIndex = users.findIndex((user) => user.username === username);
  users[userIndex].style = newStyle;
  console.log(users[userIndex]);
  result(null, newStyle);
};
module.exports = User;
