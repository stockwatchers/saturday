$("#btn-signup").click(function() {
	var email = $('#email').val();
	var username = $('#username').val();
	var password = $('#password').val();
	var dataToSend = '{"email":"' + email + '","username":"' + username + '","password":"' + password + '"}';
	$.post('http://localhost:3000/signup', dataToSend);

});

