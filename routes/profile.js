var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('profile', {
		title: 'Profile',
		loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
		firstTimeSetup : 0
	});
});

module.exports = router;
