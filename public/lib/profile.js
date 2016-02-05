var uniqueGlobal1;  //Holds processed stock data
var uniqueGlobal2;
var uniqueGlobal3;
var uniqueGlobal4;

var flag1 = false;
var flag2 = false;
var flag3 = false;
var flag4 = false;

$('.stockWatch').click(function() {
	var stock = $(this).text();
  stock = stock.substr(stock.indexOf('(') + 1,stock.length);
	stock = stock.substr(0, stock.length - 1);
  $.post('http://localhost:3000/stockLookup', stock, function (data) {
		//WHERE WE UPDATE GRAPHS AND STUFF
		updateStockInfo( processStockData(data) );

		uniqueGlobal1 = processStockData(data);
		uniqueGlobal2 = processStockData(data);
		uniqueGlobal3 = processStockData(data);
		uniqueGlobal4 = processStockData(data);

		flag1 = false;
		flag2 = false;
		flag3 = false;
		flag4 = false;

		// console.log('Graph updated');
	});
});

$('#button-1M').click( function(){
		var data1 = uniqueGlobal1.quotes;
		generateLineChart('#body', data1, 21 , flag1);
		flag1 = true;
});

$('#button-3M').click( function(){
		var data2 = uniqueGlobal2.quotes;
		generateLineChart('#body', data2, 63, flag2);
		flag2 = true;
});

$('#button-6M').click( function(){
		var data3 = uniqueGlobal3.quotes;
		generateLineChart('#body', data3, 126 , flag3);
		flag3 = true;
});

$('#button-1Y').click( function(){
		var data4 = uniqueGlobal4.quotes;
		generateLineChart('#body', data4, 251, flag4);
		flag4 = true;
});

function updateStockInfo (processedDataObj) {
	$('#stock-symbol').html( (processedDataObj.Symbol) );
	$('#stock-open').html( (processedDataObj.Open) );
	$('#stock-volume').html( (processedDataObj.Volume) );
	$('#stock-close').html( (processedDataObj.Close) );
	$('#stock-name').text(processedDataObj.StockName);

	generateLineChart('#body' , processedDataObj.quotes , 252); //Generate graph
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
		stockObject.quotes = quoteData;		//Array with JSON

		// console.log('Data Processed');
		return stockObject;
	} catch (e) {
		console.log('Error: ' + e);
	}
};

function generateLineChart(container , arrayQuotes , range , flag) {
	$('#stockGraph').remove();  //Clean out old graph data

	//Used to adjust size of data for graph compilation
	var quoteData;
	quoteData = chartDataProcess(arrayQuotes);

	function chartDataProcess ( data ){
		var outData = [];
		for (var i = 0; i < range; i++) {
			outData.push(data[i]);
		}
		return outData;
	};

	console.log('Important info here: ' + quoteData.length);

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

	  if (!flag){
			quoteData.forEach( function(d) {
					d.date = parseDate(d.date);					//Tries to split non-array on second run
					d.close = parseFloat(d.close);
			});
		}
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
