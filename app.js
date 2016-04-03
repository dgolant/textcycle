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



var textJob = new cronJob("32 11 * * *", function() {

    





    console.log('-------------MESSAGE FIRED!----------------');
    client.sendMessage({ to: tokens.receivingNumber, from: tokens.twilioNumber, body: 'Hello! Hope you’re having a good day!' }, function(err, data) {
        if (!err) {
            console.log('success!');
        } else {
            console.log(error);
        }

    });
}, null, true);



function getStationStatus() {
    url = 'https://gbfs.bcycle.com/bcycle_pacersbikeshare/station_status.json';

    request(url, function(error, response, html) {

        // First we'll check to make sure no errors occurred when making the request
        if (!error) {
            var stationStatusObject = JSON.parse(html);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.send(stationStatusObject.data);
        } else {
            console.log('error, broham');
        }
    })
}

module.exports = app;