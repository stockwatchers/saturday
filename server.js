//Requiring modules
const express = require('express');
const mongoose = require('mongoose');
const app = module.exports = exports = express();
const fs = require ('fs');

//Our routes
var profileRouter = require( __dirname + '/routes/profile_routes');
var authRouter = require( __dirname + '/routes/auth_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/stockwatcher_db');
app.use(express.static(__dirname + '/public'));
app.use(profileRouter);
app.use(authRouter);
app.use(function(req, res) {
	res.sendFile(__dirname + '/public/fourofour.html');
});

var portUsed = process.env.PORT || 3000;

app.listen(portUsed , () => {
	console.log( 'Server running on port ' + portUsed );
});
