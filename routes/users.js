var express = require('express');
var router = express.Router();
var connection = require('../dbc').connection;

/* GET users listing. */
router.get('/', (req, res, next) => {
	let id = req.session.userID;
	let count = `SELECT COUNT(*) AS 'rowCount' FROM users`;
	connection.query(count, (err, results) => {
		if (err) {
			throw err;
		}
		else {
			console.log(results[0].rowCount);
			rowLen = results[0].rowCount;
			res.render('users', {
				title : 'Users',
				loginStatus: req.session.userID ? 'logged_in' : 'logged_out',
				rowLen : rowLen
				// arrayValues : arrayValues
			});
			// i = 1;
			// let arrayValues = [];
			// while (i <= rowLen){
			// 	let selectValues = `username, firstLogin, interest1, interest2, interest3, interest4, 
			// 	sexualOrientation, name, surname, age, gender`
			// 	let displayUsersQuery = `SELECT ${selectValues} FROM users WHERE id = ?`;
			// 	connection.query(displayUsersQuery, i, (err, results) => {
			// 		if (err) {
			// 			throw err;
			// 		}
			// 		else {
			// 			console.log('Getting values');
			// 			let username = results[0].username;
			// 			let age = results[0].age;
			// 			let gender = results[0].gender;
			// 			let sexualPref = results[0].sexualOrientation;
			// 			let priorityArray = [{
			// 				interest1 : '',
			// 				interest2 : '',
			// 				interest3 : '',
			// 				interest4 : '',
			// 			}];
			// 			if (results[0].interest1 !== null) {
			// 				priorityArray[0].interest1 = results[0].interest1;
			// 				// console.log(results[0].interest1);
			// 			}
			// 			if (results[0].interest2 !== null) {
			// 				priorityArray[0].interest2 = results[0].interest2;
			// 			}
			// 			if (results[0].interest3 !== null) {
			// 				priorityArray[0].interest3 = results[0].interest3;
			// 			}
			// 			if (results[0].interest4 !== null) {
			// 				priorityArray[0].interest4 = results[0].interest4;
			// 			}
			// 			let userArray = [
			// 				username,
			// 				age,
			// 				gender,
			// 				sexualPref,
			// 				priorityArray
			// 			];
			// 			arrayValues.push({userArray});
			// 			// console.log(userArray);
			// 		}
			// 		console.log(arrayValues);
			// 		// let userValuesArray = arrayValues;
			// 		// console.log(userValuesArray);
			// 	});
			// 	i++;
			// }			
		}
	});
});

module.exports = router;

// 		res.render('users', {
	// 			title : 'Users',
	// 			loginStatus: req.session.userID ? 'logged_in' : 'logged_out',
	// 			priorityArray : priorityArray,
	// 			username : username,
	// 			age : age,
	// 			gender : gender,
	// 			sexualPref : sexualPref
	// 		});
	