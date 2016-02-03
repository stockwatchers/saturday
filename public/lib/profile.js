$('.stockWatch').click(function() {
	var stock = $(this).text();
  stock = stock.substr(stock.indexOf('(') + 1,stock.length);
	stock = stock.substr(0, stock.length - 1);
  $.post('http://localhost:3000/stockLookup', stock, function (data) {
		//WHERE WE UPDATE GRAPHS AND STUFF
		updateStockInfo( processStockData(data) );
		console.log('Graph updated');
		//This is where data is coming from, to be used by all other processes.
  });
});


//Gather reference all data points we need to dynamically load

function updateStockInfo (processedDataObj) {


	// var stockTicker,stockOpen, stockLow, stockHigh, stockClose, stockChange;
	// var stockName; //How can we get this?

	// $('#stock-name').html( (processedDataObj).toString() )
	$('#stock-symbol').html( (processedDataObj.Symbol) );
	$('#stock-open').html( (processedDataObj.Open) );
	$('#stock-volume').html( (processedDataObj.Volume) );
	$('#stock-close').html( (processedDataObj.Close) );

	// $('#stock-hi')
	// $('#stock-low')
	// $('#stock-change')
}


//Systematically load correct strings to these points as HTML



//Modify stock data in a way that is easy for the graph to read




function processStockData ( dataInc ) {

	var stockName; //How can we get this?
	var stockObject = {};
	dataInc = JSON.parse(dataInc);
	//Data we need once - Fed to title and stats on front page
	stockObject.Symbol = dataInc.query.results.quote[dataInc.length-1].Symbol;
	stockObject.Open = dataInc.query.results.quote[dataInc.length-1].Open;
	stockObject.Volume = dataInc.query.results.quote[dataInc.length-1].Volume;
	stockObject.Close = dataInc.query.results.quote[dataInc.length-1].Close;
	// //Data to calculate -> Needs to be fed to the graph as an array of data
	// stockDate = data.query.results.quote[0].Date;
	// stockLow = data.query.results.quote[0].Low;
	// stockHigh = data.query.results.quote[0].High;


	console.log('Data Processed');
	return stockObject;

}

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
