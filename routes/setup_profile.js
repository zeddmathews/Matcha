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
	// console.log(sexualPref);
	// console.log(interests);
	// let interestsErrors = {
	// 	fieldLength : ``,
	// 	noErrors : `No`
	// };

	// let sexualPrefErrors = {
	// 	noGender : ``,
	// 	noErrors : `No`
	// }

	// // interests field
	// if (interests.length !== 4) {
	// 	interestsErrors[`fieldLength`] = `Only select 4 topics.`;
	// 	interestsErrors[`noErrors`] = `Yes`;
	// }
	// // sexual orientation field
	// if (sexualPref === undefined) {
	// 	sexualPrefErrors[`noGender`] = `This field cannot be blank.`;
	// 	sexualPrefErrors[`noErrors`] = `Yes`;
	// }

	// if (interestsErrors.noErrors === `Yes` || sexualPrefErrors.noErrors === `Yes`) {
	// 	let errors = [
	// 		interestsErrors,
	// 		sexualPrefErrors
	// 	];
	// 	res.render('/users',{
	// 		title : `Setup Profile`,
	// 		loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
	// 		errorMessages : errors
	// 	});
	// }
	// else {
	// }
	let queryStuff = [interests[0], interests[1], interests[2], interests[3], `0`, sexualPref, req.session.userID];
	let interestQuery = `UPDATE users SET interest1 = ?, interest2 = ?, interest3 = ?, interest4 = ?, firstLogin = ?, sexualOrientation = ? WHERE id = ?`;
	connection.query(interestQuery, queryStuff, (err, results)  => {
		if (err){
			console.log(err);
			throw(err);
		}
		else{
			res.render('/users')
			// res.render('/users',{
			// 	title : `Setup Profile`,
			// 	loginStatus : req.session.userID ? 'logged_in' : 'logged_out',
			// 	errorMessages : []
			// });
		}
	});
});
module.exports = router;