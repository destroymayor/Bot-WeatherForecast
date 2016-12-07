var request = require('request');
var cheerio = require('cheerio');

var url = "http://www.cwb.gov.tw/V7/forecast/taiwan/Hsinchu_City.htm";
request(url, function (err, res, body) {
    var $ = cheerio.load(body);
    var weather = [];
    $('table.FcstBoxTable01 > tbody > tr').each(function () {
        weather.push($(this).text().split('\n'));
    });
    console.log(weather);
});