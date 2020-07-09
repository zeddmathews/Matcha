var express = require('express');
var router = express.Router();
var connection = require('../dbc').connection;

router.post('/preferences', (req, res, next) => {
	let 
});
router.get('/', (req, res, next) => {
	// check if firstTime is a thing
	console.log(req.session.userID);
	let checkFirstLoginArray = [req.session.userID];
	let checkFirstLoginQuery = `SELECT username, firstLogin, interest1, interest2, interest3, interest4 FROM users WHERE username = ?`;
	connection.query(checkFirstLoginQuery, checkFirstLoginArray, (err, results) => {
		if (err) {
			throw err;
		}
		else {
			let priorityArray = [{
				interest1 : 0,
				interest2 : 0,
				interest3 : 0,
				interest4 : 0,
			}];
			console.log(results[0]);
			if (results[0].firstLogin === 1) {
				console.log(results[0].interest1);
				console.log(results[0].interest2);
				console.log(results[0].interest3);
				console.log(results[0].interest4);
				if (results[0].interest1 === null) {
					priorityArray[0].interest1 = 0;
				}
				else if (results[0].interest1 !== null) {
					priorityArray[0].interest1 = 1;
				}
				if (results[0].interest2 === null) {
					priorityArray[0].interest2 = 0;
				}
				else if (results[0].interest2 !== null) {
					priorityArray[0].interest2 = 1;
				}
				if (results[0].interest3 === null) {
					priorityArray[0].interest3 = 0;
				}
				else if (results[0].interest3 !== null) {
					priorityArray[0].interest3 = 1;
				}
				if (results[0].interest4 === null) {
					priorityArray[0].interest4 = 0;
				}
				else if (results[0].interest4 !== null) {
					priorityArray[0].interest4 = 1;
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
