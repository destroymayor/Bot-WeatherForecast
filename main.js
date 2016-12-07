const login = require('facebook-chat-api');
const getweather = require('./getweather');

const account = {
    email: '',
    password: ''
};

login(account, function (err, api) {
    //發送對象//
    let id = 100000344642472;
    let interval = 3 * 3600 * 1000;

    // setInterval(function () {
    getweather(function (err, weather) {
        api.sendMessage(weather, id);
    });
    // }, interval);
});