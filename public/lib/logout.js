function delete_cookie(name) {
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
$("#logout").click(function() {
	delete_cookie('token');
  window.location.href = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
});
