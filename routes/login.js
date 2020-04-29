var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
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
	let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
	let usernameEmail = req.body.usernameEmail.trim();
	let password = req.body.password.trim();

	let usernameEmailErrors = {
		fieldLength : ``,
		casing : ``,
		noErrors : `No`,
		dbErrors : ``
	};
	let passwordErrors = {
		fieldLength : ``,
		casing : ``,
		noErrors : `No`,
		dbErrors : ``
	}

	if (usernameEmail.length > 0) {
		if (!usernameEmail.match(alphaNumRegex) && !usernameEmail.match(emailRegex)) {
			usernameEmailErrors.casing = `Invalid syntax`;
		}
		else {
			if (usernameEmail.match(alphaNumRegex)) {
				usernameEmailErrors.noErrors = `Yes`;
			}
			else if (usernameEmail.match(emailRegex)) {
				usernameEmailErrors.noErrors = `Yes`;
			}
		}
	}
	else {
		usernameEmailErrors.fieldLength = `This field cannot be blank`;
	}
	if (password.length > 0) {
		if (!password.match(passwordRegex)) {
			passwordErrors.casing = `Invalid password`;
		}
		if (password.length > 15) {
			passwordErrors.fieldLength = `Character limit exceeded`;
		}
		else if (password.match(passwordRegex) && password.length <= 15) {
			passwordErrors.noErrors = `Yes`;
		}
	}
	else {
		passwordErrors.fieldLength = `This field cannot be blank`;
	}
	if (usernameEmailErrors.noErrors === `No` || passwordErrors === `No`) {
		console.log(`It done didn't worked`);
		let errors = [
			usernameEmailErrors,
			passwordErrors
		];
		res.render('Login', {
			title: 'Login',
			loginStatus: req.session.userID ? 'logged_in' : 'logged_out',
			errors: errors,
			verify: ``
		});
	}
	else if (usernameEmailErrors.noErrors === `Yes` && passwordErrors.noErrors === `Yes`) {
		console.log(`It done worked`);
		let saltRounds = 10;
		let dataCheck = [usernameEmail, usernameEmail];
		let dataCheckQuery = `SELECT email, username, password FROM users WHERE email = ? OR username = ?`
		connection.query(dataCheckQuery, dataCheck, (err, results) => {
			if (err) {
				throw err;
			}
			else if (results.length === 0) {
				console.log(`no hablo engles`);
			}
			else if (results.length > 0) {
				console.log(results[0].password);
				console.log(password);
				console.log(`Your face`);
				// let hashComp = bcrypt.hashSync(password, saltRounds);
				if (bcrypt.compareSync(results[0].password, password)) {
					console.log(`Found password mugglefucker`);
				}
				else {
					console.log(`Wrong password bitch`);
				}
			}
			// console.log(fields);
		});
	}
});

module.exports = router;
