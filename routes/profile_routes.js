//home and main page routes
const express = require('express');
const mongoose = require('mongoose');
const Profile = require( __dirname + '/../models/user');
const jwt = require('jsonwebtoken');
//Middleware
const bodyParser = require('body-parser').json();
var stockLookup = require(__dirname + '/../lib/stockLookup').stockLookup;
var profileRouter = module.exports = exports = express.Router();
//We need to use auth.routes to direct users to this route
profileRouter.post('/stockLookup', bodyParser, (req , res) => {
  req.body = '';
  req.on('data', function(chunk) {
    req.body += chunk;
  });
  req.on('end', function() {
    stockLookup(req.body, function(data) {
      res.end(data);
    });
  });
});
