var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');

router.get('/', function(req, res, next) {
    url = 'https://gbfs.bcycle.com/bcycle_pacersbikeshare/station_information.json';
    request(url, function(error, response, html){
        if(!error){
            var stationObject = JSON.parse(html);     
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(stationObject.data);
        }
        else{
        	console.log('error, broham');
        }
    })
});






module.exports = router;