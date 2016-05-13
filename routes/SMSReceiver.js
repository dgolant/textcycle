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

    var smsPayload = req.body;

    var stationID = stationChooser.stationIDForName(smsPayload.Body);

    fetchStationStatus.getStationStatuses().then(function(response) {
        console.log("+++++++++++++++++++++++++++++");
        // console.log("station statuses: " + JSON.stringify(response.data));
        // console.log("///////////////////////////////////");

        var stationStatuses = response;
        console.log("///////////////////////////////////");
        var requestedStationStatus = fetchStationStatus.selectIndividualStation(stationStatuses.data, stationID);
        console.log(requestedStationStatus);

        console.log(smsPayload);
        console.log("=================================");

        var stationID = stationChooser.stationIDForName(smsPayload.Body);

        console.log("stationStatuses: " + stationStatuses);
        var requestedStationStatus = fetchStationStatus.selectIndividualStation(stationStatuses, stationID);
        console.log("requestedStationStatus: " + requestedStationStatus);
        var twimlResp = new twilio.TwimlResponse();
        twimlResp.message(JSON.stringify(stationID));
        console.log("stationID at twimlRESP:" + JSON.stringify(stationID));
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.end(twimlResp.toString());
    }, function(error) {
        console.error("Failed!", error);
    });
});

module.exports = router;
