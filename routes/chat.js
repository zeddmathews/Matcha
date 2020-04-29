var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
	res.render('chat', {
		title: 'Chat'
	});
});

module.exports = router;
