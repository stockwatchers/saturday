const express = require('express');
const app = express();
const router = (__dirname + '/../routes/'); //

app.use('/');

app.listen(3000, function() {
	console.log('server up');
});
