var email = $("input[name='email']").val();
var username = $("input[name='username']").val();
var password = $("input[name='passwd']").val();

var dataToSend = '{"email":' + email + ',"username":' + username + ',"password":' + password + '}';



$("#btn-signup").click( function() {
	$.post('http://localhost:3000/signup' , dataToSend)
	.done(alert('Sent something'));
});


// $("#btn-signup").click( function() {
// 	$.ajax({
//   	type: "POST",
//   	url: 'http://localhost:3000/signup',
//   	data: dataToSend
//   	//Used to redirect the client
//  //  	success: function(data) {
//  //  		window.location.href = window.location.href
//  //  			.substr(0, window.location.href.lastIndexOf('/')) + '/profile.html';}
// 	});
// });

// $("#btn-signup").click( function() {
// 	$.post( "http://localhost:3000/signup", function( data ) {
//   	type: "POST",
//   	url: '',
//   	data: '{"email": ' + email + ',"username": ' + username + ',"password": ' + password + '}',
//   	//Used to redirect the client
//   	success: function(data) {
//   		window.location.href = window.location.href
//   			.substr(0, window.location.href.lastIndexOf('/')) + '/profile.html';}
// 	});

