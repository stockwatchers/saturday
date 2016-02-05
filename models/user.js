const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Dow Jones Industrial Average might not work, update this later.
//Verification will be set up on Client Side

profileSchema = new mongoose.Schema({
  username: String,
  authentication: {
    email: String,
    password: String
  },
  portfolio: { type: Array , default: ['.DJI'] }
});

profileSchema.methods.hashPassword = function(password) {
  var hash = this.authentication.password = bcrypt.hashSync(password, 8);
  return hash;
};

profileSchema.methods.comparePassword = function(password) {
	return bcrypt.compareSync(password, this.authentication.password);
};

profileSchema.methods.generateToken = function() {
	return jwt.sign({id: this._id}, (process.env.APP_SECRET || 'changethis'), ({expiresIn: "1h"}));
	//expire token
}

module.exports = exports = mongoose.model('Profile' , profileSchema);
