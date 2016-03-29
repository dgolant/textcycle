var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');

router.get('/stationstatus', function(req, res, next) {
    url = 'https://gbfs.bcycle.com/bcycle_pacersbikeshare/station_status.json';

    request(url, function(error, response, html) {

        // First we'll check to make sure no errors occurred when making the request

        if (!error) {
            //var stationStatusObject = JSON.parse(html);
            //console.log(stationStatusObject.data);
            //res.statusCode = 200;
            //console.log(res)
            // res.setHeader('Content-Type', 'application/json');
            // res.end(stationStatusObject.data);
            // res.render('stationstatus', { stationsstatus: 'the station status page'});
        } else {
            console.log('error, broham');
        }
    })
});






module.exports = router;