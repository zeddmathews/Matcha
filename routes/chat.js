var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
	res.render('chat', {
		title: 'Chat',
		loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
	});
});

module.exports = router;
