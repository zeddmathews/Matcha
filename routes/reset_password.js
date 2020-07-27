var express = require('express');
var router = express.Router();
var connection = require('../dbc').connection;

router.get('/', (req, res, next) => {
	res.render('reset_password', {
		title: 'Reset Password',
		loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
		errors : []
	});
});

router.post('/reset', (req, res, next) => {
	let email = req.body.email.trim();

	let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let emailErrors = {
		fieldLength : ``,
		casing : ``,
		noErrors : `No`,
		dbErrors : ``
	};
	if (email.length > 0) {
		if (!email.match(emailRegex)) {
			emailErrors[`casing`] = `Invlaid email address.`;
		}
		else if (email.match(emailRegex)) {
			emailErrors[`noErrors`] = `Yes`;
		}
	}
	else {
		emailErrors[`fieldLength`] = `This field cannot be blank.`;
	}
	console.log(email);
	if (emailErrors.noErrors === `No`) {
		res.render('reset_password', {
			title: 'Reset Password',
			loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
			errors : emailErrors
		});
	}
	else if (emailErrors.noErrors === `Yes`) {
		let findExistingUser = "SELECT * FROM users WHERE email = ?";
		let replacedValues = [email];
		connection.query(findExistingUser, replacedValues, (err, results) => {
			if (err) {
				throw err;
			}
			else {
				if (result.length === 0) {
					emailErrors.dbErrors = `None`;
				}
				else if (result.length > 0) {
					if (email === result[0].email) {
						emailErrors.dbErrors = `Email has already been taken`;
					}
				}
			}
			if (emailErrors.dbErrors !== `None`) {
				res.render('reset_password', {
					title: 'Reset Password',
					loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
					errors : emailErrors
				});
			}
			else if (emailErrors.dbErrors === `None`) {
				let resetToken = '';
				let resetValues = [resetToken, email];
				let resetQuery = `UPDATE users SET reset_token = ? WHERE email = ?`
				connection.query(resetQuery, resetValues, (err) => {
					if (err) {
						throw err;
					}
					else {
						mailOptions.to = email;
						mailOptions.subject = 'Reset Password';
						mailOptions.text = `You have requested a password reset.\n`
						+ `Please click on the link below to reset your password.\n`
						+ `http://localhost:8888/reset_password/verify?email=${email}&token=${hashToken}`;
						transporter.sendMail(mailOptions, (err) => {
							if (err) {
								throw err;
							}
							else {
								console.log(`Sent from successful signup`);
								res.render(`signup`, {
									title : `Signup`,
									loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
									errorMessages : [],
									emailStatus : `Sent`
								});
							}
						})
					}
				});
			}
		});
		res.render('reset_password', {
			title: 'Reset Password',
			loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
			errors : []
		});
	}
});

router.get('verify', (req, res, next) => {
	let email = req.query.email;
});

module.exports = router;