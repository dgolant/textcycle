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
    return new Promise(function(resolve, reject) {
        url = 'https://gbfs.bcycle.com/bcycle_pacersbikeshare/station_status.json';
        // console.log("getStationStatuses" + 2);
        request(url, function(error, response, html) {
            if (!error) {
                var stationStatusObject = JSON.parse(html);
                //console.log("getStationStatuses" + 4);
                if (trackedStationCallback != null) {
                    //callback will be the settings check
                    trackedStationCallback(stationStatusObject.data);
                } else {
                    // console.log(":::::::::::::::::::::::::::::::::::::::")
                    // console.log(stationStatusObject);
                    resolve(stationStatusObject)
                }
            } else {
                reject(Error(error));
                console.log("fails in fetch station status");
            }
        })
    });
}


var selectIndividualStation = function(stationStatusObject, requestedStationID) {
    var trackedStationInformation = [];
    console.log("00000000000000000000000000000")
    stationStatusObject['stations'].forEach(function(station, i) {
        console.log("111111111111111111111111")
        settings.trackedStations.forEach(function(trackedStation, i) {
            console.log("222222222222222222")
            if (station['station_id'] == requestedStationID) {
                console.log("33333333333333333333333")
                trackedStationInformation.push(station);
            }
        });
    });
    return (trackedStationInformation)
}

module.exports.getStationStatuses = getStationStatuses;
module.exports.selectIndividualStation = selectIndividualStation;
