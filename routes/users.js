var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
	res.render('users', {
		title : 'Users',
		loginStatus: req.session.userID ? 'logged_in' : 'logged_out',
	});
});

module.exports = router;
