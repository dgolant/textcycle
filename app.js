console.log('APP JS STARTED');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var request = require('request');
var stationStatusMethods = require('./routes/stationstatus.js');


var tokens = require('./private/tokens.json');
var settings = require('./private/settings.json');
var twilio = require('twilio'),
    client = twilio(tokens.accountSID, tokens.authToken),
    cronJob = require('cron').CronJob;



var routes = require('./routes/index');
var stations = require('./routes/stations');
var stationstatus = require('./routes/stationstatus');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/stations', stations);
app.use('/stationstatus', stationstatus);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



var textJob = new cronJob("0-59 0-23 * * *", function() {
    getStationStatus(getTrackedStationInformation);
}, null, true);



function getStationStatus(callback) {
    url = 'https://gbfs.bcycle.com/bcycle_pacersbikeshare/station_status.json';

    request(url, function(error, response, html) {

        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            var stationStatusObject = JSON.parse(html);
            //callback will be the settings check
            callback(stationStatusObject.data);
        } else {
            console.log('error, broham:' + error);
        }
    })
}

function sendMessage(Message) {
    console.log('-------------MESSAGE FIRED!----------------');
    client.sendMessage({ to: tokens.receivingNumber, from: tokens.twilioNumber, body: 'Hello! Hope you’re having a good day!' }, function(err, data) {
        if (!err) {
            console.log('success!');
        } else {
            console.log(err);
        }

    });
}

function getTrackedStationInformation(stationStatusObject) {
    var trackedStationInformation = [];
    stationStatusObject['stations'].forEach(function(station, i) {
        settings.trackedStations.forEach(function(trackedStation, i) {
            if (station['station_id'] == trackedStation) {
                trackedStationInformation.push(station);
                // console.log('++++++++++++++++++++++++++++++++++++++++++++');
                // console.log('on the fly raw object: ' + trackedStationInformation)
            }
        });
    });

    console.log('---------------------------------------------------');
    console.log('rawMessageObject:' + trackedStationInformation);

    buildMessageArray(trackedStationInformation);

}

function buildMessageArray(stationStatusInformation){
        var textMessageArray = [];
        stationStatusInformation.forEach(function(station, i){
            var messageString="Currently at Station: "+station['station_id']+" there are "+station['num_bikes_available']+" available bicycles and "+station['num_docks_available']+" docks available.";
            textMessageArray.push(messageString);
        });

        textMessageArray.forEach(function(message, i){
            sendMessage(message);
        });

}
module.exports = app;