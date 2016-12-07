const request = require('request');
const cheerio = require('cheerio');

function getweather(callback) {
    const url = "http://www.cwb.gov.tw/V7/forecast/taiwan/Hsinchu_City.htm";

    request(url, function (err, res, body) {
        let $ = cheerio.load(body);

        let weather = [];
        $('table.FcstBoxTable01 > tbody > tr').each(function () {
            weather.push($(this).text().split('\n'));
        });

        let result = weather.map(function (elem) {
            return {
                time: elem[1].trim().split(' ')[0],
                temp: elem[2].trim(),
                cozy: elem[5].trim(),
                rain: elem[6].trim()
            }
        });

        let message = result.map(function (e) {
            return e.time + '：  溫度：' + e.temp + '，降雨機率：' + e.rain + '，舒適度：' + e.cozy;
        }).join('\n');

        callback(err, message);
    });
}

getweather(function (err, message) {
    console.log('新竹市\n' + message);
});