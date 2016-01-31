const express = require('express');
const mongoose = require('mongoose');

//Authorization
const jwt = require('jsonwebtoken');
const basicHTTP = require( __dirname + '/../lib/basic_http');

//models
var Profile = require( __dirname + '/../models/profile');

//Middleware
const bodyParser = require('body-parser').json();
const handleDBError = require( __dirname + '/../lib/handle_db_error');

var authRouter = module.exports = exports = express.Router();

//Log In with existing account
authRouter.get('/signin' , basicHTTP, (req , res) => {

});

//Log In with new account
authRouter.post('/signin' , bodyParser, basicHTTP, (req , res) => {

});
