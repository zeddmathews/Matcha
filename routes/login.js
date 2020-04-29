var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('login', {
		title: 'Login',
		loginStatus: req.session.userID ? 'logged_in' : 'logged_out',
		errors: [],
		verify: ``
	});
});
router.post('/attempt', () => {

});

module.exports = router;
