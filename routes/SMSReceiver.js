var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');
var stationChooser = require('./../stationChooser.js');
var fetchStationStatus = require('./../fetchStationStatus.js');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var twilio = require('twilio');

router.post('/', jsonParser, function(req, res) {
    // if (!req.body) {
    // 	return res.sendStatus(500);
    // 	console.log('BAD JSON FORM REQUEST');
    // }


    var smsPayload = req.body;
<<<<<<< HEAD

    var stationID = stationChooser.stationIDForName(smsPayload.Body);

    
    var stationStatuses = fetchStationStatus.getStationStatuses();
    console.log("station statuses: "+JSON.stringify(stationStatuses.data));



    var requestedStationStatus = fetchStationStatus.selectIndividualStation(stationStatuses.data, stationID);
    console.log(requestedStationStatus);

=======
    console.log(smsPayload);

    var stationID = stationChooser.stationIDForName(smsPayload.Body);

    var stationStatuses = fetchStationStatus.getStationStatuses();
    console.log("stationStatuses: "+stationStatuses);
    var requestedStationStatus = fetchStationStatus.selectIndividualStation(stationStatuses, stationID);
    console.log("requestedStationStatus: "+requestedStationStatus);
    
>>>>>>> 9ac5dc95f02ca6d4ddad2e5b1f99b140369278ef
    var twimlResp = new twilio.TwimlResponse();
    twimlResp.message(JSON.stringify(stationID));
    console.log("stationID at twimlRESP:" + JSON.stringify(stationID));
    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twimlResp.toString());
});

module.exports = router;
