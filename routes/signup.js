var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Signup', loginStatus: req.session.userID ? 'logged_in' : 'logged_out' });
});

router.post('/create', (req, res) => {
	let name = req.body.name;
	let surname = req.body.surname;
	let username = req.body.username;
	let email = req.body.email;
	let password = req.body.password;
	let confirmPassword = req.body.confirmPassword;

	let nameRegex = /^[A-Za-z]+$/;
	let surnameRegex = ``;
	let usernameRegex = ``;
	let emailRegex = ``;
	let passwordRegex = ``;

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
		if (!name.match(nameRegex)) {
			nameErrors[`casing`] = `Only uppercase and lowercase characters allowed`;
		}
		if (name.length > 20) {
			nameErrors[`length`] = `May not be more than 20 characters`;
		}
		else if (name.match(nameRegex) && name.length <= 20) {
			nameErrors[`noErrors`] = `Yes`;
		}
	}
	else {
		nameErrors[`length`] = `This field cannot be blank`;
	}
	// surname field
	if (surname.length > 0) {

	}
	else {
		surnameErrors[`length`] = `This field cannot be blank`;
	}
	// username field
	if (username.length > 0) {

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
});

module.exports = router;
