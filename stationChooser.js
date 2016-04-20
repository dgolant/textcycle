console.log('APP JS STARTED');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var fs = require('fs');
var stationMetaDataFromDisk = require('./stationMetaData.json');



var stationIDForName = function(requestedStationName) {
    var stationsMDArray = stationMetaDataFromDisk['data']['stations'];
    var requestedID = '000';
    // console.log('stationChooser ENTERED');
    stationsMDArray.forEach(function(stationMetaObject, i) {
        // console.log('stationChooser LOOP ENTERED');
        // console.log(requestedStationName);
        if (requestedStationName == stationMetaObject['name']) {
            // console.log('stationChooser LOOP CONDITIONAL ENTERED');
            requestedID = stationMetaObject['station_id'];
            // console.log("stationID in loop:"+requestedID);
        }
    });
    return requestedID;
}

module.exports.stationIDForName = stationIDForName;
