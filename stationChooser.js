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


function stationIDForName(requestedStationName) {
    var stationsMDArray = stationMetaDataFromDisk['data']['stations'];
    stationsMDArray.forEach(function(stationMetaObject, i) {
        if (requestedStationNameu == stationMetaObject['name']) {
            var requestedID = stationMetaObject['station_id'];
            return requestedID;
        }
    });
    return (false);
}
