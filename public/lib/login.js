$("#btn-signup").click(function() {
	console.log("click");
	var email = $('#email').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var dataToSend = '{"email":"' + email + '","username":"' + username + '","password":"' + password + '"}';
	$.post('http://localhost:3000/signup', dataToSend, function() {
		console.log('hahahaha');
		window.location.href = window.location.href.substr(0,window.location.href.lastIndexOf('/')) + '/profile.html';
	});
});

$("#btn-login").click(function() {
	console.log("click");
	var username = $('#login-username').val();
	var password = $('#login-password').val();
	var dataToSendLogIn = '{"username":"' + username + '","password":"' + password + '"}';
	$.post('http://localhost:3000/signin', dataToSendLogIn, function() {
		console.log('hahahaha');
		window.location.href = window.location.href.substr(0,window.location.href.lastIndexOf('/')) + '/profile.html';
	});
});
