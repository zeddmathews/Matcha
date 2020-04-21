var mysql = require('mysql');

let options = {
	// connectionLimit: 100,
	host: 'localhost', //might need to change to xammp url (192.168.64.2)
	// port: 3306,
	user: 'root',
	password: '123456',
	database: 'matcha',
	// socketPath: '/var/run/mysqld/mysqld.sock',
};

let connection = mysql.createConnection(options);

connection.connect((err) => {
	if (err) {
		console.log(err);
	}
	else {
		// let query = 'CREATE DATABASE IF NOT EXISTS matcha';
		// connection.query(query, () => {
		// 	console.log(``);
		// });
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