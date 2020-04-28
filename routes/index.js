var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', {
		title: 'Index' ,
		loginStatus: req.session.userID ? 'logged_in' : 'logged_out'
	});
});

module.exports = router;
