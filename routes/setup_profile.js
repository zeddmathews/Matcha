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
	interests = req.body.interests;
	sexualPref = req.body.sexualOrientation;
	console.log(sexualPref);
	// console.log(interests);
	let queryStuff = [interests[0], interests[1], interests[2], interests[3], `0`, req.session.userID];
	let interestQuery = `UPDATE users SET interest1 = ?, interest2 = ?, interest3 = ?, interest4 = ?, firstLogin = ? WHERE id = ?`;
	connection.query(interestQuery, queryStuff, (err, results)  => {
		if (err){
			console.log(err);
			throw(err);
		}
		else{
			res.render('/users');
		}
	})
})
module.exports = router;