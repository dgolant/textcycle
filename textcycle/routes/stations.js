var express = require('express');
var router = express.Router();
var request = require('request');
var util = require('util');

router.get('/', function(req, res, next) {
    url = 'https://gbfs.bcycle.com/bcycle_pacersbikeshare/station_information.json';

    // The structure of our request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html

    request(url, function(error, response, html){

        // First we'll check to make sure no errors occurred when making the request

        if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality


            //console.log(page.html());
            // Finally, we'll define the variables we're going to capture
            var stationObject = JSON.parse(html);     
            console.log(stationObject.data);
        }
        else{
        	console.log('error, broham');
        }
    })
});






module.exports = router;