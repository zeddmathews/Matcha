var express = require('express');
var router = express.Router();
// var connection = require('../dbc').connection;
var mysql = require('../test');

router.get('/', (req, res, next) => {
	// check if firstTime is a thing
	console.log(req.session.userID);
	let checkFirstLoginArray = [req.session.userID];
	let checkFirstLoginQuery = `SELECT username, firstLogin, highPriority, highPriority2, mediumPriority, mediumPriority2, lowPriority, lowPriority2 FROM users WHERE id = ?`;
	connection.query(checkFirstLoginQuery, checkFirstLoginArray, (err, results) => {
		if (err) {
			throw err;
		}
		else {
			let priorityArray = [{
				highPriority : 0,
				highPriority2 : 0,
				mediumPriority : 0,
				mediumPriority2 : 0,
				lowPriority : 0,
				lowPriority2 : 0
			}];
			console.log(results[0]);
			if (results[0].firstLogin === 1) {
				console.log(results[0].highPriority);
				console.log(results[0].highPriority2);
				console.log(results[0].mediumPriority);
				console.log(results[0].mediumPriority2);
				console.log(results[0].lowPriority);
				console.log(results[0].lowPriority2);
				if (results[0].highPriority === null) {
					priorityArray[0].highPriority = 0;
				}
				else if (results[0].highPriority !== null) {
					priorityArray[0].highPriority = 1;
				}
				if (results[0].highPriority2 === null) {
					priorityArray[0].highPriority2 = 0;
				}
				else if (results[0].highPriority2 !== null) {
					priorityArray[0].highPriority2 = 1;
				}
				if (results[0].mediumPriority === null) {
					priorityArray[0].mediumPriority = 0;
				}
				else if (results[0].mediumPriority !== null) {
					priorityArray[0].mediumPriority = 1;
				}
				if (results[0].mediumPriority2 === null) {
					priorityArray[0].mediumPriority2 = 0;
				}
				else if (results[0].mediumPriority2 !== null) {
					priorityArray[0].mediumPriority2 = 1;
				}
				if (results[0].lowPriority === null) {
					priorityArray[0].lowPriority = 0;
				}
				else if (results[0].lowPriority !== null) {
					priorityArray[0].lowPriority = 1;
				}
				if (results[0].lowPriority2 === null) {
					priorityArray[0].lowPriority2 = 0;
				}
				else if (results[0].lowPriority2 !== null) {
					priorityArray[0].lowPriority2 = 1;
				}
				res.render('profile', {
					title: 'Profile',
					loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
					firstTimeSetup : 1,
					priorityArray : priorityArray
				});
			}
			else if (results[0].firstLogin === 0) {
				res.render('profile', {
					title: 'Profile',
					loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
					firstTimeSetup : 0,
					priorityArray : []
				});
			}
		}
	});
});

module.exports = router;
