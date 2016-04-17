var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
var stationChooser = require('./../stationChooser.js');

router.post('/', function(req, res) {
	smsPayload = JSON.parse(req);
	//console.log(smsPayload.Body);
    res.send('Got a POST request');
});

module.exports = router;