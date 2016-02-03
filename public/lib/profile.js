$('.stockWatch').click(function() {
	var stock = $(this).text();
  stock = stock.substr(stock.indexOf('(') + 1,stock.length);
	stock = stock.substr(0, stock.length - 1);
  $.post('http://localhost:3000/stockLookup', stock, function(data) {
		//WHERE WE UPDATE GRAPHS AND STUFF
		console.log(data);
  });
});
