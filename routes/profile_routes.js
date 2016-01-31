//home and main page routes
const express = require('express');
const mongoose = require('express');
const fs = require('fs');

//Middleware
const bodyParser = require('body-parser').json();
const handleDBError = require( __dirname + '/../lib/handle_db_error');


var profileRouter = module.exports = exports = express.Router();

//We need to use auth.routes to direct users to this route
profileRouter.get('/home/:id' , (req , res) => {



});
