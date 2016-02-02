//home and main page routes
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const jwtAuth = require(__dirname + '/../lib/jwt_auth');

//Middleware
const bodyParser = require('body-parser').json();
const handleDBError = require( __dirname + '/../lib/handle_db_error');


var profileRouter = module.exports = exports = express.Router();

//We need to use auth.routes to direct users to this route
profileRouter.get('/home', jwtAuth, (req , res) => {
  res.json({msg: 'success'});
  res.end();
});



