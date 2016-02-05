$('.stockWatch').click(function() {
	var stock = $(this).text();
  stock = stock.substr(stock.indexOf('(') + 1,stock.length);
	stock = stock.substr(0, stock.length - 1);
  $.post('http://localhost:3000/stockLookup', stock, function (data) {
		//WHERE WE UPDATE GRAPHS AND STUFF
		updateStockInfo( processStockData(data) );
		console.log('Graph updated');
	});
});

function updateStockInfo (processedDataObj) {
	$('#stock-symbol').html( (processedDataObj.Symbol) );
	$('#stock-open').html( (processedDataObj.Open) );
	$('#stock-volume').html( (processedDataObj.Volume) );
	$('#stock-close').html( (processedDataObj.Close) );
	$('#stock-name').text(processedDataObj.StockName);

	$('#stockGraph').remove();  //Clean out old graph data
	generateLineChart('#body' , processedDataObj.quotes); //Generate graph
}

function processStockData ( dataInc ) {
	try {
		var stockObject = {};
		dataInc = JSON.parse(dataInc);
		//Data we need once - Fed to title and stats on front page
		stockObject.Symbol = dataInc.query.results.quote[dataInc.query.results.quote.length-1].Symbol;
		stockObject.Open = dataInc.query.results.quote[dataInc.query.results.quote.length-1].Open;
		stockObject.Volume = dataInc.query.results.quote[dataInc.query.results.quote.length-1].Volume;
		stockObject.Close = dataInc.query.results.quote[dataInc.query.results.quote.length-1].Close;
		stockObject.StockName = dataInc.stockName;
		var quoteData = [];
		for (var i = 0; i < dataInc.query.results.quote.length; i++) {
			var quoteJSON = {
				date: dataInc.query.results.quote[i].Date,
				close: dataInc.query.results.quote[i].Close
			}
			quoteData.push(quoteJSON);
		}
		stockObject.quotes = quoteData;

		console.log('Data Processed');
		return stockObject;
	} catch (e) {
		console.log('Error: ' + e);
	}
};

function generateLineChart(container , quoteData , range) {

  var margin = {top:20, right:20, bottom:40, left:60};
  var width = 350 - margin.left - margin.right;
  var height = 293 - margin.top - margin.bottom;

	//Callback
  var parseDate = d3.time.format("%Y-%m-%d").parse;

  var x = d3.time.scale().range([0, width]);
  var y = d3.scale.linear().range([height, 0]);

	//Adjust number of ticks on graph
	//Months
  var xAxis = d3.svg.axis().scale(x).orient("bottom").ticks(4);
	//Value
	var yAxis = d3.svg.axis().scale(y).orient("left").ticks(5);

  var valueLine = d3.svg.line().x(function(d){return x( d.date );}).y(function(d){return y( d.close );});
  var svg = d3.select(container).append('svg')
	          .attr('width', width + margin.left + margin.right)
	          .attr('height', height + margin.top + margin.bottom)
						.attr('id', 'stockGraph')
						.append('g')
	          .attr('transform', 'translate (' + margin.left + ',' + margin.top + ')');

	quoteData.forEach(function(d) {
			d.date = parseDate(d.date);
			d.close = parseFloat(d.close);
	});

	var area = d3.svg.area()
	           .x(function(d) {
	              return x(d.date);
	          })
	          .y0(height)
	          .y1(function(d) {
	              return y(d.close);
	          });

	//Provide ranges to X and Y
	x.domain(d3.extent(quoteData, function(d) { return d.date; }));
	y.domain([0, d3.max(quoteData, function(d) { return d.close;})]);

	//Used to render graph data
	//Draw Lines
	svg.append('path')
	.attr('class', 'line')
	.attr('d', valueLine(quoteData));
	//Draw Area on Graph
	svg.append('path')
	.datum(quoteData)
	.attr('class', 'area')
	.attr('d', area);
	//etc.
	svg.append('g')
	.attr('class', 'x axis')
	.attr('transform', 'translate(0,' + height + ')')
	.call(xAxis);

	svg.append('g')
	.attr('class', 'y axis')
	.call(yAxis);

	svg.append('text')
	.attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom) + ')')
	.style('text-anchor', 'middle')
	.attr('class', 'shadow')
	.text('Date');

	svg.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('y', -50)
	.attr('x', margin.top - (height / 2))
	.attr('dy', '0.71em')
	.style('text-anchor', 'end')
	.attr('class', 'shadow')
	.text('Price ($)');
};


//Sample Data Object
// var sampleData = {
// 	"query":{
// 		"count":252,
// 		"created":"2016-02-03T20:30:30Z",
// 		"lang":"en-US",
// 		"results":{
// 			"quote":[
// 				{
// 					"Symbol":"FB",
// 					"Date":"2016-02-01",
// 					"Open":"112.269997",
// 					"High":"115.720001",
// 					"Low":"112.010002",
// 					"Close":"115.089996",
// 					"Volume":"45840900",
// 					"Adj_Close":"115.089996"},
// 				{
// 					"Symbol":"FB",
// 					"Date":"2016-02-01",
// 					"Open":"112.269997",
// 					"High":"115.720001",
// 					"Low":"112.010002",
// 					"Close":"115.089996",
// 					"Volume":"45840900",
// 					"Adj_Close":"115.089996"}
// 			]			//Lots more rsults after this
// 		}
// 	}
// };
$.post('http://localhost:3000/profile', document.cookie, function(data) {
	console.log('hahahaha');
  console.log(data);
});
