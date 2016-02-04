const Profile = require( __dirname + '/../models/user');
const express = require('express');
const jsonParser = require('body-parser').json();
const handleError = require( __dirname + '/../lib/handle_db_error');

var authRouter = module.exports = exports = express.Router();

//Signup
authRouter.post('/signup', (req, res) => {

  console.log('Request recieved.');

  var incData = '';

  req.on('data', function(chunk) {
    incData = incData + chunk;
  });

  req.on('end', function() {
    incData = JSON.parse(incData);
    req.body = incData;
    console.log(req.body);
    var newProfile = new Profile();
    //Username must be entered and password must have length of 8
    if(!((req.body.username || '').length && (req.body.password || '').length > 0)) {
      return res.status(400).json({msg: 'Invalid username or password'});
    }
    //Check if email has account already
    Profile.count({'authentication.email' : req.body.email}, function(err, count) {
      if(err) {
        console.log(err);
        return res.status(400).json({msg: 'Sorry, technical difficulties'});
      }
      //Check if someone with this email is already signed up
      if (count > 0) {
        return res.status(401).json({msg: 'Account exists on this email'});
      }

    	//Check if username is taken
    	Profile.count({'username' : req.body.username}, function(err, count) {
      	if(err) {
        	console.log(err);
        	return res.status(400).json({msg: 'Sorry, we are having technical difficulties.'});
      	}
      	if (count > 0) {
        	return res.status(401).json({msg: 'Username already exists'});
      	}

      	//Assign parts of new profile in database
      	newProfile.username = req.body.username;
      	newProfile.authentication.email = req.body.email;
      	newProfile.hashPassword(req.body.password);
      	newProfile.save((err, data) => {
        	if(err) return handleError(err, res);
        	console.log('Adding new Profile to server.');
          res.status(200).cookie('token',data.generateToken()).end();
      	});
    	});
    });
  });
});

//Signin
authRouter.post('/signin', (req, res) => {
  var incData = '';

  req.on('data', function(chunk) {
    incData = incData + chunk;
  });

  req.on('end', function() {
    incData = JSON.parse(incData);
    req.body = incData;
    console.log(req.body + '  inside end');

    //Log in with username and Password
    Profile.findOne({username : req.body.username}, (err, data) => {
      if(err) {
        console.log(err);
        //Database error
        return res.status(401).json({msg: 'Sorry, we are having technical difficulties.'});
        console.log('db error');
      }
      //No User
      if(!data) return res.status(401).json({msg: 'NONE SHALL PASS!'});
      console.log('no user');

      //Password not matching
      if(!data.comparePassword(req.body.password)) {
    	 return res.status(401).json({msg: 'Password Mismatch'});
       console.log('password mismatch');
      }
      //Give verified user a token in cookie
      console.log('set cookie');
      res.status(200).cookie('token',data.generateToken()).end();
    });
  });
});
