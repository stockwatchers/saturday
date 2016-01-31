//Requiring modules
const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Our routes
var profileRouter = require( __dirname + '/../routes/profile_routes');
var authRouter = require( __dirname + '/../routes/auth_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/stockwatcher_db');

app.use('/', profileRouter);
app.use('/', authRouter);

var portUsed = process.env.PORT || 3000;

app.listen(portUsed , function() {
	console.log( 'Server running on port ' + Port );
});
