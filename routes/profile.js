var express = require('express');
var router = express.Router();
var connection = require('../dbc').connection;

router.get('/', (req, res, next) => {
	// check if firstTime is a thing
	console.log(req.session.userID);
	let checkFirstLoginArray = [req.session.userID];
	let checkFirstLoginQuery = `SELECT username, firstLogin, highPriority, mediumPriority, lowPriority FROM users WHERE username = ?`;
	connection.query(checkFirstLoginQuery, checkFirstLoginArray, (err, results) => {
		if (err) {
			throw err;
		}
		else {
			let priorityArray = [{
				highPriority : 0,
				mediumPriority : 0,
				lowPriority : 0
			}];
			console.log(results[0]);
			if (results[0].firstLogin === 1) {
				console.log(results[0].highPriority);
				console.log(results[0].mediumPriority);
				console.log(results[0].lowPriority);
				if (results[0].highPriority === null) {
					priorityArray[0].highPriority = 0;
				}
				else if (results[0].highPriority !== null) {
					priorityArray[0].highPriority = 1;
				}
				if (results[0].mediumPriority === null) {
					priorityArray[0].mediumPriority = 0;
				}
				else if (results[0].mediumPriority !== null) {
					priorityArray[0].mediumPriority = 1;
				}
				if (results[0].lowPriority === null) {
					priorityArray[0].lowPriority = 0;
				}
				else if (results[0].lowPriority !== null) {
					priorityArray[0].lowPriority = 1;
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
					firstTimeSetup : 0
				});
			}
		}
	});
});

module.exports = router;
