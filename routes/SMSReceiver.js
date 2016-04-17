var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');

app.post('/', function(req, res) {
	console.log(req);
    res.send('Got a POST request');
});
