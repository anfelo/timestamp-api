'use strict';
const express = require('express');
const router = express.Router();

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

router.param('time', function (req, res, next, time) {
	if(time.match(/^\d+$/)){
		time = parseInt(time);
	}
	const date = new Date(time);
	const timestamp = { "unix": null, "natural": null };
	console.log('date:', date.toDateString());
	// Check if req.param is a valid date
	if(Object.prototype.toString.call(date) === "[object Date]") {
		// If valid date, send a timestamp object with the calculated unix and natural date
		// it is a date
		if (!isNaN( date.getTime())) {
			// date is valid
			timestamp.unix = date.getTime();
			timestamp.natural = monthNames[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();
		}
	}
	req.timestamp = timestamp;
	return next();
});

// GET 
// Route for displaying the api user instructions
router.get('/', function(req, res, next) {
	// Render home view
	res.render('index');
});

// GET /:time
// Route for displaying specific questions
router.get('/:time', function(req, res, next) {
	res.json(req.timestamp);
});

module.exports = router;