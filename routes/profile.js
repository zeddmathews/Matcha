var express = require('express');
var router = express.Router();
var connection = require('../dbc').connection;

router.get('/', (req, res, next) => {
	// check if firstTime is a thing
	console.log(req.session.userID);
	let checkFirstLoginArray = [req.session.userID];
	let checkFirstLoginQuery = `SELECT username, firstLogin FROM users WHERE username = ?`;
	connection.query(checkFirstLoginQuery, checkFirstLoginArray, (err, results) => {
		if (err) {
			throw err;
		}
		else {
			console.log(results[0]);
			if (results[0].firstLogin === 1) {
				res.render('profile', {
					title: 'Profile',
					loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
					firstTimeSetup : 1
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
