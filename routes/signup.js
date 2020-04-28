var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('signup', {
		title: 'Signup',
		loginStatus: req.session.userID ? 'logged_in' : 'logged_out',
		errors : [] });
});

router.post('/create', (req, res) => {
	// console.log(`dfsgs`);
	let name = req.body.name.trim().toLowerCase();
	let surname = req.body.surname.trim().toLowerCase();
	let username = req.body.username.trim();
	let email = req.body.email.trim();
	let password = req.body.password.trim();
	let confirmPassword = req.body.confirmPassword.trim();

	let alphaRegex = /^[A-Za-z]+$/;
	let alphaNumRegex = /^[0-9A-Za-z_.-]+$/;
	let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;

	let nameErrors = {
		length : ``,
		casing : ``,
		noErrors : `No`,
	};
	let surnameErrors = {
		length : ``,
		casing : ``,
		noErrors : `No`
	};
	let usernameErrors = {
		length : ``,
		casing : ``,
		noErrors : `No`
	};
	let emailErrors = {
		length : ``,
		casing : ``,
		noErrors : `No`
	};
	let passwordErrors = {
		length : ``,
		casing : ``,
		noErrors : `No`
	};
	let confirmPasswordErrors = {
		length : ``,
		casing : ``,
		noErrors : `No`
	};
	// name field
	if (name.length > 0) {
		// console.log(`nameErrors`);
		if (!name.match(alphaRegex)) {
			nameErrors[`casing`] = `Only uppercase and lowercase characters allowed`;
		}
		if (name.length > 20) {
			nameErrors[`length`] = `May not be more than 20 characters`;
		}
		else if (name.match(alphaRegex) && name.length <= 20) {
			// console.log(`noNameErrors`);
			nameErrors[`noErrors`] = `Yes`;
		}
	}
	else {
		// console.log(`blankErrors`);
		nameErrors[`length`] = `This field cannot be blank`;
	}
	// surname field
	if (surname.length > 0) {
		// console.log(`surnameErrors`);
		if (!surname.match(alphaRegex)) {
			surnameErrors[`casing`] = `Only uppercase and lowercase characters allowed`;
		}
		if (surname.length > 20) {
			surnameErrors[`length`] = `May not be more than 20 characters`;
		}
		else if (surname.match(alphaRegex) && surname.length <= 20) {
			surnameErrors[`noErrors`] = `Yes`;
		}
	}
	else {
		// console.log(`blankErrors`);
		surnameErrors[`length`] = `This field cannot be blank`;
	}
	// username field
	if (username.length > 0) {
		// console.log(`usernameErrors`);
		if (!username.match(alphaNumRegex)) {
			usernameErrors[`casing`] = `Allowed characters include: Uppercase and lowercase letters and numbers`;
		}
		if (username.length > 30) {
			usernameErrors[`length`] = `May not be more than 30 characters`;
		}
		else if (username.match(alphaNumRegex) && username.length <= 30) {
			usernameErrors[`noErrors`] = `Yes`;
		}
	}
	else {
		// console.log(`blankErrors`);
		usernameErrors[`length`] = `This field cannot be blank`;
	}
	// email field
	if (email.length > 0) {
		// console.log(`emailErrors`);
		if (!email.match(emailRegex)) {
			emailErrors[`casing`] = `Invlaid email address`;
		}
		else if (email.match(emailRegex)) {
			emailErrors[`noErrors`] = `Yes`;
		}
	}
	else {
		// console.log(`blankErrors`);
		emailErrors[`length`] = `This field cannot be blank`;
	}
	// password field
	if (password.length > 0) {
		// console.log(`passwordErrors`);
		if (!password.match(passwordRegex)) {
			passwordErrors[`casing`] = `Minimum 8 characters comprised of: 1 uppercase and 1 lowercase character, 1 number, and 1 special character`;
		}
		if (password.length > 15) {
			passwordErrors[`length`] = `Password exceeds maximum number of characters (15)`;
		}
		else if (password.match(passwordRegex) && password.length <= 15) {
			passwordErrors[`noErrors`] = `Yes`;
			// confirmPassword field
			if (confirmPassword.length > 0) {
				// console.log(`confirmPasswordErrors`);
				if (confirmPassword !== password) {
					confirmPasswordErrors[`casing`] = `Passwords do not match`;
				}
				else if (confirmPassword === password) {
					confirmPasswordErrors[`noErrors`] = `Yes`;
				}
			}
			else {
				// console.log(`blankErrors`);
				confirmPasswordErrors[`length`] = `This field cannot be blank`;
			}
		}
	}
	else {
		// console.log(`blankErrors`);
		passwordErrors[`length`] = `This field cannot be blank`;
	}
	if (nameErrors.noErrors === `No` || surnameErrors.noErrors === `No` || usernameErrors.noErrors === `No` || emailErrors.noErrors === `No` || passwordErrors.noErrors === `No` || confirmPasswordErrors.noErrors === `No`) {
		console.log(`Found errors`);
		let errors = [
			nameErrors,
			surnameErrors,
			usernameErrors,
			emailErrors,
			passwordErrors,
			confirmPasswordErrors
		];
		res.render(`signup`, {
			title : `Signup`,
			loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
			errors : errors
		});
	}
	else if (nameErrors.noErrors === `Yes` && surnameErrors.noErrors === `Yes` && usernameErrors.noErrors === `Yes` && emailErrors.noErrors === `Yes` && passwordErrors.noErrors === `Yes` && confirmPasswordErrors.noErrors === `Yes`) {
		// input database inserting things
		// console.log(`noerrors found`);
		res.redirect(`/login`);
	}
});

module.exports = router;
