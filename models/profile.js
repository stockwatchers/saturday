var mongoose = require('mongoose');

//Dow Jones Industrial Average might not work, update this later.
//Verification will be set up on Client Side

Profile = new mongoose.Schema({
  authentication: {
    username: String,
    password: String
  },
  portfolio: { type: Array , default: ['.DJI'] }
});

module.exports = exports = mongoose.model('Profile' , Profile);
