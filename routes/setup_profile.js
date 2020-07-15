var express = require('express');
var router = express.Router();
var connection = require('../dbc').connection;

router.get('/', (req, res, next) => {
	res.render('setupProfile', {
		title : `Setup Profile`,
		loginStatus: req.session.userID ? 'logged_in' : 'logged_out'
	});
});
router.post('/check', (req, res, next) => {
	intersts1 = req.body.interests1
	intersts2 = req.body.interests2
	intersts3 = req.body.interests3
	intersts4 = req.body.interests4
	console.log(intersts1);
	console.log(intersts2);
	console.log(intersts3);
	console.log(intersts4);
	// put all checked options from the radio group into an array, count the array check if its not === 4 then throw error, if === 4 put informatin in database and change first login === 0 
})
module.exports = router;