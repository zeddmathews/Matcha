var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Signup', loginStatus: req.session.userID ? 'logged_in' : 'logged_out', errors : [] });
});

router.post('/create', (req, res) => {
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
		noErrors : ``,
	};
	let surnameErrors = {
		length : ``,
		casing : ``,
		noErrors : ``
	};
	let usernameErrors = {
		length : ``,
		casing : ``,
		noErrors : ``
	};
	let emailErrors = {
		length : ``,
		casing : ``,
		noErrors : ``
	};
	let passwordErrors = {
		length : ``,
		casing : ``,
		noErrors : ``
	};
	let confirmPasswordErrors = {
		length : ``,
		casing : ``,
		noErrors : ``
	};
	// name field
	if (name.length > 0) {
		if (!name.match(alphaRegex)) {
			nameErrors[`casing`] = `Only uppercase and lowercase characters allowed`;
		}
		if (name.length > 20) {
			nameErrors[`length`] = `May not be more than 20 characters`;
		}
		else if (name.match(alphaRegex) && name.length <= 20) {
			nameErrors[`noErrors`] = `Yes`;
		}
	}
	else {
		nameErrors[`length`] = `This field cannot be blank`;
	}
	// surname field
	if (surname.length > 0) {
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
		surnameErrors[`length`] = `This field cannot be blank`;
	}
	// username field
	if (username.length > 0) {
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
		usernameErrors[`length`] = `This field cannot be blank`;
	}
	// email field
	if (email.length > 0) {

	}
	else {
		emailErrors[`length`] = `This field cannot be blank`;
	}
	// password field
	if (password.length > 0) {

	}
	else {
		passwordErrors[`length`] = `This field cannot be blank`;
	}
	// confirmPassword field
	if (confirmPassword.length > 0) {

	}
	else {
		confirmPasswordErrors[`length`] = `This field cannot be blank`;
	}
	let errors = [
		nameErrors,
		surnameErrors,
		usernameErrors,
		emailErrors,
		passwordErrors,
		confirmPasswordErrors
	];
});

module.exports = router;
