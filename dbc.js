var mysql = require('mysql');

let options = {
	// connectionLimit: 100,
	host: 'localhost', //might need to change to xammp url (192.168.64.2)
	// port: 3306,
	user: 'root',
	password: '123456',
	// database: 'matcha',
	// socketPath: '/var/run/mysqld/mysqld.sock',
};

let connection = mysql.createConnection(options);

connection.connect((err) => {
	let on = `Success`;
	let off = `Fail`;
	let db = `matcha`;
	let dbQuery = `CREATE DATABASE IF NOT EXISTS ${db}`;
	let use = `USE ${db}`;
	let usersTable = `CREATE TABLE IF NOT EXISTS users`;
	let matchedTable = `CREATE TABLE IF NOT EXISTS matched`;
	if (err) {
		console.log(`Initial connection: ${off}`);
		throw err;
	}
	else {
		console.log(`Initial connection: ${on}`);
		connection.query(dbQuery, (err) => {
			if (err) {
				console.log(`Database connection: ${off}`);
				throw err;
			}
			else {
				console.log(`Database connection ${on}`);
				connection.query(use, (err) => {
					if (err) {
						console.log(`Database selection: ${off}`);
						throw err;
					}
					else {
						console.log(`Database selection: ${on}`);
						connection.query(`${usersTable}(`
						+ `id INT NOT NULL AUTO_INCREMENT,`
						+ `PRIMARY KEY(id),`
						+ `name VARCHAR(100),`
						+ `surname VARCHAR(100),`
						+ `email VARCHAR(100),`
						+ `username VARCHAR(100),`
						+ `password VARCHAR(200),`
						+ `high_priority VARCHAR(200),`
						+ `medium_priority VARCHAR(200),`
						+ `low_priority VARCHAR(200),`
						+ `rating VARCHAR(100),`
						+ `status VARCHAR(100),`
						+ `)`, (err) => {
							if (err) {
								console.log(`Users table connection: ${off}`);
								throw err;
							}
							else {
								console.log(`Users table connection: ${on}`);
								connection.query(`${matchedTable}(`
								+ `PRIMARY KEY(id),`
								+ `username VARCHAR(100)`
								+ `)`, (err) => {
									if (err) {
										console.log(`Matched table connection: ${off}`);
										throw err;
									}
								});
							}
						});
					}
				});
				console.log(`Database successfully created`);
			}
		});
		console.log(`Connected to database: ${options.database}`);
	}
});

module.exports = {
	mysql,
	connection
}

// pool.getConnection((err, connection) => {
// 	if (err) {
// 		throw err
// 	}
// 	else {
// 		console.log(`Finally`);
// 	}
// })