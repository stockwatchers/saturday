if (document.cookie === '') window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf('/')) + '/';
//$.post('http://localhost:3000/validateToken', document.cookie, function(data) {
  $.post('https://stockpoppers.herokuapp.com/validateToken', document.cookie, function(data) {
  if(data === '') window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf('/')) + '/';
});
