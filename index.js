const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoDB = require("mongodb");
const path = require('path');
const app = express();
const port = process.env.PORT || 8888;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended : false }));

app.listen(port, (err) => {
	if (err) {
		throw err;
	}
	else {
		console.log(`Server running on port ${port}`);
	}
});

app.get('/', (req, res) => {
	// res.render('index', (err, html) => {

	// });
	res.sendFile(path.join(__dirname+'/index.html'));
	// res.send(`Root`);
});

const mongoURI = "mongodb+srv://overStupid:@isPass175@matchacluster-hrimb.mongodb.net/test?retryWrites=true&w=majority";
mongoDB.connect(mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}, (err, client) => {
	if (err) {
		console.log('Error connecting to database');
		throw err;
	}
	else {
		console.log(`Connected to the database at: ${mongoURI}`);
		client.close();
	}
});
// const defaultRoute = '/';

// const checkRoute = (route) => {
// 	switch (route) {
// 		case "/login":

// 	}
// };

// if (app.get('/')) {
// 	(req, res) => {

// 	}
// }
//	use app.get with a switch statement to redirect to actual pages or 404 on a fuckout


// app.get('/here', (req, res) => {
// 	res.send(req.query.hello);
// })