var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
var stationChooser = require('./../stationChooser.js');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var twilio = require('twilio');

router.post('/',jsonParser, function(req, res) {
	if (!req.body) {
		return res.sendStatus(500);
		console.log('BAD JSON FORM REQUEST');
	}
	var smsPayload = req.body;
	console.log(smsPayload.Body);
	var stationID = stationChooser.stationIDForName(smsPayload.Body);

	var twimlResp = new twilio.TwimlResponse();
	twimlResp.message(stationID);
	res.writeHead(200, {
        'Content-Type':'text/xml'
    });
    console.log("stationID at twimlRESP:"+stationID);
	res.send(twimlResp);
});

module.exports = router;