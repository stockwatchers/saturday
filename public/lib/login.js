$("#btn-signup").on('click', function() {
	$.post('http://localhost:3000/signup', '{"email":"' + $('#email').val() + '","username":"' + $('#username').val() + '","password":"' + $('#password').val() + '"}', function() {
		window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf('/')) + '/profile.html';
	});
});
$("#btn-login").on('click', function() {
	$.post('http://localhost:3000/signin', '{"username":"' + $('#login-username').val() + '","password":"' + $('#login-password').val() + '"}', function() {
		window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf('/')) + '/profile.html';
	});
});
