const mysql = require('./test');

const findExists = async function (data) {
	const connection = await mysql.connection();
	const problem = [];
	try {
		console.log(`no u`);
		await connection.query('START TRANSACTION');
		if (data.username !== '') {
			console.log(`and then`);
			let existingUsername = await connection.query(`SELECT COUNT (*) FROM users WHERE username = ?`, [data.username]);
			if (existingUsername[0]['COUNT (*)'] > 0) {
				problem.push('This username has been taken');
			}
		}
		if (data.email !== '') {
			let existingEmail = await connection.query(`SELECT COUNT (*) FROM users WHERE email = ?`, [data.email]);
			if (existingEmail[0]['COUNT (*)'] > 0) {
				problem.push('This email has been taken');
			}
		}
		if (problem.length > 0) { 
			await connection.release();
			return (problem);
		}
		else {
			console.log(`Well that didn't fuck out, oddly enough`);
		}
	}
	catch (err) {
		await connection.query('ROLLBACK');
		console.log('ROLLBACK at findExists');
		throw (err);
	}
	finally {
		connection.release();
		return (problem);
	}
};

const signUp = async function(formData) {
	
}

module.exports = {
	mysql,
	findExists
};