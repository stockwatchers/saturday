//home and main page routes
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

//Middleware
const bodyParser = require('body-parser').json();
const handleDBError = require( __dirname + '/../lib/handle_db_error');
var stockLookup = require(__dirname + '/../lib/stockLookup').stockLookup;


var profileRouter = module.exports = exports = express.Router();

//We need to use auth.routes to direct users to this route
profileRouter.get('/home', jwtAuth, (req , res) => {
  res.json({msg: 'success'});
  res.end();
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
