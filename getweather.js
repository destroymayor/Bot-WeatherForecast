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
            return e.time + '：溫度：' + e.temp + ' 降雨機率：' + e.rain;
        }).join('\n');

        let date = new Date();
        let date_ = date.getFullYear() + "年" + (date.getMonth() + 1) + "月" + date.getDay() + "日",
            date_time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        callback(err, "新竹市天氣預報 當前時間： " + date_ + " " + date_time + " \n " + message);
        console.log(date_ + " " + date_time + "\n" + message);
    });
}

module.exports = getweather;