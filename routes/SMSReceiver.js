var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
var stationChooser = require('./../stationChooser.js');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();


router.post('/',jsonParser, function(req, res) {
	if (!req.body) {
		return res.sendStatus(400);
		console.log('BAD JSON FORM REQUEST');
	}
	var smsPayload = req.body;
	console.log(smsPayload.Body);
	var stationID = stationChooser.stationIDForName('StationID: '+smsPayload.Body);
	res.send('welcome, ' + req.body);
});

module.exports = router;