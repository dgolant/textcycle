var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');


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






module.exports = router;