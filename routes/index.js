const express = require('express');
const router = express.Router();
// const link = "";
/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('index', {
		title: 'Matcha',
		name: 'Dud',
		login: 'Login',
		signup: 'Signup'
	});
});

module.exports = router;
