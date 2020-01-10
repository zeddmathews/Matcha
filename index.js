const express = require('express');
const app = express();

const port = 8888; //set environment variable

// if (app.get('/')) {
// 	(req, res) => {

// 	}
// }
//	use app.get with a switch statement to redirect to actual pages or 404 on a fuckout

app.get('/', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.send('Hello World');
})

app.get('/here', (req, res) => {
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.send(req.query.hello);
})

app.listen(port, () => console.log(`Server running on port ${port}`));