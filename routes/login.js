var express = require('express');
var router = express.Router();
var connection = require('../dbc').connection;

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('login', {
		title: 'Login',
		loginStatus: req.session.userID ? 'logged_in' : 'logged_out',
		errors: [],
		verify: ``
	});
});
router.post('/attempt', (req, res, next) => {
	let alphaNumRegex = /^[0-9A-Za-z_.-]+$/;
	let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let usernameEmail = req.body.usernameEmail;
	let password = req.body.password;

	let usernameEmailErrors = {
		fieldLength : ``,
		casing : ``,
		noErrors : ``,
		dbErrors : ``
	};

	if (usernameEmail.length > 0) {
		if (!usernameEmail.match(alphaNumRegex) && !usernameEmail.match(emailRegex)) {
			usernameEmailErrors.casing = `Invalid syntax`;
		}
		else {
			if (usernameEmail.match(alphaNumRegex)) {

			}
		}
	}
	else {
		usernameEmailErrors.fieldLength = `This field cannot be blank`;
	}

	let dataCheck = [usernameEmail, usernameEmail];
	let dataCheckQuery = `SELECT email, username FROM users WHERE email = ? OR username = ?`
	connection.query(dataCheckQuery, dataCheck, (err, results) => {
		if (err) {
			throw err;
		}
		else if (results.length === 0) {
			console.log(`no hablo engles`);
		}
		else if (results.length > 0) {
			console.log(`Your face`);
		}
		// console.log(fields);
	});
});

module.exports = router;
