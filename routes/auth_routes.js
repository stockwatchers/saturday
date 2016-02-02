const Profile = require( __dirname + '/../models/profile');
const express = require('express');
const jsonParser = require('body-parser').json();
const handleError = require( __dirname + '/../lib/handle_db_error');
const basicHTTP = require(__dirname + '/../lib/basic_http');

var authRouter = module.exports = exports = express.Router();

//Signup
authRouter.post('/signup', jsonParser, (req, res) => {
<<<<<<< HEAD
  console.log('Request recieved.');

  var incData;

  req.on('data', function(chunk) {
    // console.log(chunk);
=======

  console.log('Request recieved.');
  var incData;
  req.on('data', function(chunk) {
>>>>>>> 591b782ea7b5f17903aab2a05c9b9625a50146bc
    incData = JSON.parse(chunk);
  });

  req.on('end', function() {
    req.body = incData;
<<<<<<< HEAD
=======
    console.log(req.body);
>>>>>>> 591b782ea7b5f17903aab2a05c9b9625a50146bc
    var newProfile = new Profile();
    //Username must be entered and password must have length of 8
    if(!((req.body.username || '').length && (req.body.password || '').length > 7)) {
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
          //Output is a TOKEN and MSG FINISHED
          res.set({
            'token' : data.generateToken()
          })
          res.status(200)
          .cookie('signed_token',data.generateToken(), { signed: true })
          .json( {msg:"finished"} );
      	});
    	});
    });
  });
});

//Signin
authRouter.get('/signin', basicHTTP, (req, res) => {
  //Log in with username and Password
  Profile.findOne({username : req.basicHTTP.username}, (err, user) => {
    if(err) {
      console.log(err);
      //Database error
      return res.status(401).json({msg: 'Sorry, we are having technical difficulties.'});
    }
    //No User
    if(!user) return res.status(401).json({msg: 'NONE SHALL PASS!'});

    //Password not matching
    if(!user.comparePassword(req.basicHTTP.password)) {
    	return res.status(401).json({msg: 'Password Mismatch'});
    }
    //Give verified user a token
    //res.status(200).json({token: user.generateToken()});
    console.log(user.generateToken());
    res.status(200).cookie('signed_token', user.generateToken(), { signed: true });
    res.json( {msg: 'Successful Login'} );
  });
});
