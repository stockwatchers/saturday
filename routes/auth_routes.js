const Profile = require( __dirname + '/../models/user');
const express = require('express');
var authRouter = module.exports = exports = express.Router();
authRouter.post('/signup', (req, res) => {
  console.log('Sign Up Request Recieved');
  var incData = '';
  req.on('data', function(chunk) {
    incData = incData + chunk;
  });
  req.on('end', function() {
    incData = JSON.parse(incData);
    req.body = incData;
    var newProfile = new Profile();
    if(!((req.body.username || '').length && (req.body.password || '').length > 0)) {
      console.log('Invalid username or password found when attempting to save the new user.');
      console.log('Sign Up Request Finished');
      console.log();
      return res.status(400).json({msg: 'Invalid username or password'});
    }
    Profile.count({'authentication.email' : req.body.email}, function(err, count) {
      if(err) {
        console.log('Error during Profile.count during the signup process.');
        console.log('Sign Up Request Finished');
        console.log();
        return res.status(400).json({msg: 'Sorry, technical difficulties'});
      }
      if (count > 0) {
        console.log('The email address provided is already associated with another account.');
        console.log('Sign Up Request Finished');
        console.log();
        return res.status(401).json({msg: 'Account exists on this email'});
      }
    	Profile.count({'username' : req.body.username}, function(err, count) {
      	if(err) {
        	console.log('Error duing Profile.count when looking for the username to check if it is already exists in the database.');
          console.log('Sign Up Request Finished');
          console.log();
        	return res.status(400).json({msg: 'Sorry, we are having technical difficulties.'});
      	}
      	if (count > 0) {
          console.log('The username provided is already associated with an account in the database.');
          console.log('Sign Up Request Finished');
          console.log();
        	return res.status(401).json({msg: 'Username already exists'});
      	}
      	newProfile.username = req.body.username;
      	newProfile.authentication.email = req.body.email;
      	newProfile.hashPassword(req.body.password);
      	newProfile.save((err, data) => {
        	if(err) console.log('Failure saving new user to database.');
          console.log('New user saved: ' + data);
          var tokenData = data.generateToken();
          console.log('Send the new user a cookie to use for authentication.  This is their generated token: ' + tokenData);
          console.log('Sign Up Request Finished');
          console.log();
          res.status(200).cookie('token', tokenData).end();
      	});
    	});
    });
  });
});
authRouter.post('/signin', (req, res) => {
  console.log('Sign In Request Recieved');
  req.body = '';
  req.on('data', function(chunk) {
    req.body += chunk;
  });
  req.on('end', function() {
    var decoded;
    req.body = req.body.substr(req.body.indexOf('=') + 1, req.body.length);
    console.log(req.body);
    try {
      decoded = jwt.verify(req.body, process.env.APP_SECRET || 'changethis');
    } catch(e) {
      return res.status(401).json({msg: 'Not allowed -JWT'});
    }
    Profile.findOne({_id: decoded.id}, (err, user) => {
      if(err) {
        console.log(err);
      return res.status(401).json({msg: 'Not right. Nope -JWT'});
      }
      if(!user) return res.status(401).json({msg: 'Not gunna happen - JWT'});
      console.log(user);
      res.end(JSON.stringify(user));
    });
  });
});
authRouter.post('/validateToken', function(req, res) {
  console.log('Token Validation Request Recieved');
  var incData = '';
  req.on('data', function(chunk) {
    incData += chunk;
  });
  req.on('end', function() {
    console.log(incData);
    req.body = incData;
    res.status(200).end();
    /*
    Profile.findOne({username : req.body.username}, (err, data) => {
      if(err) {
        console.log('Error occurred during Profile.findOne using the client\'s username data.');
        console.log('Sign In Request Finished');
        console.log();
        return res.status(401).json({msg: 'Sorry, we are having technical difficulties.'});
      }
      console.log(data);
      if(!data) {
        console.log('There is no user with the client\'s specified username.');
        console.log('Sign In Request Finished');
        console.log();
        return res.status(401).json({msg: 'NONE SHALL PASS!'});
      }
      if(!data.comparePassword(req.body.password)) {
    	  console.log('The password specified by the client does not match the password associated with the client specified username.');
        console.log('Sign In Request Finished');
        console.log();
        return res.status(401).json({msg: 'Password Mismatch'});
      }
      console.log('The client has sent valid username and password data for an account in the database.');
      var tokenData = data.generateToken();
      console.log('Sending the client a generated token for that user account: ' + tokenData);
      console.log('Sign In Request Finished');
      console.log();
      res.status(200).cookie('token', tokenData).end();
    });
    */
  });
});
