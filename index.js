const request = require('request');
const moment = require('moment');
var _ = require('lodash');
const cheerio = require('cheerio');

var config = require('./Config');

var aCookies, sCSRFToken;
var login1 = (fnSuccess, fnError) => {
    request(config.login_url, function (error, response, body) {
        if (!error) {
            sCSRFToken = cheerio.load(body)("meta[name=csrf-token]").attr("content");
            aCookies = response.headers["set-cookie"];
            fnSuccess && fnSuccess();
        } else {
            fnError && fnError();
        }
    });
};

var login2 = fnSuccess => {
    request({
        url: config.login_url,
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "cookie": aCookies.join("; ")
        },
        body: `utf8=%E2%9C%93&authenticity_token=${encodeURIComponent(sCSRFToken)}&source_page=main-flow&person%5Bemail%5D=${encodeURIComponent(process.env.email)}&person%5Bpassword%5D=${encodeURIComponent(process.env.pass)}&person%5Bremember_me%5D=0&person%5Bremember_me%5D=1&button=`
    }).on('response', res => {
        console.log(res.headers["set-cookie"])
        fnSuccess && fnSuccess();
    })
};

login1(() => {
    login2();
});