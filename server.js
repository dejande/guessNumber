// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express		= require('express'); 		// call express
var app			= express(); 				// define our app using express
var bodyParser	= require('body-parser');
var http 		= require("http");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 8080; 		// set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	console.log('Something is happening.');
	next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });
});

// Get all expenses
router.route('/data/').get(function(req, res) {
	var options = {
		host: "naslov.eu",
		path: "/sdcard.cgi?language=ie&action=list&key=date&order=descend&ch=1&page=1&dir=event&sTime=1980-01-01-00-00-00&eTime=2032-12-31-23-59-59",
		method: "GET",
		auth: "admin:airlive"
	};

	var request = http.request(options, function(response) {
		var str = "";

		response.on('data', function(chunk) {
			str += chunk;
		});

		response.on('end', function() {
			res.json({result: str});
		});
	}).end();
});
//
//

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server on port ' + port);
