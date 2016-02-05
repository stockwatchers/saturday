$.post('https://stockpoppers.herokuapp.com/validateToken', document.cookie, function(data) {
  $('#username').text(data);
});
$('#openingSymbolParenthesis').hide();
$('#closingSymbolParenthesis').hide();
$('#logout').hide();
$('#hamClickMain').on('click', function() {
	$('#logout').toggle();
});
$('.openGraphBtm').hide();
var uniqueGlobal1,uniqueGlobal2, uniqueGlobal3, uniqueGlobal4, flag1 = false, flag2 = false, flag3 = false, flag4 = false;
$('.stockWatch').click(function() {
	$('.openGraphBtm').show();
	updateGraph($(this).text(), true);
});
function updateGraph(stock, parseStockName) {
	if (parseStockName) {
		stock = stock.substr(stock.indexOf('(') + 1,stock.length);
		stock = stock.substr(0, stock.length - 1);
	}
	$('#stockGraph').remove();
	$('#stock-name').text('');
	$('#openingSymbolParenthesis').hide();
	$('#stock-symbol').text('');
	$('#closingSymbolParenthesis').hide();
	$('#stockGraphContainer').append($('<img id="loadingGraphImage" src="/img/ajax-loader.gif" alt="Loading" style="width:31px;height:31px;margin-left:'+(($('#stockGraphContainer').width() / 2) - (31 / 2))+'px;margin-top:'+(($('#stockGraphContainer').height() / 2) - (31 / 2))+'px;">'));
	$('.selected').removeClass('selected');
	$('#button-1Y').addClass('selected');
  $.post('https://stockpoppers.herokuapp.com/stockLookup', stock, function (data) {
		updateStockInfo(processStockData(data));
		uniqueGlobal1 = processStockData(data);
		uniqueGlobal2 = processStockData(data);
		uniqueGlobal3 = processStockData(data);
		uniqueGlobal4 = processStockData(data);
		flag1 = false;
		flag2 = false;
		flag3 = false;
		flag4 = false;
	});
}
$('#button-1M').click(function() {
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
	var data1 = uniqueGlobal1.quotes;
	generateLineChart('#stockGraphContainer', data1, 21 , flag1);
	flag1 = true;
});
$('#button-3M').click(function() {
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
	var data2 = uniqueGlobal2.quotes;
	generateLineChart('#stockGraphContainer', data2, 63, flag2);
	flag2 = true;
});
$('#button-6M').click(function() {
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
	var data3 = uniqueGlobal3.quotes;
	generateLineChart('#stockGraphContainer', data3, 126 , flag3);
	flag3 = true;
});
$('#button-1Y').click(function() {
	$('.selected').removeClass('selected');
	$(this).addClass('selected');
	var data4 = uniqueGlobal4.quotes;
	generateLineChart('#stockGraphContainer', data4, 251, flag4);
	flag4 = true;
});
function updateStockInfo (processedDataObj) {
	$('#stock-name').text(processedDataObj.StockName);
	$('#openingSymbolParenthesis').show();
	$('#stock-symbol').text(processedDataObj.Symbol);
	$('#closingSymbolParenthesis').show();
	$('#stock-open').text(processedDataObj.Open);
	$('#stock-volume').text(processedDataObj.Volume);
	$('.closedLower').removeClass('closedLower');
	if (processedDataObj.Close < processedDataObj.Open) {
		$('#stock-close').addClass('closedLower');
	}
	$('#stock-close').text(processedDataObj.Close);
	generateLineChart('#stockGraphContainer', processedDataObj.quotes, 251); //Generate graph
}
function processStockData(dataInc) {
	try {
		var stockObject = {};
		dataInc = JSON.parse(dataInc);
		//Data we need once - Fed to title and stats on front page
		stockObject.Symbol = dataInc.query.results.quote[0].Symbol;
		stockObject.Open = dataInc.query.results.quote[0].Open;
		stockObject.Volume = dataInc.query.results.quote[0].Volume;
		stockObject.Close = dataInc.query.results.quote[0].Close;
		stockObject.StockName = dataInc.stockName;
		var quoteData = [];
		for (var i = 0; i < dataInc.query.results.quote.length; i++) {
			var quoteJSON = {
				date: dataInc.query.results.quote[i].Date,
				close: dataInc.query.results.quote[i].Close
			}
			quoteData.push(quoteJSON);
		}
		stockObject.quotes = quoteData;//Array with JSON
		return stockObject;
	} catch (e) {
		console.log('Error: ' + e);
	}
};
function generateLineChart(container, arrayQuotes , range , flag) {
	$('#stockGraph').remove();
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
	var margin = {top:0, right:60, bottom:70, left:80};
  var width = $(container).width() - margin.left - margin.right;
  var height = $(container).height() - margin.top - margin.bottom;
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
	$('#loadingGraphImage').remove();
  var svg = d3.select(container).append('svg')
	          .attr('width', width + margin.left + margin.right)
	          .attr('height', height + margin.top + margin.bottom)
						.attr('id', 'stockGraph')
						.append('g')
	          .attr('transform', 'translate (' + margin.left + ',' + margin.top + ')');
	if(!flag) {
		quoteData.forEach( function(d) {
			d.date = parseDate(d.date);	//Tries to split non-array on second run
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
	y.domain([0, d3.max(quoteData, function(d) { return d.close; })]);
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
	.attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.bottom - 30) + ')')
	.style('text-anchor', 'middle')
	.attr('class', 'shadow')
	.text('Date');
	svg.append('text')
	.attr('transform', 'rotate(-90)')
	.attr('y', (30 - margin.left))
	.attr('x', -(height / 2) + 20)
	.attr('dy', '0.71em')
	.style('text-anchor', 'end')
	.attr('class', 'shadow')
	.text('Price ($)');
};
