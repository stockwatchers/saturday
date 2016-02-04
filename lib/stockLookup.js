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
  var yql_queryRT = 'select * from yahoo.finance.quotes where symbol in ("'+ stock + '")';
  var yql_queryRT_str = encodeURI(BASE_URL + yql_queryRT);
  var query_str_finalRT = yql_queryRT_str + dataFormat;
  
  request(query_str_finalH, function (error, response, bodyH) {
    if (!error && response.statusCode == 200) {
      request(query_str_finalRT, function (error, response, bodyRT) {
        bodyH = JSON.parse(bodyH);
        bodyRT = JSON.parse(bodyRT);
        bodyH.stockName = bodyRT.query.results.quote.Name;
        bodyH = JSON.stringify(bodyH);
        if (!error && response.statusCode == 200) callback(bodyH);
      });
    }
  });
}

exports.stockLookup = stockLookup;
