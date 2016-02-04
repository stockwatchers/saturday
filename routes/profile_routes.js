//home and main page routes
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const Profile = require( __dirname + '/../models/user');
const jwt = require('jsonwebtoken');
//Middleware
const bodyParser = require('body-parser').json();
const handleDBError = require( __dirname + '/../lib/handle_db_error');
var stockLookup = require(__dirname + '/../lib/stockLookup').stockLookup;
var profileRouter = module.exports = exports = express.Router();

//This route also checks for verification of user
profileRouter.post('/profile', (req , res) => {
  req.body = '';
  req.on('data', function(chunk) {
    req.body += chunk;
  });
  req.on('end', function() {
    var decoded;
    req.body = req.body.substr(req.body.indexOf('=') +1, req.body.length);
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
//We need to use auth.routes to direct users to this route
profileRouter.post('/stockLookup', bodyParser, (req , res) => {
  req.body = '';
  req.on('data', function(chunk) {
    req.body += chunk;
  });
  req.on('end', function() {
    stockLookup(req.body,'2015-02-01',function(data) {
      res.end(data);
    });
  });
});
