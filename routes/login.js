const express = require('express');
const router = express.Router();
// const path = require('path');

router.get('/', (req, res, next) => {
	res.render('login', {
		title: 'Matcha'
	});
	// var usernameEmail = document.getElementById('Username/Email');
	// var password = document.getElementById('Password');
	// var submit = document.getElementById('Submit');

	// submit.addEventListener('click', () => {
	// 	console.log('fug you');
	// });
});
// app.post('/login', (req, res) => {
// 	res.send(`Welcome ${res.body.username}`);
// });

module.exports = router;