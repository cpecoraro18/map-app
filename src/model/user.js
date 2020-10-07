const bcrypt = require('bcrypt')

const users = [{
  id: 0,
  name: "test",
  username: "test",
  email: "test@gmail.com",
  password:'test'
}]

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash('test', salt, (err, hash) => {
    if(err) throw err;
    users[0].password = hash;
  });
});

var User = function(user){
  this.name = user.name,
  this.username = user.username,
  this.password = user.password,
  this.email = user.email
}

User.createUser = async function(newUser, result) {
   var newUser = {
     id: users.length,
     username: newUser.username,
     name: newUser.name,
     email: newUser.email,
     password: newUser.password
   }
    users.push(newUser);
    result(null, newUser);

}

User.getUserByUsername = function(user, result) {
  //console.log(users);
  console.log("IN USER MODEL: ", user.username)
  result(null, users.find(u => u.username === user.username));
}

User.getUserByID = function(id, result) {
  result(null, users.find(u => u.id === id));
}

module.exports = User;
