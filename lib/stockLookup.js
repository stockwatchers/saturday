var request = require('request');
var stockLookup = function(stock, callback) {
  console.log('Starting Stock Lookup');
  var BASE_URL = 'https://query.yahooapis.com/v1/public/yql?q=';
  var date = new Date();
  var year = date.getFullYear();
  var month = (date.getMonth() + 1);
  var day = date.getDate();
  var yesterday = getYesterday(year, month, day);
  var yesterdayLastYear = getYesterdayLastYear(year, month, day);
  //historicaldata
  var yql_queryH = 'select * from yahoo.finance.historicaldata where symbol = "'+ stock + '" and startDate = "' + yesterdayLastYear + '" and endDate = "' + yesterday +'"';
  var yql_queryH_str = encodeURI(BASE_URL + yql_queryH);
  var dataFormat = "&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  var query_str_finalH = yql_queryH_str + dataFormat;
  //realtimedata
  var yql_queryRT = 'select * from yahoo.finance.quotes where symbol in ("'+ stock + '")';
  var yql_queryRT_str = encodeURI(BASE_URL + yql_queryRT);
  var query_str_finalRT = yql_queryRT_str + dataFormat;
  console.log('Historical data YQL Query: ' + yql_queryH_str);
  console.log('Real-time data YQL Query: ' + yql_queryRT_str);

  request(query_str_finalH, function (error, response, bodyH) {
    if (!error && response.statusCode == 200) {
      request(query_str_finalRT, function (error, response, bodyRT) {
        bodyH = JSON.parse(bodyH);
        bodyRT = JSON.parse(bodyRT);
        bodyH.stockName = bodyRT.query.results.quote.Name;
        bodyH = JSON.stringify(bodyH);
        console.log('Finishing Stock Lookup');
        console.log();
        if (!error && response.statusCode == 200) callback(bodyH);
      });
    }
  });
}
function getYesterdayLastYear(year, month, day) {
	year = year - 1;
	if (day === 1) {
  	month = month - 1;
  	if (month === 0) {
  		year = year - 1;
    	month = 12;
  	}
  	if ((month === 1) || (month === 3) || (month === 5) || (month === 7) || (month === 8) || (month === 10) || (month === 12)) {
    	day = 31;
  	} else if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
    	day = 30;
    } else if (month === 2) {
    	if(isLeapYear(year)) {
      	day = 29;
      } else {
      	day = 28;
      }
    }
  } else {
  	day = day - 1;
  }
  if (month < 10) {
  	month = '0' + month;
  }
  if (day < 10) {
  	day = '0' + day;
  }
  var output = year + '-' + month + '-' + day;
  return output;
}
function getYesterday(year, month, day) {
  if (day === 1) {
  	month = month - 1;
  	if (month === 0) {
  		year = year - 1;
    	month = 12;
  	}
  	if ((month === 1) || (month === 3) || (month === 5) || (month === 7) || (month === 8) || (month === 10) || (month === 12)) {
    	day = 31;
  	} else if ((month === 4) || (month === 6) || (month === 9) || (month === 11)) {
    	day = 30;
    } else if (month === 2) {
    	if(isLeapYear(year)) {
      	day = 29;
      } else {
      	day = 28;
      }
    }
  } else {
  	day = day - 1;
  }
  if (month < 10) {
  	month = '0' + month;
  }
  if (day < 10) {
  	day = '0' + day;
  }
  var output = year + '-' + month + '-' + day;
  return output;
}
function isLeapYear(year) {
	var n = year / 4;
  if (isInt(n)) {
  	n = year / 100;
    if (isInt(n)) {
    	n = year / 400;
      if (isInt(n)) {
      	return true;
      }
      return false;
    }
    return true;
  }
  return false;
}
function isInt(n) {
   return n % 1 === 0;
}

exports.stockLookup = stockLookup;
