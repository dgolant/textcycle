var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');


var twilio = require('twilio'),
    client = twilio('ACCOUNTSID', 'AUTHTOKEN'),
    cronJob = require('cron').CronJob;

router.get('/', function(req, res, next) {
    url = 'https://gbfs.bcycle.com/bcycle_pacersbikeshare/station_status.json';

    request(url, function(error, response, html) {

        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            var stationStatusObject = JSON.parse(html);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(stationStatusObject.data);
        } else {
            console.log('error, broham');
        }
    })
});


var textJob = new cronJob('10 22 * * *', function() {
    console.log('fired');
    client.sendMessage({ to: 'recipient number', from: 'twilio number', body: 'Hello! Hope you’re having a good day!' }, function(err, data) {});
}, null, true);







module.exports = router;