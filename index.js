const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoDB = require('mongodb');
const app = express();
const port = process.env.PORT || 8888;

const defaultRoute = '/';

app.use(bodyParser.json());
app.use(cors);
app.use(bodyParser.urlencoded({ extended : false }));

const checkRoute = (route) => {
	switch (route) {
		case "/login":

	}
};

const mongoURI = "mongodb+srv://overStupid:@isPass175@matchacluster-hrimb.mongodb.net/test?retryWrites=true&w=majority";

mongoDB.connect(mongoURI, (err, client) => {
	if (err) {
		console.log(`Error connecting to database`);
		throw err;
	}
	else {
		console.log(`Connected to the database at: ${mongoURI}`);
		client.close();
	}
});
// if (app.get('/')) {
// 	(req, res) => {

// 	}
// }
//	use app.get with a switch statement to redirect to actual pages or 404 on a fuckout

app.get('/', (req, res) => {
	res.send('Hello World');
})

app.get('/here', (req, res) => {
	res.send(req.query.hello);
})

app.listen(port, () => console.log(`Server running on port ${port}`));