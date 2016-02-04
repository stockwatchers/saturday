if (document.cookie === '') window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf('/')) + '/';
$.post('http://localhost:3000/validateToken', document.cookie, function(data) {
  console.log('Client has a token and it is: ' + document.cookie);
  console.log('When sending this cookie for validation on the server the server responded with: ' + data);
  window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf('/')) + '/';
});
