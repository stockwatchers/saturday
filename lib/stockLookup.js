var request = require('request');
var stockLookup = function(stock, start, callback) {
  console.log('Starting Stock Lookup');
  var BASE_URL = 'https://query.yahooapis.com/v1/public/yql?q=';
  var end = "2016-02-01" //now
  //historicaldata
  var yql_queryH = 'select * from yahoo.finance.historicaldata where symbol = "'+ stock + '" and startDate = "' + start + '" and endDate = "' + end +'"';
  var yql_queryH_str = encodeURI(BASE_URL + yql_queryH);
  var dataFormat = "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  var query_str_finalH = yql_queryH_str + dataFormat;
  //realtimedata
  // var yql_queryRT = 'select * from yahoo.finance.quotes where symbol in ("'+ stock + '")';
  // var yql_queryRT_str = encodeURI(BASE_URL + yql_queryRT);
  // var query_str_finalRT = yql_queryRT_str + dataFormat;
  // console.log('QueryH String = ' + query_str_finalH);
  // console.log('QueryRT String = ' + query_str_finalRT);
  // console.log('Completed Query String Generation');
  // request(query_str_finalRT, function (error, response, body) {
  //   if (!error && response.statusCode == 200) {
  //     var data = JSON.parse(body);
  //     console.log('Returning Stock Query Results: ' + data.query.results.quote.Name);
  //     //console.log(JSON.stringify(data.query));
  //     // for(var i = 0; i < data.query.results.quote.length; i++) {
  //     //   //console.log(data.query.results.quote[i]);
  //     //   // console.log(data.query.results.quote[i].Close);
  //     //   // console.log(data.query.results.quote[i].High);
  //     //   // console.log(data.query.results.quote[i].Low);
  //     //   // console.log(data.query.results.quote[i].Open);
  //     //   // console.log('');
  //     // }
  //   }
  //   console.log('Completed HTTP Request for: ');
  // });
  request(query_str_finalH, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      // console.log(data.query.results.quote.length);
      // console.log('Returning Stock Query Results: ' + data.query.results.quote[0].Symbol);
      // console.log('Stock Name: ' + body);
      // for(var i = 0; i < data.query.results.quote.length; i++) {
      //   //console.log(data.query.results.quote[i]);
      //   // console.log(data.query.results.quote[i].Close);
      //   // console.log(data.query.results.quote[i].High);
      //   // console.log(data.query.results.quote[i].Low);
      //   // console.log(data.query.results.quote[i].Open);
      //   // console.log('');
      // }
      var output = body;
      callback(output);
    }
    console.log('Completed HTTP Request for: ');
  });
}
exports.stockLookup = stockLookup;
