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




//this function returns either an object representing station statuses or fires a callback to a given function
var getStationStatuses = function(trackedStationCallback) {
    // console.log("getStationStatuses" + 1);
    url = 'https://gbfs.bcycle.com/bcycle_pacersbikeshare/station_status.json';
    // console.log("getStationStatuses" + 2);
    request(url, function(error, response, html) {
        // console.log("getStationStatuses" + 3);
        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            var stationStatusObject = JSON.parse(html);
            //console.log("getStationStatuses" + 4);
            if (trackedStationCallback != null) {
                //callback will be the settings check
                trackedStationCallback(stationStatusObject.data);
            } else {
                console.log(stationStatusObject);
                return stationStatusObject
            }
        } else {
            console.log('error, broham:' + error);
        }
    })
}


var selectIndividualStation = function(stationStatusObject, requestedStationID) {
    var trackedStationInformation = [];
    stationStatusObject['stations'].forEach(function(station, i) {
        settings.trackedStations.forEach(function(trackedStation, i) {
            if (station['station_id'] == requestedStationID) {
                trackedStationInformation.push(station);
            }
        });
    });
    return (trackedStationInformation)
}

module.exports.getStationStatuses = getStationStatuses;
module.exports.selectIndividualStation = selectIndividualStation;
